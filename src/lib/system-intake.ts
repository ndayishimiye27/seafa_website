import { createHmac } from "node:crypto";
import type { FormKind } from "@/content/form-fields";

export function intakeConfiguration() {
  const secret = process.env.SEAFA_SYSTEM_INTAKE_SECRET;
  const value = process.env.SEAFA_SYSTEM_INTAKE_URL;
  if (!secret || secret.length < 32 || !value) return null;
  try {
    const url = new URL(value);
    const local =
      process.env.NODE_ENV !== "production" &&
      ["localhost", "127.0.0.1"].includes(url.hostname);
    if (
      (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/api/public/submissions"
    )
      return null;
    return { url, secret };
  } catch {
    return null;
  }
}
export async function deliverToSystem(
  request: Request,
  kind: FormKind,
  data: Record<string, string | boolean | string[]>,
) {
  const config = intakeConfiguration();
  if (!config) return null;
  const key = request.headers.get("idempotency-key") ?? "";
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      key,
    )
  )
    return Response.json(
      {
        success: false,
        message: "La clé de la demande est invalide. Rechargez le formulaire.",
      },
      { status: 400 },
    );
  const trustedHeader = process.env.TRUSTED_IP_HEADER;
  const identity = trustedHeader ? request.headers.get(trustedHeader) : null;
  const fingerprint = identity
    ? createHmac("sha256", config.secret).update(identity).digest("hex")
    : "shared";
  try {
    const response = await fetch(config.url, {
      method: "POST",
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(15000),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.secret}`,
        "Idempotency-Key": key,
        "X-Intake-Client": fingerprint,
      },
      body: JSON.stringify({
        kind,
        data:
          kind === "match-requests"
            ? { ...data, proposedDateTime: `${data.proposedDateTime}+02:00` }
            : data,
      }),
    });
    const result = await response.json();
    if (!response.ok)
      return Response.json(
        {
          success: false,
          message: [400, 409, 422, 429].includes(response.status)
            ? result.message
            : "La réception par le Secrétariat n’a pas pu être confirmée. Réessayez avec ce formulaire.",
        },
        {
          status: [400, 409, 422, 429].includes(response.status)
            ? response.status
            : 503,
          headers: {
            "Cache-Control": "no-store",
            ...(response.status === 429 ? { "Retry-After": "600" } : {}),
          },
        },
      );
    if (
      result.success !== true ||
      result.id !== key ||
      !/^SEAFA-(APP|COR)-\d{4}-\d{8,10}$/.test(result.reference) ||
      !/^[a-f0-9]{64}$/.test(result.token) ||
      typeof result.receivedAt !== "string"
    )
      throw new Error("Invalid receipt");
    return Response.json(
      {
        success: true,
        message: `Votre demande a été enregistrée dans le système du Secrétariat. Référence : ${result.reference}. Conservez votre code confidentiel pour consulter le suivi.`,
        reference: result.reference,
        token: result.token,
        statusUrl: new URL("/application-access", config.url).href,
      },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      {
        success: false,
        message:
          "La réception n’a pas pu être confirmée. Réessayez sans modifier le formulaire : la même demande ne sera enregistrée qu’une fois.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
