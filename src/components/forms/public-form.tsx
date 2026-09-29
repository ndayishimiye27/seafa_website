"use client";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { formFields, validateSubmission } from "@/content/form-fields";
import type { FormKind } from "@/content/form-fields";
export function PublicForm({
  kind,
  enabled = false,
}: {
  kind: FormKind;
  enabled?: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [receipt, setReceipt] = useState<{
    reference: string;
    token: string;
    statusUrl: string;
  } | null>(null);
  const retry = useRef<{ body: string; key: string } | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const summary = useRef<HTMLDivElement>(null);
  const fields = formFields[kind];
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending" || !enabled) return;
    const form = event.currentTarget;
    const fd = new FormData(form);
    const raw: Record<string, unknown> = Object.fromEntries(fd);
    for (const field of fields)
      if (field.type === "checkbox") raw[field.name] = fd.has(field.name);
    const checked = validateSubmission(kind, raw);
    setErrors(checked.errors);
    if (Object.keys(checked.errors).length) {
      setState("error");
      setMessage("Veuillez corriger les champs indiqués.");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setReceipt(null);
    setState("sending");
    setMessage("Envoi en cours…");
    try {
      const body = JSON.stringify({
        ...checked.data,
        website: raw.website ?? "",
      });
      if (retry.current?.body !== body) {
        const hash = Array.from(
          new Uint8Array(
            await crypto.subtle.digest(
              "SHA-256",
              new TextEncoder().encode(body),
            ),
          ),
          (byte) => byte.toString(16).padStart(2, "0"),
        ).join("");
        let key = crypto.randomUUID();
        try {
          const previous = JSON.parse(
            sessionStorage.getItem(`seafa-request-${kind}`) ?? "null",
          );
          if (previous?.hash === hash && typeof previous.key === "string")
            key = previous.key;
          sessionStorage.setItem(
            `seafa-request-${kind}`,
            JSON.stringify({ hash, key }),
          );
        } catch {
          /* In-memory retry protection still works when storage is unavailable. */
        }
        retry.current = { body, key };
      }
      const response = await fetch(`/api/${kind}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": retry.current.key,
        },
        body,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        setState("error");
        setErrors(result.errors ?? {});
        setMessage(
          result.message ??
            "La demande n’a pas pu être enregistrée. Veuillez réessayer.",
        );
      } else {
        setState("success");
        setMessage(result.message);
        if (result.reference && result.token && result.statusUrl)
          setReceipt({
            reference: result.reference,
            token: result.token,
            statusUrl: result.statusUrl,
          });
        form.reset();
        setCategory("");
      }
    } catch {
      setState("error");
      setMessage(
        "La connexion a été interrompue. La réception de votre demande n’est pas confirmée. Veuillez réessayer.",
      );
    }
    requestAnimationFrame(() => summary.current?.focus());
  }
  return (
    <form onSubmit={submit} noValidate className="public-form">
      <p className="form-help">
        Les champs marqués d’un astérisque (*) sont obligatoires. N’incluez pas
        de renseignements médicaux ni de documents d’identité.
      </p>
      {kind === "join" && (
        <p className="form-help">
          Le Secrétariat examine votre candidature. Les Finances vérifient
          ensuite le paiement et activent l’adhésion. Aucun numéro permanent
          n’est attribué par ce formulaire.
        </p>
      )}
      {!enabled && (
        <p className="empty-note" role="status">
          Les envois en ligne sont temporairement indisponibles. Le formulaire
          sera ouvert dès que le service de réception sera prêt.
        </p>
      )}
      <div
        ref={summary}
        tabIndex={-1}
        role={state === "error" ? "alert" : "status"}
        className={message ? `form-message ${state}` : "sr-only"}
      >
        {message}
        {Object.keys(errors).length > 0 && (
          <ul>
            {fields
              .filter((f) => errors[f.name])
              .map((f) => (
                <li key={f.name}>
                  <a href={`#${kind}-${f.name}`}>
                    {f.label} : {errors[f.name]}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </div>
      {receipt && (
        <div className="form-message success">
          <p>
            Référence : <strong>{receipt.reference}</strong>
          </p>
          <p>
            Code confidentiel à conserver :{" "}
            <code className="break-all">{receipt.token}</code>
          </p>
          <p>Ce code donne accès à votre suivi. Ne le partagez pas.</p>
          <a href={receipt.statusUrl} className="underline">
            Consulter le suivi de ma demande
          </a>
        </div>
      )}
      <fieldset disabled={state === "sending"}>
        <legend className="sr-only">Votre demande</legend>
        <div className="form-grid">
          {fields.map((f) => {
            const id = `${kind}-${f.name}`;
            const required = Boolean(
              f.required ||
              (kind === "join" &&
                ((f.name === "country" && category === "diaspora") ||
                  (f.name === "preferredPosition" && category === "active"))),
            );
            const props = {
              id,
              name: f.name,
              required,
              "aria-invalid": Boolean(errors[f.name]),
              "aria-describedby": errors[f.name] ? id + "-error" : undefined,
            };
            return (
              <div
                key={f.name}
                className={
                  f.type === "textarea" || f.type === "checkbox"
                    ? "form-wide"
                    : ""
                }
              >
                {f.type === "checkbox" ? (
                  <label className="checkbox-label" htmlFor={id}>
                    <input {...props} type="checkbox" />
                    <span>{f.label} *</span>
                  </label>
                ) : (
                  <>
                    <label htmlFor={id}>
                      {f.label}
                      {required ? " *" : " (facultatif)"}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        {...props}
                        className="form-input"
                        rows={5}
                        minLength={f.min}
                        maxLength={f.max}
                      />
                    ) : f.type === "select" ? (
                      <select
                        {...props}
                        className="form-input"
                        defaultValue=""
                        onChange={
                          f.name === "category"
                            ? (event) => setCategory(event.target.value)
                            : undefined
                        }
                      >
                        <option value="">Sélectionner une option</option>
                        {f.options?.map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        {...props}
                        className="form-input"
                        type={f.type}
                        minLength={f.min}
                        maxLength={f.max}
                        autoComplete={f.autocomplete}
                      />
                    )}
                  </>
                )}
                {errors[f.name] && (
                  <p id={id + "-error"} className="field-error">
                    {errors[f.name]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor={kind + "-website"}>Site internet</label>
          <input
            id={kind + "-website"}
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <button
          className="button"
          disabled={!enabled || state === "sending"}
          type="submit"
        >
          {state === "sending"
            ? "Envoi en cours…"
            : kind === "join"
              ? "Envoyer ma candidature"
              : kind === "contact"
                ? "Envoyer mon message"
                : "Envoyer ma proposition"}
        </button>
      </fieldset>
      <p className="form-help">
        <Link href="/privacy">Politique de confidentialité</Link> ·{" "}
        <Link href="/code-of-conduct">Code de conduite</Link>
      </p>
      {kind !== "contact" && (
        <p className="form-help">
          L’enregistrement de votre demande ne vaut ni admission ni confirmation
          d’un match.
        </p>
      )}
    </form>
  );
}
