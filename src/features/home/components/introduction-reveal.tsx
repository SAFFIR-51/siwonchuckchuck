"use client";

import { useEffect } from "react";

/** Enhance the server-rendered content without hiding it when JavaScript is unavailable. */
export function IntroductionReveal() {
  useEffect(() => {
    const section = document.getElementById("about");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches || !("IntersectionObserver" in window)) return;

    const animations = new Map<Element, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animations.get(entry.target)?.play();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -64px 0px" },
    );

    for (const element of section.querySelectorAll<HTMLElement>("[data-intro-reveal]")) {
      const animation = element.animate(
        [
          { opacity: 0, transform: "translateY(72px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 1200,
          delay: Number(element.dataset.introReveal) || 0,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)",
          fill: "both",
        },
      );
      animation.pause();
      animation.onfinish = () => {
        animation.cancel();
        animations.delete(element);
      };
      animations.set(element, animation);
      observer.observe(element);
    }

    const clear = () => {
      observer.disconnect();
      for (const animation of animations.values()) animation.cancel();
      animations.clear();
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
