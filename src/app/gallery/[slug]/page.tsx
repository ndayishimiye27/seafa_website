import { notFound } from "next/navigation";
import { getAlbumBySlug, getPublishedAlbums } from "@/lib/content";
import { AlbumView } from "@/components/albums/album-view";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getPublishedAlbums().map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: Props) {
  const a = getAlbumBySlug((await params).slug);
  return a
    ? pageMetadata(
        a.seo?.title ?? a.title,
        `/gallery/${a.slug}`,
        a.seo?.description ?? a.summary,
      )
    : { title: "Album introuvable", robots: { index: false } };
}
export default async function AlbumPage({ params }: Props) {
  const a = getAlbumBySlug((await params).slug);
  if (!a) notFound();
  return <AlbumView album={a} />;
}

export const dynamicParams = false;
