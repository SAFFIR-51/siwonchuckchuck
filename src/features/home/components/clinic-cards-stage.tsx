"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clamp01, easeOut } from "./scroll-motion";

/**
 * Holds the "진료 분야" heading and its four clinic cards on screen while the visitor
 * scrolls; each scroll step brings in the next card from the right. The page moves on
 * only after all four have arrived. Wide screens with motion allowed only; otherwise
 * the cards are simply shown.
 */
export function ClinicCardsStage({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = wrapper.current;
    const held = stage.current;
    if (!outer || !held) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...held.querySelectorAll<HTMLElement>('a[href^="#clinic-"]')];
    let active = false;
    let frame = 0;
    let distance = 1;

    const layout = () => {
      distance = window.innerHeight * 0.35 * cards.length;
      outer.style.height = `${held.offsetHeight + distance}px`;
    };
    const update = () => {
      frame = 0;
      const progress = clamp01(-outer.getBoundingClientRect().top / distance);
      for (const [index, card] of cards.entries()) {
        // Each card travels during its own quarter of the held distance.
        const local = easeOut(clamp01((progress * cards.length - index) / 0.8));
        // Starts a little off to the right, slightly smaller and transparent.
        card.style.transform = `translate3d(${(1 - local) * 45}vw, 0, 0) scale(${0.94 + 0.06 * local})`;
        card.style.opacity = String(clamp01(local * 1.6));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(() => {
      layout();
      schedule();
    });

    const start = () => {
      if (active) return;
      active = true;
      Object.assign(held.style, {
        position: "sticky",
        top: "0px",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflowX: "clip",
      });
      for (const card of cards) {
        card.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease";
      }
      layout();
      resize.observe(held);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
    };
    const stop = () => {
      if (!active) return;
      active = false;
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      frame = 0;
      for (const property of [
        "position",
        "top",
        "min-height",
        "display",
        "flex-direction",
        "justify-content",
        "overflow-x",
      ]) {
        held.style.removeProperty(property);
      }
      outer.style.removeProperty("height");
      for (const card of cards) {
        for (const property of ["transform", "opacity", "transition"]) {
          card.style.removeProperty(property);
        }
      }
    };
    const sync = () => (wide.matches && !reduced.matches ? start() : stop());
    sync();
    wide.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      stop();
      wide.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={wrapper} className="relative">
      <div ref={stage}>{children}</div>
    </div>
  );
}
