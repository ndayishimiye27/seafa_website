import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { mediaAssets } from "../src/data/media";

const folders = [
  ["activities/2022", "conference-sante-2022", "Santé des adolescents — 2022"],
  [
    "activities/2024/tournament",
    "activities-2024-tournament",
    "Tournoi SEAFA — 2024",
  ],
  [
    "match contre lumitel en mars 2026",
    "seafa-lumitel",
    "SEAFA contre Lumitel — mars 2026",
  ],
  [
    "match de sages contre les jeunes decembre 2025",
    "sages-jeunes-2025",
    "Les sages face aux jeunes — décembre 2025",
  ],
] as const;

async function main() {
  const hashes = new Map<string, string>();
  const baseAssets = mediaAssets.filter(
    (asset) => !asset.id.startsWith("october-"),
  );
  for (const asset of baseAssets) {
    try {
      hashes.set(
        createHash("sha256")
          .update(await readFile(`public${decodeURIComponent(asset.src)}`))
          .digest("hex"),
        asset.id,
      );
    } catch {
      /* Missing legacy paths are audited separately. */
    }
  }
  const additions = [];
  const duplicateSources: Record<string, string> = {};
  const groups: Record<
    string,
    { photos: string[]; videos: { src: string; title: string }[] }
  > = {};
  const audit = [];
  for (const [folder, id, title] of folders) {
    const group = {
      photos: [] as string[],
      videos: [] as { src: string; title: string }[],
    };
    groups[id] = group;
    for (const name of (await readdir(`public/media/${folder}`)).sort()) {
      const originalPath = `/media/${folder}/${name}`;
      const src = name.includes("#")
        ? originalPath
            .split("/")
            .map((part) => encodeURIComponent(part))
            .join("/")
        : originalPath;
      if (/\.mp4$/i.test(name)) {
        group.videos.push({
          src,
          title: `${title} — séquence ${group.videos.length + 1}`,
        });
        continue;
      }
      if (!/\.(jpe?g|png|webp)$/i.test(name)) continue;
      const bytes = await readFile(`public${decodeURIComponent(src)}`);
      const hash = createHash("sha256").update(bytes).digest("hex");
      const existing = hashes.get(hash);
      if (baseAssets.some((asset) => asset.src === src)) {
        if (existing && !group.photos.includes(existing))
          group.photos.push(existing);
        continue;
      }
      if (existing) {
        if (!group.photos.includes(existing)) group.photos.push(existing);
        audit.push({ src, duplicateOf: existing });
        const canonical = [...baseAssets, ...additions].find(
          (asset) => asset.id === existing,
        );
        if (canonical) duplicateSources[src] = canonical.src;
        const meta = await sharp(bytes).metadata();
        additions.push({
          id: `october-alias-${createHash("sha256").update(src).digest("hex").slice(0, 16)}`,
          src,
          alt: title,
          width: meta.width!,
          height: meta.height!,
          caption: title,
        });
        continue;
      }
      const meta = await sharp(bytes).metadata();
      const mediaId = `october-${hash.slice(0, 16)}`;
      additions.push({
        id: mediaId,
        src,
        alt: `${title} : photographie ${group.photos.length + 1}`,
        width: meta.width!,
        height: meta.height!,
        caption: title,
      });
      hashes.set(hash, mediaId);
      group.photos.push(mediaId);
      audit.push({
        src,
        mediaId,
        width: meta.width,
        height: meta.height,
        bytes: bytes.length,
      });
    }
  }
  await writeFile(
    "src/data/october-media.ts",
    `import type { MediaAsset } from "@/types/content";\nexport const octoberMedia: MediaAsset[] = ${JSON.stringify(additions, null, 2)};\nexport const octoberGroups = ${JSON.stringify(groups, null, 2)};\nexport const octoberDuplicateSources: Record<string,string> = ${JSON.stringify(duplicateSources, null, 2)};\n`,
  );
  await writeFile(
    "docs/OCTOBER_MEDIA_AUDIT.json",
    JSON.stringify(audit, null, 2),
  );
  console.log(
    JSON.stringify({
      newImages: additions.length,
      groups: Object.fromEntries(
        Object.entries(groups).map(([id, g]) => [
          id,
          { photos: g.photos.length, videos: g.videos.length },
        ]),
      ),
    }),
  );
}
void main();
