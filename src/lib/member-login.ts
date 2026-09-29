/** Set to the verified HTTPS login address of the deployed SEAFA_SYSTEM. */
export function memberLoginUrl(
  value = process.env.SEAFA_SYSTEM_LOGIN_URL,
): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/login" ||
      url.search ||
      url.hash
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}
