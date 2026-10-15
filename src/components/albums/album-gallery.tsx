"use client";

import Image from "next/image";
import { useState } from "react";

import { AlbumLightbox } from "@/components/albums/album-lightbox";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import { resolveAlbumImages } from "@/lib/media";
import type { Album } from "@/types/content";

interface AlbumGalleryProps {
  album: Album;
}

export function AlbumGallery({ album }: AlbumGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const images = resolveAlbumImages(album);

  if (images.length === 0) {
    return (
      <EmptyAlbumState
        title="Photographies à venir"
        message="Cet album a été préparé, mais ses photographies officielles n’ont pas encore été publiées."
        actionLabel="Voir les autres albums"
        actionHref="/gallery"
      />
    );
  }

  return (
    <>
      <div className="album-photo-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.slice(0, expanded ? images.length : 12).map((image, index) => {
          const isWide = index === 0 && images.length >= 3;

          return (
            <figure
              key={`${image.media.id}-${image.order}`}
              className={`flex min-w-0 flex-col ${isWide ? "sm:col-span-2 lg:row-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group relative block w-full overflow-hidden rounded-md bg-slate-100 text-left focus:outline-none focus:ring-2 focus:ring-[#b7923d] focus:ring-offset-4 ${
                  isWide
                    ? "aspect-[4/3] lg:flex-1 lg:min-h-[30rem]"
                    : "aspect-[4/3]"
                }`}
                aria-label={`Ouvrir l’image ${index + 1} sur ${images.length} en plein écran`}
              >
                <Image
                  src={image.media.src}
                  alt={image.media.alt}
                  fill
                  sizes={
                    isWide
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-contain transition-opacity duration-300 group-hover:opacity-95 motion-reduce:transition-none"
                />

                <span className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition group-hover:bg-[#071d3b]">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4M11 8v6M8 11h6" />
                  </svg>
                </span>
              </button>
              {(image.caption || image.media.credit) && (
                <figcaption className="photo-caption">
                  {image.caption && <span>{image.caption}</span>}
                  {image.media.credit && (
                    <span>Photo : {image.media.credit}</span>
                  )}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
      {images.length > 12 && (
        <div className="archive-expand">
          <p>
            Une première sélection pour découvrir cette rencontre. Les autres
            photographies restent accessibles dans l’archive.
          </p>
          <button
            type="button"
            className="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Réduire la collection"
              : `Voir les ${images.length - 12} autres photographies`}
          </button>
        </div>
      )}

      {selectedIndex !== null ? (
        <AlbumLightbox
          images={images}
          initialIndex={selectedIndex}
          albumTitle={album.title}
          onClose={() => setSelectedIndex(null)}
        />
      ) : null}
    </>
  );
}
