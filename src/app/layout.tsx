import type { Viewport } from "next";
import { brandLogos } from "@/content/brand";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { baseMetadata, siteUrl, siteDescription } from "@/lib/metadata";
import "@/styles/globals.css";
import { memberLoginUrl } from "@/lib/member-login";
export const metadata = baseMetadata;
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071d3b",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saint Esprit Alumni Football Academy",
    alternateName: "SEAFA",
    foundingDate: "2013",
    slogan: "Tugire Iteka",
    description: siteDescription,
    url: siteUrl,
    logo: new URL(brandLogos.main.src, siteUrl).toString(),
  };
  return (
    <html lang="fr-BI">
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded bg-[#d0ad59] px-5 py-3 font-bold text-[#071d3b] focus:translate-y-0"
        >
          Aller au contenu principal
        </a>
        <Header memberUrl={memberLoginUrl() ?? "/login"} />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
