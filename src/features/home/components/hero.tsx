"use client";
import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { HeroRibbons } from "./hero-ribbons";
import { homeContent } from "../model/content";
import { heroPhotos, spineHero, treatmentHero } from "../model/hero";

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
  return (
    <section
      aria-label="시원척척의원 첫 화면"
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
        className="relative isolate flex h-[calc(100svh-90px)] min-h-[520px] w-full touch-pan-y items-center justify-center overflow-hidden rounded-[24px] bg-slate-900 text-white select-none max-sm:h-[max(430px,calc(100svh-90px))] max-sm:min-h-0 min-[1241px]:h-[calc(100svh-110px)] min-[1241px]:min-h-[600px] min-[1641px]:h-[calc(100svh-120px)] min-[2001px]:h-[calc(100svh-140px)] min-[2001px]:rounded-[32px]"
      >
        {heroPhotos.map((photo, index) => {
          const isSpine = photo.name === "hero-spine-curve-sky";
          const isTreatment = photo.name === "hero-treatment";
          const featuredSlide = isSpine ? spineHero : isTreatment ? treatmentHero : null;
          const title = featuredSlide?.title ?? homeContent.title;

          const active = selected === index;

          return (
            <div key={photo.name} className="contents">
              <div
                className={cn(
                  "absolute inset-0 -z-20 transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
                  active ? "visible opacity-100" : "invisible opacity-0",
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
                      isTreatment &&
                        "object-center min-[1024px]:object-[70%_center] lg:object-center",
                      !featuredSlide && "scale-[1.02] -rotate-[0.6deg]",
                    )}
                  />
                </picture>
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0",
                    isSpine
                      ? "bg-black/30"
                      : isTreatment
                        ? "bg-black/20 lg:bg-black/5"
                        : "bg-black/38",
                  )}
                />
              </div>
              <div
                className={cn(
                  "z-10 w-full flex-col items-center px-5 pb-8 text-center max-lg:pt-11 lg:px-32",
                  active ? "flex" : "hidden",
                )}
              >
                {featuredSlide && (
                  <HeroRibbons items={featuredSlide.items} showBadge={isTreatment} />
                )}
                <p className="mb-6 inline-block rounded-[24px] bg-[#173c83] px-4 py-2.5 text-sm leading-relaxed font-semibold text-white min-[2001px]:rounded-[32px] sm:px-6 sm:py-3 sm:text-lg lg:order-last lg:mt-11 lg:mb-0 lg:text-2xl">
                  {isTreatment ? treatmentHero.subtitle : homeContent.heroChip}
                </p>
                <h1
                  className={cn(
                    "text-[clamp(20px,6.5vw,40px)] leading-[1.22] font-extrabold tracking-[-0.045em] text-white",
                    featuredSlide
                      ? "lg:text-[clamp(36px,4.35vw,104px)]"
                      : "lg:text-[clamp(36px,5.4vw,112px)]",
                  )}
                >
                  {title[0]}
                  <br />
                  {title[1]}
                </h1>
                <span className="sr-only">{photo.label}</span>
              </div>
            </div>
          );
        })}
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
