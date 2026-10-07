import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { mediaAssets } from "../src/data/media";
async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? walk(`${dir}/${e.name}`)
          : Promise.resolve([`${dir}/${e.name}`]),
      ),
    )
  ).flat();
}
async function main() {
  const rows = [];
  for (const path of (await walk("public/media"))
    .filter((p) => /\.(png|jpe?g|webp)$/i.test(p))
    .sort()) {
    const bytes = await readFile(path);
    const meta = await sharp(bytes).metadata();
    const pixels = await sharp(bytes)
      .rotate()
      .resize(9, 8, { fit: "fill" })
      .greyscale()
      .raw()
      .toBuffer();
    let hash = "";
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++)
        hash += pixels[y * 9 + x] > pixels[y * 9 + x + 1] ? "1" : "0";
    rows.push({
      src: path.slice(6),
      width: meta.width!,
      height: meta.height!,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      hash,
      registered: mediaAssets.some(
        (m) => decodeURIComponent(m.src) === path.slice(6),
      ),
      exifPresent: Boolean(meta.exif),
    });
  }
  const pairs = [];
  for (let i = 0; i < rows.length; i++)
    for (let j = i + 1; j < rows.length; j++) {
      const a = rows[i],
        b = rows[j];
      const distance = [...a.hash].filter((v, k) => v !== b.hash[k]).length;
      if (a.sha256 === b.sha256 || distance <= 6)
        pairs.push({
          a: a.src,
          b: b.src,
          exact: a.sha256 === b.sha256,
          distance,
        });
    }
  await mkdir("docs", { recursive: true });
  await writeFile(
    "docs/media-inventory.json",
    JSON.stringify({ images: rows, pairs }, null, 2),
  );
  console.log(
    JSON.stringify({
      images: rows.length,
      unregistered: rows.filter((r) => !r.registered).length,
      pairs: pairs.length,
    }),
  );
}
void main();
