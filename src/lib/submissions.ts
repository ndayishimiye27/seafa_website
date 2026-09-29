import {
  emailDeliveryReady,
  teamDeliveryRequested,
} from "@/lib/delivery-config";
import { deliverToTeam } from "@/lib/team-delivery";
import { storageDirectory, rateLimit } from "@/lib/submission-storage";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { mkdir, open } from "node:fs/promises";
import { formFields, validateSubmission } from "@/content/form-fields";
import type { FormKind } from "@/content/form-fields";
import { deliverToSystem, intakeConfiguration } from "@/lib/system-intake";
const LIMIT = 16384;
export function submissionsEnabled() {
  return Boolean(
    intakeConfiguration() ||
    emailDeliveryReady() ||
    (process.env.NODE_ENV !== "production" && storageDirectory()),
  );
}
function reply(
  message: string,
  status: number,
  errors?: Record<string, string>,
) {
  return Response.json(
    { success: status === 201, message, ...(errors ? { errors } : {}) },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
}
async function limitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > LIMIT) {
        await reader.cancel();
        throw new RangeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString("utf8");
}
export async function handleSubmission(request: Request, kind: FormKind) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return reply("Origine de la demande non autorisée.", 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return reply("Le format de la demande n’est pas pris en charge.", 415);
  if (Number(request.headers.get("content-length") ?? 0) > LIMIT)
    return reply("La demande est trop volumineuse.", 413);
  let body: unknown;
  try {
    body = JSON.parse(await limitedBody(request));
  } catch (error) {
    return reply(
      error instanceof RangeError
        ? "La demande est trop volumineuse."
        : "La demande est illisible.",
      error instanceof RangeError ? 413 : 400,
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return reply("La demande est invalide.", 400);
  const raw = body as Record<string, unknown>;
  if (raw.website) return reply("La demande n’a pas été acceptée.", 400);
  const allowed = new Set([...formFields[kind].map((f) => f.name), "website"]);
  if (Object.keys(raw).some((k) => !allowed.has(k)))
    return reply("La demande contient des champs non reconnus.", 400);
  const { data, errors } = validateSubmission(kind, raw);
  if (Object.keys(errors).length)
    return reply("Veuillez corriger les champs indiqués.", 422, errors);
  const delivered = await deliverToSystem(request, kind, data);
  if (delivered) {
    if (delivered.ok && teamDeliveryRequested()) {
      const receipt = await delivered.clone().json();
      const notification = await deliverToTeam(
        request,
        kind,
        data,
        receipt.reference,
      );
      if (!notification?.ok)
        console.warn(
          "SEAFA team notification not confirmed; inspect the delivery configuration/outbox.",
        );
    }
    return delivered;
  }
  const teamDelivery = await deliverToTeam(request, kind, data);
  if (teamDelivery) return teamDelivery;
  if (process.env.NODE_ENV === "production")
    return reply(
      "Le service de réception du Secrétariat est temporairement indisponible. Votre demande n’a pas été enregistrée.",
      503,
    );
  const dir = storageDirectory();
  if (!dir)
    return reply(
      "Les envois sont temporairement indisponibles. Votre demande n’a pas été enregistrée.",
      503,
    );
  try {
    await mkdir(dir, { recursive: true, mode: 0o700 });
    if (!(await rateLimit(dir, request)))
      return reply("Trop de demandes. Veuillez patienter dix minutes.", 429);
    const id = randomUUID();
    const receivedAt = new Date().toISOString();
    const reference = `SEAFA-${receivedAt.slice(0, 4)}-${id}`;
    const file = await open(resolve(dir, `${id}.json`), "wx", 0o600);
    try {
      await file.writeFile(
        JSON.stringify(
          {
            id,
            reference,
            kind,
            receivedAt,
            status: "received_locally",
            statusHistory: [{ status: "received_locally", at: receivedAt }],
            systemDelivery: "not_connected",
            data,
          },
          null,
          2,
        ),
      );
      await file.sync();
    } finally {
      await file.close();
    }
    return reply(
      `Votre demande a été enregistrée sur le site. Référence : ${reference}. Sa transmission au système du Secrétariat reste à effectuer. Aucun e-mail automatique n’a été envoyé.`,
      201,
    );
  } catch {
    return reply(
      "L’enregistrement n’a pas pu être confirmé. Veuillez réessayer plus tard.",
      503,
    );
  }
}
