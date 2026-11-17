"use client";

import { useEffect } from "react";
import { clearMotionStyles, revealLines, textProgress } from "./scroll-motion";
import "./ak-section.css";

/**
 * AK section motion, in the same language as the sections above:
 * - In each `[data-ak-group]`, heading lines slide up from behind their line and the copy
 *   rises in with the scroll.
 * - `[data-ak-reveal]` blocks appear once as they enter: the large photo fades in where
 *   it stands; lists rise item by item (`data-ak-stagger`).
 * Nothing is hidden without JavaScript or with reduced motion.
 */
export function AkMotion() {
  useEffect(() => {
    const section = document.getElementById("ak");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;

    const groups = [...section.querySelectorAll<HTMLElement>("[data-ak-group]")].map((group) => ({
      group,
      lines: [...group.querySelectorAll<HTMLElement>("[data-reveal-text]")],
    }));
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
    for (const element of section.querySelectorAll("[data-ak-reveal]")) reveal.observe(element);

    let frame = 0;
    const update = () => {
      frame = 0;
      for (const { group, lines } of groups) {
        revealLines(lines, textProgress(group, window.innerHeight, 1, 0.6));
      }
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
      clearMotionStyles(groups.flatMap(({ lines }) => lines));
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
