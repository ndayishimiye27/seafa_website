import fs from "node:fs";
import sharp from "sharp";
const dirs = [
  "activities/2022",
  "activities/2024/tournament",
  "match contre lumitel en mars 2026",
  "match de sages contre les jeunes decembre 2025",
  "president hierachy",
];
fs.mkdirSync("tmp/october", { recursive: true });
for (const [d, dir] of dirs.entries()) {
  const files = fs
    .readdirSync(`public/media/${dir}`)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
  const tiles = await Promise.all(
    files.map(async (f, i) => ({
      input: await sharp(`public/media/${dir}/${f}`)
        .rotate()
        .resize(180, 140, { fit: "contain", background: "#fff" })
        .extend({ bottom: 24, background: "#fff" })
        .composite([
          {
            input: Buffer.from(
              `<svg width="180" height="24"><text x="6" y="18" font-size="14">${i}</text></svg>`,
            ),
            top: 140,
            left: 0,
          },
        ])
        .png()
        .toBuffer(),
      left: (i % 5) * 180,
      top: Math.floor(i / 5) * 164,
    })),
  );
  await sharp({
    create: {
      width: 900,
      height: Math.ceil(files.length / 5) * 164,
      channels: 3,
      background: "#fff",
    },
  })
    .composite(tiles)
    .png()
    .toFile(`tmp/october/sheet-${d}.png`);
  fs.writeFileSync(`tmp/october/files-${d}.json`, JSON.stringify(files));
  if (dir === "president hierachy") {
    const portraits = await Promise.all(
      files.map(async (file) => {
        const meta = await sharp(`public/media/${dir}/${file}`).metadata();
        return {
          src: `/media/${dir}/${file}`,
          width: meta.width,
          height: meta.height,
        };
      }),
    );
    fs.writeFileSync(
      "src/data/presidency-photos.json",
      JSON.stringify(portraits, null, 2),
    );
  }
}
