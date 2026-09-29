"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ResolvedAlbumImage } from "@/lib/media";

interface AlbumLightboxProps {
  images: readonly ResolvedAlbumImage[];
  initialIndex: number;
  albumTitle: string;
  onClose: () => void;
}

const focusableSelector = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function AlbumLightbox({
  images,
  initialIndex,
  albumTitle,
  onClose,
}: AlbumLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const imageCount = images.length;
  const currentImage = images[currentIndex];

  const showPrevious = useCallback(() => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentIndex((index) => (index === 0 ? imageCount - 1 : index - 1));
  }, [imageCount]);

  const showNext = useCallback(() => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentIndex((index) => (index === imageCount - 1 ? 0 : index + 1));
  }, [imageCount]);

  useEffect(() => {
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, showNext, showPrevious]);

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartXRef.current =
      event.touches.length === 1 ? (event.touches[0]?.clientX ?? null) : null;
    touchStartYRef.current =
      event.touches.length === 1 ? (event.touches[0]?.clientY ?? null) : null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const startingX = touchStartXRef.current;
    const startingY = touchStartYRef.current;
    const endingX = event.changedTouches[0]?.clientX;
    const endingY = event.changedTouches[0]?.clientY;

    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (
      startingX === null ||
      endingX === undefined ||
      startingY === null ||
      endingY === undefined
    ) {
      return;
    }

    const distance = endingX - startingX;

    if (
      Math.abs(distance) < 50 ||
      Math.abs(distance) <= Math.abs(endingY - startingY) * 1.5
    ) {
      return;
    }

    if (distance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }

  if (!currentImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 sm:p-6"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Galerie en plein écran : ${albumTitle}`}
        className="relative flex h-full w-full max-w-7xl flex-col"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between gap-4 pb-3 text-white">
          <p
            className="text-sm font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            Image {currentIndex + 1} sur {imageCount}
          </p>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
            aria-label="Fermer la galerie"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-black">
          <Image
            key={currentImage.media.id}
            src={currentImage.media.src}
            alt={currentImage.media.alt}
            fill
            loading="eager"
            sizes="100vw"
            className="object-contain"
          />

          {imageCount > 1 ? (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[#d0ad59] sm:left-4 sm:size-12"
                aria-label="Afficher l’image précédente"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[#d0ad59] sm:right-4 sm:size-12"
                aria-label="Afficher l’image suivante"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          ) : null}
        </div>

        {currentImage.caption || currentImage.media.credit ? (
          <div className="px-2 pt-4 text-center text-sm leading-6 text-white/80">
            {currentImage.caption ? <p>{currentImage.caption}</p> : null}

            {currentImage.media.credit ? (
              <p className="mt-1 text-xs text-white/55">
                Photo : {currentImage.media.credit}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
