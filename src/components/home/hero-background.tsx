"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

export interface HeroSlide {
  src: string;
  alt: string;
  position?: string;
}
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
export function HeroBackground({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [playing, setPlaying] = useState(true);
  const [focused, setFocused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
  const running = playing && !reduced && !hidden && !focused;
  useEffect(() => {
    if (!running || slides.length < 2) return;
    const timer = window.setTimeout(
      () => setRequested((active + 1) % slides.length),
      6000,
    );
    return () => window.clearTimeout(timer);
  }, [active, running, slides.length]);
  function show(index: number) {
    setRequested((index + slides.length) % slides.length);
    if (loaded.includes((index + slides.length) % slides.length))
      setActive((index + slides.length) % slides.length);
  }
  useEffect(() => {
    if (!running || !loaded.includes(requested) || requested === active) return;
    const frame = requestAnimationFrame(() => setActive(requested));
    return () => cancelAnimationFrame(frame);
  }, [requested, loaded, running, active]);
  return (
    <>
      <div className="hero-background" aria-hidden="true">
        {slides.map(
          (slide, index) =>
            (loaded.includes(index) || index === requested) && (
              <Image
                key={slide.src}
                src={slide.src}
                alt=""
                fill
                preload={index === 0}
                loading={index === 0 ? undefined : "eager"}
                sizes="100vw"
                className={
                  index === active ? "hero-slide is-active" : "hero-slide"
                }
                style={{ objectPosition: slide.position ?? "center 45%" }}
                onLoad={() => {
                  setLoaded((previous) =>
                    previous.includes(index) ? previous : [...previous, index],
                  );
                  if (index === requested) setActive(index);
                }}
              />
            ),
        )}
      </div>
      <div
        className="hero-controls wrap"
        role="group"
        aria-label="Photographies de l’accueil"
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        <span
          className="hero-slide-caption"
          aria-live={running ? "off" : "polite"}
        >
          {slides[active]?.alt}
        </span>
        <div className="hero-control-buttons">
          <button
            type="button"
            onClick={() => show(active - 1)}
            aria-label="Photographie précédente"
          >
            ←
          </button>
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className="hero-indicator"
              aria-label={`Afficher la photographie ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => show(index)}
            >
              <span />
            </button>
          ))}
          <button
            type="button"
            onClick={() => show(active + 1)}
            aria-label="Photographie suivante"
          >
            →
          </button>
          <button
            type="button"
            disabled={reduced}
            onClick={() => setPlaying((previous) => !previous)}
            aria-label={
              playing && !reduced
                ? "Mettre le diaporama en pause"
                : "Reprendre le diaporama"
            }
          >
            {playing && !reduced ? "Ⅱ" : "▶"}
          </button>
        </div>
      </div>
    </>
  );
}
