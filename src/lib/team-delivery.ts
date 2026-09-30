import { createHash, randomUUID } from "node:crypto";
import {
  mkdir,
  open,
  readFile,
  rename,
  unlink,
  readdir,
} from "node:fs/promises";
import { resolve } from "node:path";
import { formFields, type FormKind } from "@/content/form-fields";
import {
  emailConfiguration,
  whatsappConfiguration,
  teamDeliveryRequested,
} from "@/lib/delivery-config";
import { storageDirectory, rateLimit } from "@/lib/submission-storage";

type Data = Record<string, string | boolean | string[]>;
type DeliveryState = "pending" | "accepted" | "unknown" | "review";
interface Delivery {
  state: DeliveryState;
  providerId?: string;
  firstAttemptAt?: string;
  lastStatus?: number;
}
interface DeliveryRecord {
  id: string;
  digest: string;
  kind: FormKind;
  reference: string;
  createdAt: string;
  systemAccepted: boolean;
  email?: Delivery & {
    payload: {
      from: string;
      to: string[];
      reply_to: string;
      subject: string;
      text: string;
    };
  };
  whatsapp?: Delivery & {
    to: string;
    phoneId: string;
    version: string;
    template: string;
    language: string;
  };
}
export const formTitles: { [K in FormKind]: string } = {
  contact: "Message de contact",
  join: "Candidature d’adhésion",
  "match-requests": "Proposition de match",
};
export function formatSubmission(
  kind: FormKind,
  data: Data,
  reference: string,
) {
  return [
    formTitles[kind],
    "Référence : " + reference,
    ...formFields[kind].map((field) => {
      const value = data[field.name];
      const label = field.options?.find(([key]) => key === value)?.[1];
      return (
        field.label +
        " : " +
        (Array.isArray(value)
          ? value
              .map((v) => field.options?.find(([key]) => key === v)?.[1] ?? v)
              .join(", ")
          : (label ??
            (typeof value === "boolean"
              ? value
                ? "Oui"
                : "Non"
              : value || "Non renseigné")))
      );
    }),
    ...(kind === "match-requests"
      ? [
          "La date et l’heure proposées sont exprimées à l’heure du Burundi (UTC+02:00).",
        ]
      : []),
    "Cette demande ne vaut ni admission ni confirmation de match.",
  ].join("\n\n");
}
async function save(path: string, record: DeliveryRecord) {
  const temporary = path + "." + randomUUID() + ".tmp";
  const file = await open(temporary, "wx", 0o600);
  try {
    await file.writeFile(JSON.stringify(record));
    await file.sync();
  } finally {
    await file.close();
  }
  await rename(temporary, path);
}
function accepted(record: DeliveryRecord) {
  return record.systemAccepted || record.email?.state === "accepted";
}
async function dispatch(record: DeliveryRecord, path: string) {
  const email = emailConfiguration();
  if (
    record.email &&
    record.email.state !== "accepted" &&
    record.email.state !== "review"
  ) {
    // Resend deduplicates for 24h. Stop before expiry instead of risking a duplicate.
    if (
      record.email.firstAttemptAt &&
      Date.now() - Date.parse(record.email.firstAttemptAt) >= 23 * 3600000
    ) {
      record.email.state = "review";
    } else if (email) {
      record.email.firstAttemptAt ??= new Date().toISOString();
      await save(path, record);
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          cache: "no-store",
          redirect: "error",
          signal: AbortSignal.timeout(10000),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + email.apiKey,
            "Idempotency-Key": "seafa/" + record.id,
          },
          body: JSON.stringify(record.email.payload),
        });
        record.email.lastStatus = response.status;
        const result = await response.json();
        if (
          response.ok &&
          typeof result.id === "string" &&
          result.id.length > 0
        ) {
          record.email.state = "accepted";
          record.email.providerId = result.id;
        } else record.email.state = "pending";
      } catch {
        record.email.state = "unknown";
      }
    }
    await save(path, record);
  }
  const whatsapp = whatsappConfiguration();
  if (accepted(record) && record.whatsapp?.state === "pending" && whatsapp) {
    // WhatsApp has no client idempotency guarantee. Save unknown BEFORE sending;
    // a timeout/crash must be reconciled by an operator, never blindly repeated.
    record.whatsapp.state = "unknown";
    record.whatsapp.firstAttemptAt ??= new Date().toISOString();
    await save(path, record);
    try {
      const response = await fetch(
        `https://graph.facebook.com/${record.whatsapp.version}/${record.whatsapp.phoneId}/messages`,
        {
          method: "POST",
          cache: "no-store",
          redirect: "error",
          signal: AbortSignal.timeout(10000),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + whatsapp.token,
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: record.whatsapp.to.slice(1),
            type: "template",
            template: {
              name: record.whatsapp.template,
              language: { code: record.whatsapp.language },
              components: [
                {
                  type: "body",
                  parameters: [
                    { type: "text", text: formTitles[record.kind] },
                    { type: "text", text: record.reference },
                  ],
                },
              ],
            },
          }),
        },
      );
      record.whatsapp.lastStatus = response.status;
      const result = await response.json();
      const id = result.messages?.[0]?.id;
      if (response.ok && typeof id === "string" && id.startsWith("wamid.")) {
        record.whatsapp.state = "accepted";
        record.whatsapp.providerId = id;
      } else if (response.status >= 400 && response.status < 500)
        record.whatsapp.state = "pending";
    } catch {
      /* Ambiguous acceptance: leave unknown for operator reconciliation. */
    }
    await save(path, record);
  }
  return record;
}
function result(message: string, status: number) {
  return Response.json(
    { success: status === 201, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
}
export async function deliverToTeam(
  request: Request,
  kind: FormKind,
  data: Data,
  systemReference?: string,
) {
  if (!teamDeliveryRequested()) return null;
  const dir = storageDirectory();
  const email = emailConfiguration(),
    whatsapp = whatsappConfiguration();
  if (
    (process.env.SEAFA_EMAIL_DELIVERY_ENABLED === "true" && !email) ||
    (process.env.SEAFA_WHATSAPP_NOTIFICATIONS_ENABLED === "true" && !whatsapp)
  )
    console.warn(
      "SEAFA team delivery channel enabled with incomplete configuration; inspect server environment.",
    );
  if (!dir || (!email && !systemReference))
    return result(
      "Le service de réception n’est pas configuré. Votre demande n’a pas été transmise.",
      503,
    );
  const id = request.headers.get("idempotency-key") ?? "";
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    )
  )
    return result(
      "La clé de la demande est invalide. Rechargez le formulaire.",
      400,
    );
  const folder = resolve(dir, "delivery");
  let lock: Awaited<ReturnType<typeof open>> | undefined;
  const path = resolve(folder, id + ".json"),
    lockPath = path + ".lock";
  try {
    await mkdir(folder, { recursive: true, mode: 0o700 });
    try {
      lock = await open(lockPath, "wx", 0o600);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST")
        return result(
          "Cette demande est en cours de traitement. Réessayez sans modifier le formulaire.",
          409,
        );
      throw error;
    }
    const digest = createHash("sha256")
      .update(JSON.stringify({ kind, data }))
      .digest("hex");
    let record: DeliveryRecord;
    try {
      record = JSON.parse(await readFile(path, "utf8"));
      if (record.digest !== digest)
        return result(
          "Cette clé correspond à une autre demande. Vérifiez le formulaire.",
          409,
        );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      if (!systemReference && !(await rateLimit(dir, request)))
        return result("Trop de demandes. Veuillez patienter dix minutes.", 429);
      const reference = systemReference ?? "SEAFA-WEB-" + id;
      record = {
        id,
        digest,
        kind,
        reference,
        createdAt: new Date().toISOString(),
        systemAccepted: Boolean(systemReference),
        ...(email
          ? {
              email: {
                state: "pending",
                payload: {
                  from: email.from,
                  to: [email.to],
                  reply_to: String(data.email),
                  subject: `SEAFA — ${formTitles[kind]} — ${reference}`,
                  text: formatSubmission(kind, data, reference),
                },
              },
            }
          : {}),
        ...(whatsapp
          ? {
              whatsapp: {
                state: "pending",
                to: whatsapp.to,
                phoneId: whatsapp.phoneId,
                version: whatsapp.version,
                template: whatsapp.template,
                language: whatsapp.language,
              },
            }
          : {}),
      };
      await save(path, record);
    }
    await dispatch(record, path);
    if (
      record.systemAccepted &&
      ((record.email && record.email.state !== "accepted") ||
        (record.whatsapp && record.whatsapp.state !== "accepted"))
    )
      console.warn(
        "SEAFA team notification pending; run the delivery retry worker and inspect its report.",
      );
    if (!accepted(record))
      return result(
        "La réception par le service d’envoi n’a pas pu être confirmée. Réessayez sans modifier le formulaire.",
        503,
      );
    return result(
      record.systemAccepted
        ? "Votre demande est enregistrée dans le système du Secrétariat."
        : `Votre demande a été acceptée par le service d’envoi d’e-mails à SEAFA. Référence : ${record.reference}. Cela ne confirme pas encore sa lecture par l’équipe.`,
      201,
    );
  } catch {
    return result(
      "La réception n’a pas pu être confirmée. Conservez vos informations et réessayez sans modifier le formulaire.",
      503,
    );
  } finally {
    if (lock) {
      await lock.close();
      await unlink(lockPath).catch(() => {});
    }
  }
}

/** Run from an authenticated host scheduler, never from a public HTTP endpoint. */
export async function retryTeamDeliveries() {
  const dir = storageDirectory();
  if (!dir) throw new Error("SUBMISSIONS_DIR is required");
  const folder = resolve(dir, "delivery");
  const report = { checked: 0, pending: 0, review: 0, errors: 0 };
  let names: string[];
  try {
    names = await readdir(folder);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return report;
    throw error;
  }
  for (const name of names.filter((name) =>
    /^[a-f0-9-]{36}\.json$/i.test(name),
  )) {
    const path = resolve(folder, name),
      lockPath = path + ".lock";
    let lock: Awaited<ReturnType<typeof open>> | undefined;
    try {
      lock = await open(lockPath, "wx", 0o600);
      const record: DeliveryRecord = JSON.parse(await readFile(path, "utf8"));
      await dispatch(record, path);
      report.checked++;
      if (
        record.email?.state === "review" ||
        record.whatsapp?.state === "unknown"
      )
        report.review++;
      if (
        (record.email && record.email.state !== "accepted") ||
        (record.whatsapp && record.whatsapp.state !== "accepted")
      )
        report.pending++;
    } catch {
      report.errors++;
    } finally {
      if (lock) {
        await lock.close();
        await unlink(lockPath).catch(() => {});
      }
    }
  }
  return report;
}
