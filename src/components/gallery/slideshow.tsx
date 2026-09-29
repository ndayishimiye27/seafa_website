import type { GalleryImage } from "@/types/content";
export interface SlideshowProps {
  images: readonly GalleryImage[];
  label: string;
  initialIndex?: number;
  autoPlay?: boolean;
  intervalMs?: number;
  showIndicators?: boolean;
  showCaptions?: boolean;
  allowFullscreen?: boolean;
  keyboardNavigation?: boolean;
  swipeNavigation?: boolean;
  onIndexChange?: (index: number) => void;
}
/** Structural shell only. See docs/SITE_STRUCTURE.md for interaction contract. */
export function Slideshow({ label }: SlideshowProps) {
  return (
    <section aria-label={label}>
      <p>Diaporama à préparer — images officielles à fournir.</p>
    </section>
  );
}
