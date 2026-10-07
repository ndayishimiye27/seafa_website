"""Create browser-compatible derivatives and real frame previews; retain all originals."""
import json
from pathlib import Path
import subprocess
import zipfile
import struct

root = Path(__file__).resolve().parent.parent
wheel = next((root / "tmp/october").glob("imageio_ffmpeg-*.whl"))
with zipfile.ZipFile(wheel) as archive:
    executable = next(name for name in archive.namelist() if name.endswith(".exe"))
    ffmpeg = root / "tmp/october/ffmpeg.exe"
    ffmpeg.write_bytes(archive.read(executable))

sources = json.loads((root / "docs/OCTOBER_VIDEO_SOURCE_AUDIT.json").read_text(encoding="utf-8"))
video_dir = root / "public/media/videos/sages-jeunes-2025"
poster_dir = root / "public/media/video-posters/sages-jeunes-2025"
video_dir.mkdir(parents=True, exist_ok=True)
poster_dir.mkdir(parents=True, exist_ok=True)
media, videos, audit = [], [], []
for index, source in enumerate(sources, 1):
    original = root / ("public" + source["src"])
    derivative = video_dir / f"sequence-{index:02}.mp4"
    poster = poster_dir / f"sequence-{index:02}.png"
    filters = "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,format=yuv420p"
    if source["width"] == 0:
        filters = "zscale=transfer=linear:npl=100,format=gbrpf32le,zscale=primaries=bt709,tonemap=hable:desat=0,zscale=transfer=bt709:matrix=bt709:range=tv,format=yuv420p," + filters
    conversion = subprocess.run([str(ffmpeg), "-nostdin", "-hide_banner", "-y", "-threads", "2", "-i", str(original), "-map", "0:v:0", "-map", "0:a?", "-vf", filters, "-r", "30", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-threads", "2", "-preset", "fast", "-crf", "24", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(derivative)], capture_output=True, text=True, check=True)
    subprocess.run([str(ffmpeg), "-nostdin", "-hide_banner", "-y", "-ss", "0.2", "-i", str(derivative), "-frames:v", "1", "-vf", "scale=640:360:force_original_aspect_ratio=decrease,format=rgb24", str(poster)], capture_output=True, check=True)
    width, height = struct.unpack(">II", poster.read_bytes()[16:24])
    media_id = f"october-video-poster-{index:02}"
    title = f"Les sages face aux jeunes — décembre 2025 — séquence {index}"
    media.append({"id": media_id, "src": "/" + poster.relative_to(root / "public").as_posix(), "width": width, "height": height, "alt": f"Image de la séquence {index} du match entre les sages et les jeunes"})
    videos.append({"src": "/" + derivative.relative_to(root / "public").as_posix(), "originalSrc": source["src"], "posterMediaId": media_id, "title": title})
    audit.append({"original": source["src"], "originalBytes": original.stat().st_size, "derivative": videos[-1]["src"], "derivativeBytes": derivative.stat().st_size, "poster": media[-1]["src"], "videoCodec": "h264", "pixelFormat": "yuv420p", "audioCodec": "aac", "fastStart": True, "hdrToneMapped": source["width"] == 0})
    print(f"Prepared sequence {index}: {derivative.stat().st_size} bytes", flush=True)
(root / "src/data/october-video-media.ts").write_text('import type { MediaAsset } from "@/types/content";\nexport const octoberVideoMedia: MediaAsset[] = ' + json.dumps(media, ensure_ascii=False, indent=2) + ';\n', encoding="utf-8")
(root / "src/data/october-videos.json").write_text(json.dumps(videos, ensure_ascii=False, indent=2), encoding="utf-8")
(root / "docs/OCTOBER_VIDEO_CONVERSION.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")
