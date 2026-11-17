"use client";

import { useEffect } from "react";
import { signatureWriter } from "./scroll-motion";

/**
 * Doctor introduction motion, after the reference site's doctor section
 * (doodoorim-clinic.com, `.doctor_sect`):
 * - When the section comes into view, the portrait fades in where it stands and the text
 *   slides in from 100px to the right (CSS in doctor-introduction.css).
 *   Leaving the viewport resets it so it plays again on the way back.
 * - The signature is then written like a pencil stroke.
 * - Over the portrait, a round "+ 약력 보기" pointer follows the mouse with easing 0.15.
 * Nothing is hidden without JavaScript or with reduced motion.
 */
export function DoctorMotion() {
  useEffect(() => {
    const section = document.getElementById("doctors");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!section || preference.matches) return;

    const signature = signatureWriter(section.querySelector<HTMLElement>("[data-signature]"));
    let signTimer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(signTimer);
        if (entry.isIntersecting) {
          section.dataset.active = "";
          signTimer = window.setTimeout(() => signature.update(1), 1100);
        } else {
          delete section.dataset.active;
          signature.update(0);
        }
      },
      { threshold: 0.2 },
    );
    section.dataset.motion = "on";
    observer.observe(section);

    // Mouse-following pointer over the portrait (fine pointers only).
    const photo = section.querySelector<HTMLElement>("[data-doctor-photo]");
    const pointer = section.querySelector<HTMLElement>("[data-doctor-pointer]");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let frame = 0;
    const follow = () => {
      current = {
        x: current.x + (target.x - current.x) * 0.15,
        y: current.y + (target.y - current.y) * 0.15,
      };
      if (pointer) pointer.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(follow);
    };
    const move = (event: PointerEvent) => {
      if (!pointer) return;
      const half = pointer.offsetWidth / 2;
      target = { x: event.clientX - half, y: event.clientY - half };
    };
    const enter = (event: PointerEvent) => {
      if (!pointer || !finePointer.matches || event.pointerType !== "mouse") return;
      move(event);
      if (!pointer.dataset.on) current = { ...target };
      pointer.dataset.on = "";
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const leave = () => {
      if (!pointer) return;
      delete pointer.dataset.on;
      // Let the fade-out finish before the loop stops.
      window.setTimeout(() => {
        if (pointer.dataset.on === undefined && frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      }, 300);
    };
    photo?.addEventListener("pointerenter", enter);
    photo?.addEventListener("pointermove", move);
    photo?.addEventListener("pointerleave", leave);
    photo?.addEventListener("click", leave);

    const clear = () => {
      observer.disconnect();
      window.clearTimeout(signTimer);
      signature.clear();
      delete section.dataset.motion;
      delete section.dataset.active;
      photo?.removeEventListener("pointerenter", enter);
      photo?.removeEventListener("pointermove", move);
      photo?.removeEventListener("pointerleave", leave);
      photo?.removeEventListener("click", leave);
      cancelAnimationFrame(frame);
      frame = 0;
      if (pointer) delete pointer.dataset.on;
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
