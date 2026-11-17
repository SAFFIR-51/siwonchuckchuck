"use client";

import { useEffect } from "react";
import { clearMotionStyles, revealLines, textProgress } from "./scroll-motion";
import "./treatment-guide.css";

/**
 * Treatment guide motion, in the same language as the sections above:
 * - The heading slides up from behind its lines and the copy rises in with the scroll.
 * - The tabs and the panel rise in once as they enter.
 * - Switching tabs fades the photo in where it stands and lifts the text in turn
 *   (CSS keyframes in treatment-guide.css, run whenever the panel content changes).
 * Nothing is hidden without JavaScript or with reduced motion.
 */
export function TreatmentGuideMotion() {
  useEffect(() => {
    const section = document.getElementById("treatment-guide");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;

    const head = section.querySelector<HTMLElement>("[data-tg-head]");
    const lines = [...section.querySelectorAll<HTMLElement>("[data-tg-head] [data-reveal-text]")];
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    section.dataset.motion = "on";
    for (const element of section.querySelectorAll("[data-tg-reveal]")) reveal.observe(element);

    let frame = 0;
    const update = () => {
      frame = 0;
      if (head) revealLines(lines, textProgress(head, window.innerHeight, 1, 0.6));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    const clear = () => {
      reveal.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      clearMotionStyles(lines);
      delete section.dataset.motion;
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
