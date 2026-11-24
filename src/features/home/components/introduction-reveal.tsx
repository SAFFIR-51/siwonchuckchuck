"use client";

import { useEffect } from "react";
import { clearMotionStyles, revealLines, signatureWriter, textProgress } from "./scroll-motion";

/**
 * Scroll-linked motion for the hospital introduction. The server-rendered content stays
 * fully visible without JavaScript or with reduced motion.
 * - Heading lines and copy rise in one after another as the visitor scrolls.
 * - Once the copy is complete, the signature is written in like a pencil stroke.
 * - Photographs stay at full opacity and inside their frames.
 */
export function IntroductionReveal() {
  useEffect(() => {
    const section = document.getElementById("about");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;

    const copy = section.querySelector<HTMLElement>("[data-about-copy]");
    const lines = [...section.querySelectorAll<HTMLElement>("[data-reveal-text]")];
    const signature = signatureWriter(section.querySelector<HTMLElement>("[data-signature]"));
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
      clearMotionStyles(lines);
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
