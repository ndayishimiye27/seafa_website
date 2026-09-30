import { positionOptions, legacyPositions } from "@/content/positions";
export type SubmissionData = Record<string, string | boolean | string[]>;
export type FormKind = "contact" | "join" | "match-requests";
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "date"
    | "datetime-local"
    | "select"
    | "checkbox"
    | "positions";
  required?: boolean;
  min?: number;
  max?: number;
  options?: readonly (readonly [string, string])[];
  autocomplete?: string;
}
const fullName: FormField = {
  name: "fullName",
  label: "Nom complet",
  type: "text",
  required: true,
  min: 2,
  max: 120,
  autocomplete: "name",
};
const email: FormField = {
  name: "email",
  label: "Adresse e-mail",
  type: "email",
  required: true,
  max: 254,
  autocomplete: "email",
};
const telephone: FormField = {
  name: "telephone",
  label: "Téléphone ou WhatsApp (format international, +257…)",
  type: "tel",
  required: true,
  min: 7,
  max: 30,
  autocomplete: "tel",
};
const privacy: FormField = {
  name: "privacyConsent",
  label: "J’accepte l’utilisation de ces informations pour traiter ma demande.",
  type: "checkbox",
  required: true,
};
export const contactFields: FormField[] = [
  fullName,
  email,
  {
    name: "requestType",
    label: "Type de demande",
    type: "select",
    options: [
      ["message", "Message général"],
      ["external_letter", "Courrier externe au Secrétariat"],
    ],
  },
  {
    name: "organization",
    label: "Organisation expéditrice",
    type: "text",
    max: 160,
  },
  { ...telephone, required: false },
  {
    name: "subject",
    label: "Objet",
    type: "text",
    required: true,
    min: 3,
    max: 150,
  },
  {
    name: "message",
    label: "Votre message",
    type: "textarea",
    required: true,
    min: 10,
    max: 3000,
  },
  privacy,
];
export const membershipFields: FormField[] = [
  fullName,
  email,
  telephone,
  { name: "profession", label: "Profession", type: "text", max: 200 },
  {
    name: "qualifications",
    label: "Qualifications et formations",
    type: "textarea",
    max: 1500,
  },
  {
    name: "category",
    label: "Catégorie demandée",
    type: "select",
    required: true,
    options: [
      ["active", "Membre actif"],
      ["non_active", "Membre non actif"],
      ["sage", "Sage"],
      ["diaspora", "Diaspora"],
    ],
  },
  {
    name: "country",
    label: "Pays de résidence",
    type: "text",
    max: 100,
    autocomplete: "country-name",
  },
  { name: "residence", label: "Lieu de résidence", type: "text", max: 120 },
  {
    name: "positions",
    label: "Postes de jeu",
    type: "positions",
    required: true,
    options: positionOptions,
  },
  {
    name: "footballExperience",
    label: "Expérience et compétences à partager",
    type: "textarea",
    max: 1500,
  },
  {
    name: "reasonForJoining",
    label: "Pourquoi souhaitez-vous rejoindre SEAFA ?",
    type: "textarea",
    required: true,
    min: 20,
    max: 2000,
  },
  {
    name: "codeOfConductAccepted",
    label: "J’ai lu et j’accepte le code de conduite de SEAFA.",
    type: "checkbox",
    required: true,
  },
  privacy,
];
export const matchRequestFields: FormField[] = [
  {
    name: "organizationName",
    label: "Club ou organisation",
    type: "text",
    required: true,
    min: 2,
    max: 160,
  },
  { ...fullName, name: "contactPerson", label: "Personne de contact" },
  email,
  telephone,
  {
    name: "proposedDateTime",
    label: "Date et heure proposées (heure du Burundi)",
    type: "datetime-local",
    required: true,
  },
  {
    name: "preferredLocation",
    label: "Lieu souhaité",
    type: "text",
    required: true,
    min: 2,
    max: 160,
  },
  {
    name: "matchFormat",
    label: "Format du match",
    type: "select",
    required: true,
    options: [
      ["11-a-side", "11 contre 11"],
      ["8-a-side", "8 contre 8"],
      ["7-a-side", "7 contre 7"],
      ["5-a-side", "5 contre 5"],
      ["other", "Autre format"],
    ],
  },
  {
    name: "message",
    label: "Informations complémentaires",
    type: "textarea",
    max: 2000,
  },
  privacy,
];
export const formFields: Record<FormKind, FormField[]> = {
  contact: contactFields,
  join: membershipFields,
  "match-requests": matchRequestFields,
};
export function normalizeText(value: string) {
  return value
    .normalize("NFC")
    .replace(
      /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,
      "\uFFFD",
    )
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}
export function validateSubmission(
  kind: FormKind,
  raw: Record<string, unknown>,
  now = new Date(),
) {
  const errors: Record<string, string> = {};
  const data: SubmissionData = {};
  for (const f of formFields[kind]) {
    if (f.type === "positions") {
      const legacy = [raw.preferredPosition, raw.secondaryPosition].filter(
        (v) => v !== undefined && v !== "",
      );
      const selected =
        raw.positions === undefined
          ? [
              ...new Set(
                legacy.map((v) =>
                  typeof v === "string" ? (legacyPositions[v] ?? v) : v,
                ),
              ),
            ]
          : raw.positions;
      if (
        !Array.isArray(selected) ||
        selected.length < 1 ||
        selected.length > 5 ||
        selected.some(
          (v) =>
            typeof v !== "string" ||
            !positionOptions.some(([code]) => code === v),
        ) ||
        new Set(selected).size !== selected.length ||
        (raw.positions !== undefined && legacy.length > 0)
      )
        errors.positions =
          "Choisissez de 1 à 5 postes distincts parmi les postes proposés.";
      data.positions = Array.isArray(selected)
        ? selected.filter((v): v is string => typeof v === "string")
        : [];
      continue;
    }
    if (f.type === "checkbox") {
      data[f.name] = raw[f.name] === true;
      if (f.required && !data[f.name])
        errors[f.name] = "Veuillez confirmer votre accord.";
      continue;
    }
    const value =
      typeof raw[f.name] === "string"
        ? normalizeText(raw[f.name] as string)
        : "";
    data[f.name] = f.type === "email" ? value.toLowerCase() : value;
    if (f.required && !value) errors[f.name] = "Veuillez renseigner ce champ.";
    else if (value) {
      if (f.min && value.length < f.min)
        errors[f.name] = `Saisissez au moins ${f.min} caractères.`;
      if (f.max && value.length > f.max)
        errors[f.name] = `Limitez ce champ à ${f.max} caractères.`;
      if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        errors[f.name] = "Saisissez une adresse e-mail valide.";
      if (
        f.type === "tel" &&
        !/^\+[1-9]\d{7,14}$/.test(value.replace(/[\s().-]/g, ""))
      )
        errors[f.name] = "Saisissez un numéro de téléphone valide.";
      if (
        f.type === "select" &&
        !f.options?.some(([option]) => option === value)
      )
        errors[f.name] = "Choisissez une option proposée.";
      if (f.type === "datetime-local") {
        const valid = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value);
        const parsed = new Date(value + "+02:00");
        const normalized = Number.isNaN(parsed.getTime())
          ? ""
          : new Date(parsed.getTime() + 7200000).toISOString().slice(0, 16);
        if (!valid || normalized !== value)
          errors[f.name] = "Choisissez une date et une heure valides.";
        else if (parsed < now) errors[f.name] = "Choisissez une date à venir.";
      }
    }
  }
  if (kind === "join") {
    if (data.category === "diaspora" && !data.country)
      errors.country = "Indiquez votre pays de résidence.";
  }
  return { data, errors };
}
