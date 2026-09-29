import { createHmac, randomBytes } from "node:crypto";
import { isAbsolute, resolve, sep } from "node:path";
import { mkdir, open, readdir, readFile, unlink } from "node:fs/promises";
export function storageDirectory() {
  const dir = process.env.SUBMISSIONS_DIR;
  if (!dir || !isAbsolute(dir)) return null;
  const absolute = resolve(dir);
  const publicDir = resolve(process.cwd(), "public");
  if (absolute === publicDir || absolute.startsWith(publicDir + sep))
    return null;
  return absolute;
}
export async function rateLimit(dir: string, request: Request) {
  const rateDir = resolve(dir, "rate-limits");
  await mkdir(rateDir, { recursive: true, mode: 0o700 });
  const saltPath = resolve(rateDir, ".salt");
  let salt: Buffer;
  try {
    const file = await open(saltPath, "wx", 0o600);
    salt = randomBytes(32);
    try {
      await file.writeFile(salt);
    } finally {
      await file.close();
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    salt = await readFile(saltPath);
  }
  // Only trust an IP header when the deployment proxy overwrites it.
  const header = process.env.TRUSTED_IP_HEADER;
  const identity = header ? request.headers.get(header)?.trim() : undefined;
  const key = createHmac("sha256", salt)
    .update(identity || "shared")
    .digest("hex");
  const window = Math.floor(Date.now() / 600000);
  const max = identity ? 5 : 30;
  for (const name of await readdir(rateDir)) {
    const bucket = Number(name.split("-")[0]);
    if (Number.isFinite(bucket) && bucket < window - 1)
      await unlink(resolve(rateDir, name)).catch(() => {});
  }
  for (let slot = 0; slot < max; slot++) {
    try {
      const file = await open(
        resolve(rateDir, `${window}-${key}-${slot}`),
        "wx",
        0o600,
      );
      await file.close();
      return true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
  }
  return false;
}
