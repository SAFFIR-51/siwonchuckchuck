"use client";

import { useEffect } from "react";
import { clearMotionStyles, revealLines, textProgress } from "./scroll-motion";

/** Reveal the heading without scaling or cropping the clinic photographs. */
export function GalleryMotion() {
  useEffect(() => {
    const section = document.getElementById("gallery");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;
    const head = section.querySelector<HTMLElement>("[data-gallery-head]");
    const lines = [...section.querySelectorAll<HTMLElement>("[data-reveal-text]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (head) revealLines(lines, textProgress(head, window.innerHeight));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const clear = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      clearMotionStyles(lines);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const onPreferenceChange = () => {
      if (preference.matches) clear();
    };
    preference.addEventListener("change", onPreferenceChange);
    update();
    return () => {
      clear();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);
  return null;
}
