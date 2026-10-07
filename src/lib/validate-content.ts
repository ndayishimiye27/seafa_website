import { validateContent } from "@/lib/content-validation";
import { mediaAssets } from "@/data/media";
import { albums } from "@/data/albums";
import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";

const result = validateContent();
const publicRoot = resolve("public");
for (const album of albums) {
  for (const video of album.videos ?? []) {
    if (
      video.posterMediaId &&
      !mediaAssets.some((media) => media.id === video.posterMediaId)
    ) {
      result.valid = false;
      result.errors.push({
        severity: "error",
        contentType: "album",
        contentId: album.id,
        field: "videos",
        message: `Missing video poster: ${video.posterMediaId}`,
      });
    }
    const file = resolve(publicRoot, "." + video.src);
    if (
      !video.title.trim() ||
      !video.src.startsWith("/media/") ||
      !file.startsWith(publicRoot + sep) ||
      !existsSync(file)
    ) {
      result.valid = false;
      result.errors.push({
        severity: "error",
        contentType: "album",
        contentId: album.id,
        field: "videos",
        message: `Missing or invalid local video: ${video.src}`,
      });
    }
  }
}
for (const media of mediaAssets) {
  if (!media.src.startsWith("/")) continue;
  const file = resolve(publicRoot, "." + decodeURIComponent(media.src));
  if (!file.startsWith(publicRoot + sep) || !existsSync(file)) {
    result.valid = false;
    result.errors.push({
      severity: "error",
      contentType: "media",
      contentId: media.id,
      field: "src",
      message: `Local image file is missing or outside public: ${media.src}`,
    });
  }
}

for (const warning of result.warnings) {
  console.warn(
    `WARNING [${warning.contentType}:${warning.contentId}] ${warning.field}: ${warning.message}`,
  );
}

for (const error of result.errors) {
  console.error(
    `ERROR [${error.contentType}:${error.contentId}] ${error.field}: ${error.message}`,
  );
}

if (!result.valid) {
  console.error(
    `Content validation failed with ${result.errors.length} error(s) and ${result.warnings.length} warning(s).`,
  );

  process.exitCode = 1;
} else {
  console.log(
    `Content validation passed with ${result.warnings.length} warning(s).`,
  );
}
