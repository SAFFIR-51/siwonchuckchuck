"use client";

import { useEffect } from "react";
import { clamp01 } from "./scroll-motion";

export function PhilosophyMotion() {
  useEffect(() => {
    const section = document.getElementById("philosophy");
    if (!section) return;
    const intro = section.querySelector<HTMLElement>(".philosophy-intro");
    const stage = section.querySelector<HTMLElement>(".philosophy-stage");
    const sequence = section.querySelector<HTMLElement>(".philosophy-sequence");
    const left = section.querySelector<HTMLElement>("[data-philosophy-left]");
    const right = section.querySelector<HTMLElement>("[data-philosophy-right]");
    const lines = [...section.querySelectorAll<HTMLElement>("[data-philosophy-line]")];
    if (!intro || !stage || !sequence || !left || !right) return;

    const desktop = window.matchMedia("(min-width: 1024px) and (min-height: 650px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const viewport = window.innerHeight;
      const top = intro.getBoundingClientRect().top;
      const progress = clamp01(
        -sequence.getBoundingClientRect().top / (sequence.offsetHeight - viewport),
      );
      const text = desktop.matches
        ? clamp01(progress / 0.2)
        : clamp01((viewport * 0.8 - top) / (intro.offsetHeight * 0.8));
      for (const [index, line] of lines.entries()) {
        line.style.setProperty("--ink", `${clamp01(text * 3 - index) * 100}%`);
      }

      if (!desktop.matches) return;
      // Keep the introduction pinned while opposite panels cover the very same frame.
      const cover = clamp01((progress - 0.23) / 0.15);
      const open = clamp01((progress - 0.4) / 0.12);
      stage.style.setProperty("--cover", String(cover));
      stage.style.setProperty("--curtain", String(1 - open));
      const swap = clamp01((progress - 0.62) / 0.23);
      left.style.transform = `translate3d(0, ${-swap * 50}%, 0)`;
      right.style.transform = `translate3d(0, ${(swap - 1) * 50}%, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete section.dataset.motion;
      left.style.removeProperty("transform");
      right.style.removeProperty("transform");
      stage.style.removeProperty("--curtain");
      stage.style.removeProperty("--cover");
      for (const line of lines) line.style.removeProperty("--ink");
      if (!reduced.matches) {
        section.dataset.motion = desktop.matches ? "desktop" : "mobile";
        update();
      }
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      cancelAnimationFrame(frame);
      delete section.dataset.motion;
      left.style.removeProperty("transform");
      right.style.removeProperty("transform");
      stage.style.removeProperty("--curtain");
      stage.style.removeProperty("--cover");
      for (const line of lines) line.style.removeProperty("--ink");
    };
  }, []);

  return null;
}
