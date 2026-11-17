"use client";

import { useEffect, useRef, useState } from "react";
import { ClinicPhoto } from "@/shared/ui/clinic-photo";
import { galleryContent, spaces } from "../model/content";

export function ClinicGallery() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const hovered = useRef(false);
  const dragged = useRef(false);
  const activePhoto = useRef<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const touching = useRef(false);
  const navigate = useRef<(direction: number) => void>(() => {});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = track.current;
    const section = element?.closest("section");
    if (!element || !section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let step = 0;
    let visible = false;
    let elapsed = 0;
    let previous = 0;
    let frame = 0;
    let motion: { from: number; to: number; elapsed: number; manual: boolean } | null = null;
    function normalize() {
      const cycle = step * spaces.length;
      if (!cycle || !element) return;
      if (element.scrollLeft < cycle) element.scrollLeft += cycle;
      else if (element.scrollLeft >= cycle * 2) element.scrollLeft -= cycle;
    }
    function measure() {
      if (!element) return;
      const first = element.firstElementChild;
      if (!first) return;
      const index = step ? element.scrollLeft / step - spaces.length : 0;
      step =
        first.getBoundingClientRect().width +
        (Number.parseFloat(getComputedStyle(element).columnGap) || 0);
      motion = null;
      element.scrollLeft = (spaces.length + index) * step;
      normalize();
    }
    function move(direction: number, manual = false) {
      if (!element || !step || (motion && !manual)) return;
      if (manual) motion = null;
      normalize();
      elapsed = 0;
      const target = (Math.round(element.scrollLeft / step) + direction) * step;
      if (reduced.matches) {
        element.scrollLeft = target;
        normalize();
      } else {
        motion = { from: element.scrollLeft, to: target, elapsed: 0, manual };
      }
    }
    navigate.current = (direction) => move(direction, true);
    function tick(now: number) {
      const delta = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      const paused =
        hovered.current ||
        activePhoto.current !== null ||
        Boolean(section!.querySelector(":focus-visible"));
      const unavailable = !visible || document.hidden || touching.current || drag.current;
      if (touching.current || drag.current) {
        motion = null;
        elapsed = 0;
      }
      if (!unavailable && motion && (!paused || motion.manual)) {
        motion.elapsed += delta;
        const t = Math.min(motion.elapsed / 900, 1);
        const eased = t * t * (3 - 2 * t);
        element!.scrollLeft = motion.from + (motion.to - motion.from) * eased;
        if (t === 1) {
          motion = null;
          normalize();
        }
      } else if (!unavailable && !paused && !motion && !reduced.matches) {
        elapsed += delta;
        if (elapsed >= 4000) move(1);
      }
      frame = requestAnimationFrame(tick);
    }
    function updateProgress() {
      const cycle = step * spaces.length;
      if (!cycle || !element) return;
      const index = (((element.scrollLeft - cycle) % cycle) + cycle) % cycle;
      setProgress(index / cycle);
    }
    function settle() {
      if (!motion && !drag.current && !touching.current) normalize();
    }
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Element && !event.target.closest("[data-gallery-photo]")) {
        activePhoto.current = null;
        setSelectedPhoto(null);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    const resize = new ResizeObserver(measure);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    resize.observe(element);
    observer.observe(section);
    element.addEventListener("scroll", updateProgress, { passive: true });
    element.addEventListener("scrollend", settle);
    measure();
    frame = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      element.removeEventListener("scroll", updateProgress);
      element.removeEventListener("scrollend", settle);
      navigate.current = () => {};
    };
  }, []);
  function move(direction: number) {
    activePhoto.current = null;
    setSelectedPhoto(null);
    navigate.current(direction);
  }

  return (
    <section
      id="gallery"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hovered.current = true;
      }}
      onPointerLeave={() => {
        hovered.current = false;
      }}
      aria-labelledby="gallery-heading"
      className="overflow-hidden bg-white py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[984px] px-[15px] min-[769px]:max-w-[1148px] min-[769px]:px-5 min-[1241px]:max-w-[1312px] min-[1641px]:max-w-[1476px] min-[2001px]:max-w-[1640px] min-[3200px]:max-w-[1968px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-7 sm:mb-14 lg:mb-16">
          <div>
            <h2
              id="gallery-heading"
              className="text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[50px]"
            >
              {galleryContent.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-[18px] text-base leading-[1.85] text-[#3c3c3c] sm:text-lg">
              <span className="hidden sm:block">{galleryContent.description[0]}</span>
              <span className="block">{galleryContent.description[1]}</span>
            </p>
          </div>
          <div
            className="flex shrink-0 items-center gap-3"
            role="group"
            aria-label="병원 사진 이동"
          >
            {[-1, 1].map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => move(direction)}
                aria-label={direction === -1 ? "이전 공간 사진" : "다음 공간 사진"}
                aria-controls="clinic-gallery-track"
                className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-white text-[#222222] ring-1 ring-[#edf0f4] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2b467e] active:bg-[#e5ebf6] motion-reduce:transition-none sm:size-[60px] [@media(hover:hover)]:hover:bg-[#f0f4fa]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d={direction === -1 ? "M19 12H5m7-7-7 7 7 7" : "M5 12h14m-7-7 7 7-7 7"} />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div
          ref={track}
          id="clinic-gallery-track"
          role="region"
          aria-label="시원척척의원 실제 공간 사진"
          tabIndex={0}
          onTouchStart={() => {
            touching.current = true;
          }}
          onTouchEnd={() => {
            touching.current = false;
          }}
          onTouchCancel={() => {
            touching.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              activePhoto.current = null;
              setSelectedPhoto(null);
            }
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }}
          onPointerDown={(event) => {
            dragged.current = false;
            if (event.pointerType !== "mouse" || event.button !== 0) return;
            drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft };
          }}
          onPointerMove={(event) => {
            if (!drag.current || Math.abs(event.clientX - drag.current.x) < 6) return;
            dragged.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x);
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onClickCapture={(event) => {
            if (dragged.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onLostPointerCapture={() => {
            drag.current = null;
          }}
          className="flex w-[calc(100%+(100vw-100%)/2)] [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain pr-[15px] pb-3 focus-visible:outline-[#173c83] sm:gap-5 lg:cursor-grab lg:active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          {[...spaces, ...spaces, ...spaces].map((space, index) => (
            <figure
              key={space.name + index}
              aria-hidden={index < spaces.length || index >= spaces.length * 2}
              className="min-w-0 shrink-0 basis-[84%] select-none sm:basis-[58%] lg:basis-[38%]"
            >
              <button
                type="button"
                data-gallery-photo
                tabIndex={index < spaces.length || index >= spaces.length * 2 ? -1 : 0}
                aria-label={space.description}
                aria-pressed={selectedPhoto === space.name}
                onClick={() => {
                  const next = activePhoto.current === space.name ? null : space.name;
                  activePhoto.current = next;
                  setSelectedPhoto(next);
                }}
                className="group relative block w-full overflow-hidden rounded-[16px] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173c83] sm:rounded-[20px]"
              >
                <ClinicPhoto
                  name={space.name}
                  alt={"시원척척의원 " + space.title}
                  className="pointer-events-none aspect-[3/2]"
                />
                <span
                  aria-hidden="true"
                  className={
                    "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/65 px-7 text-center text-lg leading-relaxed font-medium break-keep transition-opacity duration-300 group-focus-visible:opacity-100 motion-reduce:transition-none sm:text-xl lg:text-2xl [@media(hover:hover)]:group-hover:opacity-100 " +
                    (selectedPhoto === space.name ? "opacity-100" : "opacity-0")
                  }
                >
                  {space.description}
                </span>
              </button>
            </figure>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="mt-8 h-[3px] overflow-hidden rounded-full bg-[#dce3ed] sm:mt-12"
        >
          <div
            className="h-full origin-left bg-[#173c83] transition-transform duration-200 motion-reduce:transition-none"
            style={{ transform: "scaleX(" + (0.25 + progress * 0.75) + ")" }}
          />
        </div>
      </div>
    </section>
  );
}
