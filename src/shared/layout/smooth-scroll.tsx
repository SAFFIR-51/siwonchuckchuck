"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Inertial wheel scrolling on wide screens, tuned like the reference site
 * (doodoorim-clinic.com: Lenis, 1s duration, desktop wider than 1240px only).
 * Off for touch-sized screens and for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1241px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const sync = () => {
      const enabled = wide.matches && !reduced.matches;
      if (enabled && !lenis) {
        lenis = new Lenis({
          duration: 1,
          autoRaf: true,
          // Matches `scroll-padding-top` in globals.css so in-page links clear the header.
          anchors: { offset: -100 },
          allowNestedScroll: true,
          // Leave scrolling native while a dialog is open or inside marked areas.
          prevent: (node) =>
            Boolean(document.querySelector("dialog[open]")) ||
            node.hasAttribute("data-lenis-prevent"),
        });
      } else if (!enabled && lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, []);

  return null;
}
