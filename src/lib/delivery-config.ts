/** Server-only delivery configuration. No recipients or credentials reach client props. */
import { storageDirectory } from "@/lib/submission-storage";

const emailPattern = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
export function emailConfiguration() {
  const to = process.env.SEAFA_TEAM_EMAIL?.trim();
  const from = process.env.SEAFA_EMAIL_FROM?.trim();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (
    process.env.SEAFA_EMAIL_DELIVERY_ENABLED !== "true" ||
    !to ||
    !from ||
    !apiKey ||
    !emailPattern.test(to) ||
    !emailPattern.test(from)
  )
    return null;
  return { to, from, apiKey };
}
export function whatsappConfiguration() {
  const to = process.env.SEAFA_TEAM_WHATSAPP?.trim();
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const token = process.env.WHATSAPP_ACCESS_TOKEN?.trim();
  const version = process.env.WHATSAPP_API_VERSION?.trim();
  const template = process.env.WHATSAPP_TEMPLATE_NAME?.trim();
  const language = process.env.WHATSAPP_TEMPLATE_LANGUAGE?.trim();
  if (
    process.env.SEAFA_WHATSAPP_NOTIFICATIONS_ENABLED !== "true" ||
    !to ||
    !/^\+[1-9]\d{7,14}$/.test(to) ||
    !phoneId ||
    !/^\d+$/.test(phoneId) ||
    !token ||
    !version ||
    !/^v\d+\.0$/.test(version) ||
    !template ||
    !/^[a-z0-9_]+$/.test(template) ||
    !language ||
    !/^[a-z]{2}(?:_[A-Z]{2})?$/.test(language)
  )
    return null;
  return { to, phoneId, token, version, template, language };
}
export function emailDeliveryReady() {
  return Boolean(emailConfiguration() && storageDirectory());
}
export function teamDeliveryRequested() {
  return (
    process.env.SEAFA_EMAIL_DELIVERY_ENABLED === "true" ||
    process.env.SEAFA_WHATSAPP_NOTIFICATIONS_ENABLED === "true"
  );
}
