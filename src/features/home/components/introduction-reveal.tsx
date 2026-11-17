"use client";

import { useEffect } from "react";
import {
  clamp01,
  clearMotionStyles,
  revealLines,
  signatureWriter,
  textProgress,
} from "./scroll-motion";

/**
 * Scroll-linked motion for the hospital introduction. The server-rendered content stays
 * fully visible without JavaScript or with reduced motion.
 * - Heading lines and copy rise in one after another as the visitor scrolls.
 * - Once the copy is complete, the signature is written in like a pencil stroke.
 * - Photo cards drift in from their own side toward the centre and gain opacity.
 */
export function IntroductionReveal() {
  useEffect(() => {
    const section = document.getElementById("about");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;

    const copy = section.querySelector<HTMLElement>("[data-about-copy]");
    const lines = [...section.querySelectorAll<HTMLElement>("[data-reveal-text]")];
    const signature = signatureWriter(section.querySelector<HTMLElement>("[data-signature]"));
    const cards = [...section.querySelectorAll<HTMLElement>("[data-converge]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;

      if (copy) {
        // Finishes early: from the copy entering the viewport until its top reaches 60%.
        const progress = textProgress(copy, viewport, 1, 0.6);
        revealLines(lines, progress);
        signature.update(progress);
      }

      for (const [index, card] of cards.entries()) {
        const { top, height } = card.getBoundingClientRect();
        // 0 just before the card enters the viewport, 1 when its bottom reaches 70% of it.
        const offset = 1 - clamp01((viewport * 1.15 - top) / (viewport * 0.45 + height));
        const side = index % 2 === 0 ? -1 : 1;
        card.style.opacity = String(1 - offset);
        card.style.transform = `translate3d(${side * 50 * offset}px, ${50 * offset}px, 0)`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    const clear = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      signature.clear();
      clearMotionStyles([...lines, ...cards]);
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
