"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { resolveMedia } from "@/lib/media";
import type { HomepageHighlight } from "@/types/content";

interface HighlightsSlideshowProps {
  highlights: readonly HomepageHighlight[];
}

const highlightTypeLabels: Record<HomepageHighlight["type"], string> = {
  membership: "Recrutement",
  "recent-activity": "Activité récente",
  "historical-memory": "Souvenir",
  "match-invitation": "Invitation",
  "upcoming-event": "Événement",
  award: "Distinction",
  announcement: "Annonce",
};

const alignmentClasses: Record<HomepageHighlight["textAlignment"], string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

function subscribeToReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export function HighlightsSlideshow({ highlights }: HighlightsSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);

  const touchStartXRef = useRef<number | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const slideCount = highlights.length;
  const safeIndex = slideCount > 0 ? Math.min(currentIndex, slideCount - 1) : 0;

  const currentHighlight = highlights[safeIndex];

  const showPrevious = useCallback(() => {
    if (slideCount <= 1) {
      return;
    }

    setCurrentIndex((index) => (index === 0 ? slideCount - 1 : index - 1));
  }, [slideCount]);

  const showNext = useCallback(() => {
    if (slideCount <= 1) {
      return;
    }

    setCurrentIndex((index) => (index >= slideCount - 1 ? 0 : index + 1));
  }, [slideCount]);

  useEffect(() => {
    if (!playing || interactionPaused || reducedMotion || slideCount <= 1) {
      return;
    }

    const timer = window.setInterval(showNext, 7000);

    return () => {
      window.clearInterval(timer);
    };
  }, [interactionPaused, playing, reducedMotion, showNext, slideCount]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    const startingX = touchStartXRef.current;
    const endingX = event.changedTouches[0]?.clientX;

    touchStartXRef.current = null;

    if (startingX === null || endingX === undefined) {
      return;
    }

    const distance = endingX - startingX;

    if (Math.abs(distance) < 50) {
      return;
    }

    if (distance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }

  if (!currentHighlight) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-[#071d3b] px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16 lg:px-14">
        <div
          className="surface-grid absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            À la une
          </p>

          <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Les actualités SEAFA arrivent prochainement
          </h3>

          <p className="mt-5 max-w-2xl leading-8 text-white/70">
            Les activités récentes, les souvenirs, les événements et les
            annonces officielles seront présentés ici.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/join"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#806026] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#806026] focus:outline-none focus:ring-2 focus focus:ring-white"
            >
              Rejoindre SEAFA
            </Link>

            <Link
              href="/request-match"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
            >
              Proposer un match
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const desktopMedia = resolveMedia(currentHighlight.desktopMediaId);

  const mobileMedia = resolveMedia(currentHighlight.mobileMediaId);

  return (
    <section
      className="media-highlight relative overflow-hidden rounded-3xl bg-[#071d3b] shadow-2xl"
      aria-roledescription="carousel"
      aria-label="Actualités et temps forts de SEAFA"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteractionPaused(false);
        }
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative min-h-[31rem] sm:min-h-[34rem] lg:min-h-[38rem]">
        {desktopMedia ? (
          <picture>
            {mobileMedia ? (
              <source media="(max-width: 639px)" srcSet={mobileMedia.src} />
            ) : null}

            <Image
              key={desktopMedia.id}
              src={desktopMedia.src}
              alt={desktopMedia.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain"
            />
          </picture>
        ) : (
          <>
            <div
              className="surface-grid absolute inset-0 opacity-60"
              aria-hidden="true"
            />

            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, rgba(208,173,89,0.3), transparent 30%), radial-gradient(circle at 15% 85%, rgba(66,112,165,0.35), transparent 35%)",
              }}
            />
          </>
        )}

        <div
          className="absolute inset-0 bg-black"
          aria-hidden="true"
          style={{
            opacity: currentHighlight.overlayStrength,
          }}
        />

        <div
          className={`relative z-10 flex min-h-[31rem] flex-col justify-end px-6 pb-24 pt-16 text-white sm:min-h-[34rem] sm:px-10 sm:pb-24 lg:min-h-[38rem] lg:px-14 ${alignmentClasses[currentHighlight.textAlignment]}`}
        >
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
              {highlightTypeLabels[currentHighlight.type]}

              {currentHighlight.relativeTimeLabel
                ? ` · ${currentHighlight.relativeTimeLabel}`
                : ""}
            </p>

            <h3 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {currentHighlight.title}
            </h3>

            <p className="mt-5 text-lg leading-8 text-white/80">
              {currentHighlight.message}
            </p>

            <Link
              href={currentHighlight.cta.href}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#806026] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#806026] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-[#071d3b]"
            >
              {currentHighlight.cta.label}
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-white/15 bg-black/25 px-4 py-4 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-2">
            {highlights.map((highlight, index) => (
              <button
                key={highlight.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#d0ad59] focus:ring-offset-2 focus:ring-offset-[#071d3b] ${
                  safeIndex === index
                    ? "w-8 bg-[#d0ad59]"
                    : "w-2.5 bg-white/45 hover:bg-white"
                }`}
                aria-label={`Afficher le temps fort ${index + 1} sur ${slideCount}`}
                aria-current={safeIndex === index ? "true" : undefined}
              />
            ))}
          </div>

          {slideCount > 1 ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
                aria-label={
                  playing
                    ? "Mettre le diaporama en pause"
                    : "Reprendre le diaporama"
                }
              >
                {playing ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="m8 5 11 7-11 7V5z" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                onClick={showPrevious}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
                aria-label="Temps fort précédent"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
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
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
                aria-label="Temps fort suivant"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
