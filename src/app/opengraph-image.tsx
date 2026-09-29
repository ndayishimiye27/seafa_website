import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brandLogos } from "@/content/brand";
const logoData = await readFile(
  join(process.cwd(), "public", brandLogos.icon.src),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;
export const alt =
  "SEAFA — Une famille, un héritage. Depuis 2013. Tugire Iteka.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function SocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#071d3b",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#d0ad59",
        }}
      >
        {/* ImageResponse renders the supplied crest directly; next/image is for browser UI. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Écusson SEAFA" width={104} height={104} />
        <span>Depuis 2013</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 70,
          fontWeight: 700,
          lineHeight: 1.15,
        }}
      >
        <span>Plus qu’une équipe.</span>
        <span style={{ color: "#d0ad59" }}>Une famille. Un héritage.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Football · Fraternité · Service</span>
        <span>Tugire Iteka</span>
      </div>
    </div>,
    size,
  );
}
