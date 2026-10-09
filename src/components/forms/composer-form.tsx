"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { formFields, validateSubmission } from "@/content/form-fields";
import { PositionSelector } from "./position-selector";
import {
  createDraft,
  composerUrl,
  composerUrlLimit,
  type ComposerKind,
  type DeliveryChoice,
} from "@/lib/composer";

export function ComposerForm({ kind }: { kind: ComposerKind }) {
  const [positions, setPositions] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [choice, setChoice] = useState<DeliveryChoice | "">("whatsapp");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<ReturnType<typeof createDraft> | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const fields = formFields[kind];
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const raw: Record<string, unknown> = Object.fromEntries(fd);
    for (const field of fields)
      if (field.type === "checkbox") raw[field.name] = fd.has(field.name);
    if (kind === "join") raw.positions = positions;
    const checked = validateSubmission(kind, raw);
    if (!choice) checked.errors.delivery = "Choisissez WhatsApp ou e-mail.";
    setErrors(checked.errors);
    setDraft(null);
    setCopyMessage("");
    if (Object.keys(checked.errors).length || !choice) {
      setMessage("Veuillez corriger les champs indiqués.");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    const nextDraft = createDraft(kind, checked.data);
    setDraft(nextDraft);
    const url = composerUrl(choice, nextDraft);
    let note =
      "Le brouillon est prêt. Vous devez encore appuyer sur Envoyer dans votre application. Aucun envoi n’est confirmé par ce site.";
    if (url.length > composerUrlLimit) {
      note =
        "Votre message est trop long pour une ouverture fiable. Copiez le texte complet ci-dessous, ouvrez votre application et collez-le avant d’appuyer sur Envoyer. Rien n’a été envoyé.";
    } else {
      try {
        if (choice === "whatsapp") {
          const popup = window.open("about:blank", "_blank");
          if (popup) {
            popup.opener = null;
            popup.location.replace(url);
          } else
            note =
              "La fenêtre a été bloquée. Utilisez le lien ci-dessous ou copiez le message. Rien n’a été envoyé.";
        } else window.location.href = url;
      } catch {
        note =
          "L’application n’a pas pu être ouverte. Utilisez le lien ci-dessous ou copiez le message. Rien n’a été envoyé.";
      }
    }
    setMessage(note);
    requestAnimationFrame(() => summary.current?.focus());
  }
  return (
    <form
      onSubmit={submit}
      noValidate
      className="public-form"
      onChange={() => {
        setDraft(null);
        setMessage("");
        setCopyMessage("");
      }}
    >
      <p className="form-help">
        Les champs marqués d’un astérisque (*) sont obligatoires. N’incluez pas
        de renseignements médicaux ni de documents d’identité. Vos réponses
        restent dans cette page jusqu’à l’ouverture de l’application choisie.
      </p>
      <div
        ref={summary}
        tabIndex={-1}
        role={Object.keys(errors).length ? "alert" : "status"}
        className={message ? "form-message" : "sr-only"}
      >
        {message}
        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>
                <a href={`#${kind}-${key}`}>
                  {fields.find((f) => f.name === key)?.label ??
                    "Mode de transmission"}{" "}
                  : {error}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="form-grid">
        {fields.map((field) => {
          if (field.type === "positions")
            return (
              <PositionSelector
                key={field.name}
                value={positions}
                onChange={setPositions}
                error={errors.positions}
              />
            );
          const id = `${kind}-${field.name}`;
          const required =
            field.required ||
            (field.name === "country" && category === "diaspora");
          const props = {
            id,
            name: field.name,
            required,
            "aria-invalid": Boolean(errors[field.name]),
            "aria-describedby": errors[field.name] ? id + "-error" : undefined,
          };
          return (
            <div
              key={field.name}
              className={
                field.type === "textarea" || field.type === "checkbox"
                  ? "form-wide"
                  : ""
              }
            >
              {field.type === "checkbox" ? (
                <label className="checkbox-label">
                  <input {...props} type="checkbox" />
                  <span>{field.label} *</span>
                </label>
              ) : (
                <>
                  <label htmlFor={id}>
                    {field.label}
                    {required ? " *" : " (facultatif)"}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      {...props}
                      className="form-input"
                      rows={4}
                      minLength={field.min}
                      maxLength={field.max}
                    />
                  ) : field.type === "select" ? (
                    <select
                      {...props}
                      className="form-input"
                      defaultValue=""
                      onChange={
                        field.name === "category"
                          ? (e) => setCategory(e.target.value)
                          : undefined
                      }
                    >
                      <option value="">Sélectionner une option</option>
                      {field.options?.map(([v, label]) => (
                        <option key={v} value={v}>
                          {label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...props}
                      className="form-input"
                      type={field.type}
                      minLength={field.min}
                      maxLength={field.max}
                      autoComplete={field.autocomplete}
                    />
                  )}
                </>
              )}
              {errors[field.name] && (
                <p className="field-error" id={id + "-error"}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <fieldset
        className="delivery-choice"
        id={`${kind}-delivery`}
        tabIndex={-1}
        aria-describedby={errors.delivery ? "delivery-error" : undefined}
      >
        <legend>Choisissez comment envoyer votre demande *</legend>
        <p>
          Le message sera prérempli : vérifiez-le et appuyez vous-même sur
          Envoyer. Ouvrir l’application ne transmet pas la demande.
        </p>
        {(["whatsapp", "email"] as const).map((value) => (
          <label className="delivery-card" key={value}>
            <input
              type="radio"
              name="delivery"
              value={value}
              checked={choice === value}
              onChange={() => setChoice(value)}
            />
            <span>
              <strong>
                {value === "whatsapp"
                  ? "Envoyer par WhatsApp"
                  : "Envoyer par e-mail"}
              </strong>
            </span>
          </label>
        ))}
        {errors.delivery && (
          <p id="delivery-error" className="field-error">
            {errors.delivery}
          </p>
        )}
      </fieldset>
      <button className="button" type="submit">
        {choice === "whatsapp" ? "Envoyer par WhatsApp" : "Envoyer par e-mail"}
      </button>
      {draft && choice && (
        <section
          className="composer-preview"
          aria-label="Brouillon de votre demande"
        >
          <h3>Votre message à envoyer</h3>
          <p>Objet : {draft.subject}</p>
          <label htmlFor="draft-message">
            Message complet (à copier si nécessaire)
          </label>
          <textarea
            id="draft-message"
            className="form-input"
            readOnly
            value={draft.body}
            rows={12}
            onFocus={(event) => event.target.select()}
          />
          <button
            type="button"
            className="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(draft.body);
                setCopyMessage(
                  "Message copié. Collez-le dans votre application, puis appuyez sur Envoyer.",
                );
              } catch {
                setCopyMessage(
                  "Copie automatique indisponible. Sélectionnez le texte ci-dessus et copiez-le manuellement.",
                );
              }
            }}
          >
            Copier le message
          </button>
          <p role="status">{copyMessage}</p>
          <a
            className="button secondary"
            rel="noreferrer noopener"
            referrerPolicy="no-referrer"
            target={choice === "whatsapp" ? "_blank" : undefined}
            href={composerUrl(choice, draft)}
          >
            {choice === "whatsapp"
              ? "Envoyer par WhatsApp"
              : "Envoyer par e-mail"}
          </a>
          <p>
            Si rien ne s’ouvre, utilisez le lien ci-dessus ou copiez le message
            dans votre application. Le site ne peut pas vérifier si une
            application e-mail est installée ni si le message a été envoyé.
          </p>
        </section>
      )}
      <p className="form-help">
        {kind === "contact"
          ? "Vous devez envoyer le message dans votre application."
          : "Cette demande ne vaut ni admission ni confirmation d’un match."}{" "}
        <Link href="/privacy">Politique de confidentialité</Link> ·{" "}
        <Link href="/code-of-conduct">Code de conduite</Link>
      </p>
    </form>
  );
}
