"use client";
import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { TreatmentHeroDetails } from "./treatment-hero-details";
import { homeContent } from "../model/content";
import { heroPhotos, spineHeroTitle, treatmentHero } from "../model/hero";

export function Hero() {
  const [selected, setSelected] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const inView = useRef(true);
  const lastChange = useRef(0);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  function move(direction: number) {
    lastChange.current = Date.now();
    setSelected((current) => (current + direction + heroPhotos.length) % heroPhotos.length);
  }
  const autoAdvance = useEffectEvent(() => {
    if (
      document.hidden ||
      !inView.current ||
      hovered.current ||
      focused.current ||
      gesture.current ||
      document.querySelector("dialog[open]") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      lastChange.current = Date.now();
      return;
    }
    if (Date.now() - lastChange.current >= 6000) move(1);
  });
  useEffect(() => {
    lastChange.current = Date.now();
    const timer = window.setInterval(autoAdvance, 500);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    if (frame.current) observer.observe(frame.current);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);
  const isSpine = heroPhotos[selected].name === "hero-spine-curve-sky";
  const isTreatment = heroPhotos[selected].name === "hero-treatment";
  const title = isSpine ? spineHeroTitle : isTreatment ? treatmentHero.title : homeContent.title;
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-white px-[15px] pb-5 min-[769px]:px-5 min-[1241px]:pb-10 min-[1641px]:px-[63px] min-[2001px]:px-[70px] min-[2001px]:pb-[50px]"
    >
      <div
        ref={frame}
        aria-roledescription="carousel"
        aria-label="병원 소개 슬라이드"
        onMouseEnter={() => {
          hovered.current = true;
        }}
        onMouseLeave={() => {
          hovered.current = false;
          lastChange.current = Date.now();
        }}
        onFocusCapture={() => {
          focused.current = true;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            focused.current = false;
            lastChange.current = Date.now();
          }
        }}
        onPointerDown={(event) => {
          if (
            !event.isPrimary ||
            event.button !== 0 ||
            (event.target as HTMLElement).closest("a, button")
          )
            return;
          gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          const start = gesture.current;
          if (!start || start.id !== event.pointerId) return;
          gesture.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onLostPointerCapture={() => {
          gesture.current = null;
        }}
        className="relative isolate flex min-h-[520px] w-full touch-pan-y items-center justify-center overflow-hidden rounded-[24px] bg-slate-900 text-white select-none max-sm:aspect-[16/25] max-sm:max-h-[680px] min-[1241px]:h-[calc(100svh-110px)] min-[1241px]:min-h-[600px] min-[1641px]:h-[calc(100svh-120px)] min-[2001px]:h-[calc(100svh-140px)] min-[2001px]:rounded-[32px] sm:h-[calc(100svh-90px)]"
      >
        {heroPhotos.map((photo, index) => (
          <div
            key={photo.name}
            aria-hidden={selected !== index}
            className={cn(
              "absolute inset-0 -z-20 transition-opacity duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
              selected === index ? "opacity-100" : "opacity-0",
            )}
          >
            <picture>
              <source
                media="(max-width: 1023px)"
                srcSet={`/images/clinic/${photo.mobileName}.webp`}
              />
              <Image
                src={`/images/clinic/${photo.name}.webp`}
                alt={photo.alt}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable={false}
                unoptimized
                sizes="100vw"
                className={cn(
                  "object-cover object-center",
                  photo.name === "hero-treatment" &&
                    "object-center min-[1024px]:object-[70%_center] lg:object-center",
                  photo.name === "hero-reception-front-original" && "scale-[1.02] -rotate-[0.6deg]",
                )}
              />
            </picture>
          </div>
        ))}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 transition-colors duration-700 motion-reduce:transition-none",
            isSpine ? "bg-black/30" : isTreatment ? "bg-black/20 lg:bg-black/5" : "bg-black/38",
          )}
        />
        <div
          className={cn(
            "z-10 flex w-full flex-col items-center px-5 pb-8 text-center min-[1024px]:px-24 lg:px-32",
            isTreatment && "max-lg:pt-11",
          )}
        >
          {isTreatment && <TreatmentHeroDetails />}
          <p className="mb-6 inline-block rounded-[24px] bg-[#173c83] px-4 py-2.5 text-sm leading-relaxed font-semibold text-white min-[2001px]:rounded-[32px] sm:px-6 sm:py-3 sm:text-lg lg:order-last lg:mt-11 lg:mb-0 lg:text-2xl">
            {isTreatment ? treatmentHero.subtitle : homeContent.heroChip}
          </p>
          <h1
            id="hero-title"
            className="text-[clamp(27px,7.5vw,40px)] leading-[1.22] font-extrabold tracking-[-0.045em] text-white min-[1024px]:text-[clamp(36px,5.4vw,112px)]"
          >
            {title[0]}
            <br />
            {title[1]}
          </h1>
        </div>
        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 sm:bottom-9 sm:left-9 sm:translate-x-0"
          role="group"
          aria-label="메인 사진 전환"
        >
          <button
            onClick={() => move(-1)}
            aria-label="이전 원내 사진"
            className="flex size-11 items-center justify-center text-white/65 transition-colors hover:text-white focus-visible:outline-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
              aria-hidden="true"
            >
              <path d="M20 12H4m7-7-7 7 7 7" />
            </svg>
          </button>
          <span className="min-w-5 text-center text-sm font-semibold tabular-nums">
            {String(selected + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="relative h-1 w-16 overflow-hidden rounded-full bg-white/30"
          >
            <span
              className="absolute inset-0 origin-left rounded-full bg-white transition-transform duration-200 motion-reduce:transition-none"
              style={{ transform: `scaleX(${(selected + 1) / heroPhotos.length})` }}
            />
          </span>
          <span className="min-w-5 text-center text-sm font-semibold text-white/60 tabular-nums">
            {String(heroPhotos.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => move(1)}
            aria-label="다음 원내 사진"
            className="flex size-11 items-center justify-center text-white/65 transition-colors hover:text-white focus-visible:outline-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-6"
              aria-hidden="true"
            >
              <path d="M4 12h16m-7-7 7 7-7 7" />
            </svg>
          </button>
          <span className="sr-only" aria-live="off">
            {heroPhotos[selected].label}
          </span>
        </div>
        <a
          href="#about"
          aria-label="병원 소개로 이동"
          className="absolute top-1/2 right-5 hidden min-w-11 -translate-y-1/2 flex-col items-center gap-3 py-3 text-white sm:flex lg:right-8"
        >
          <span className="text-xs leading-none font-bold [writing-mode:vertical-rl]">
            SCROLL DOWN
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="m3 4 5 5 5-5M3 8l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
