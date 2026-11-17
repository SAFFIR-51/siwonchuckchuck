"use client";

import { useEffect } from "react";
import { clamp01, clearMotionStyles, easeOut, revealLines, textProgress } from "./scroll-motion";

/**
 * Scroll-linked motion for the clinic gallery; the slider itself is unchanged.
 * - The heading and copy rise in like the hospital introduction.
 * - The photo row slides in from the right while each photo gains opacity, left first.
 * - Photos shift slightly inside their frames as they move across the screen.
 * Nothing is applied without JavaScript or with reduced motion.
 */
export function GalleryMotion() {
  useEffect(() => {
    const section = document.getElementById("gallery");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;

    const head = section.querySelector<HTMLElement>("[data-gallery-head]");
    const lines = [...section.querySelectorAll<HTMLElement>("[data-reveal-text]")];
    const track = section.querySelector<HTMLElement>("#clinic-gallery-track");
    const bar = section.querySelector<HTMLElement>("[data-gallery-bar]");
    const figures = track ? [...track.querySelectorAll<HTMLElement>(":scope > figure")] : [];
    const photos = figures.map((figure) => figure.querySelector<HTMLElement>("img"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      if (head) revealLines(lines, textProgress(head, viewportHeight));
      if (!track) return;

      // 0 when the row's top enters the viewport, 1 when it reaches 45% of it.
      const progress = easeOut(
        clamp01((viewportHeight - track.getBoundingClientRect().top) / (viewportHeight * 0.55)),
      );
      track.style.transform = `translate3d(${(1 - progress) * 240}px, 0, 0)`;
      if (bar) bar.style.opacity = String(progress);

      for (const [index, figure] of figures.entries()) {
        const rect = figure.getBoundingClientRect();
        const order = clamp01(rect.left / viewportWidth);
        figure.style.opacity = String(clamp01((progress - order * 0.35) / 0.65));
        const shift = Math.max(
          -0.6,
          Math.min(0.6, (rect.left + rect.width / 2 - viewportWidth / 2) / viewportWidth),
        );
        const photo = photos[index];
        if (photo) photo.style.transform = `scale(1.14) translate3d(${-shift * 8}%, 0, 0)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    track?.addEventListener("scroll", schedule, { passive: true });
    update();

    const clear = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      track?.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      clearMotionStyles([...lines, track, bar, ...figures, ...photos]);
    };
    const onPreferenceChange = () => {
      if (preference.matches) clear();
    };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      clear();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return null;
}
