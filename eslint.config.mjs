import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/app/opengraph-image.tsx"],
    // ImageResponse renders an image itself; next/image is a browser component.
    // Scope this explicitly rather than relying on platform-specific filename detection.
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([
    ".next/**",
    "next-env.d.ts",
    "tmp/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
