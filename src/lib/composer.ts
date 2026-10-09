import {
  formFields,
  type FormKind,
  type SubmissionData,
} from "@/content/form-fields";
export type ComposerKind = FormKind;
export type DeliveryChoice = "whatsapp" | "email";
export const teamEmail = "jambojeanjimmy52@gmail.com";
export const teamWhatsApp = "25779690359";
export function createDraft(kind: ComposerKind, data: SubmissionData) {
  const subject =
    kind === "contact"
      ? `SEAFA — Demande de contact : ${String(data.subject ?? "").replace(/[\r\n]+/g, " ")}`
      : kind === "join"
        ? "SEAFA — Candidature d’adhésion"
        : "SEAFA — Proposition de match";
  const body = [
    subject,
    ...formFields[kind].map((field) => {
      const value = data[field.name];
      const label = (v: string) =>
        field.options?.find(([key]) => key === v)?.[1] ?? v;
      const text = Array.isArray(value)
        ? value.map(label).join(", ")
        : typeof value === "boolean"
          ? value
            ? "Oui"
            : "Non"
          : value
            ? label(value)
            : "Non renseigné";
      return `${field.label} : ${text}`;
    }),
    ...(kind === "match-requests"
      ? ["Date et heure : heure du Burundi (UTC+02:00)."]
      : []),
    kind === "contact"
      ? "Merci de bien vouloir examiner cette demande."
      : "Cette demande ne vaut ni admission ni confirmation de match.",
  ].join("\n\n");
  return { subject, body };
}
export function composerUrl(
  choice: DeliveryChoice,
  draft: ReturnType<typeof createDraft>,
) {
  return choice === "whatsapp"
    ? `https://wa.me/${teamWhatsApp}?text=${encodeURIComponent(draft.body)}`
    : `mailto:${teamEmail}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
}
// Conservative interoperability limit; never truncate the visitor's answers.
export const composerUrlLimit = 7500;
