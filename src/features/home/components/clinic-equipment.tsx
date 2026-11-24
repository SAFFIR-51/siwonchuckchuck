"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "./clinic-equipment.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { Dialog } from "@/shared/ui/dialog";
import { equipment, equipmentContent } from "../model/content";
import { clamp01 } from "./scroll-motion";

/** Slides advanced by scrolling while the section is held in place. */
const pinnedSteps = 3;

function EquipmentContent() {
  const [open, setOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<SwiperInstance | null>(null);
  const [ready, setReady] = useState(false);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  // Hold the full-screen section in place for a few scrolls: each step shows the next device.
  useEffect(() => {
    const wrapper = section.current;
    const held = stage.current;
    const slider = sliderRef.current;
    if (!wrapper || !held || !slider) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let distance = 0;
    let base: number | null = null;
    let shown = 0;
    let active = false;

    const stickTop = () => Math.min(0, window.innerHeight - held.offsetHeight);
    const layout = () => {
      distance = window.innerHeight * 0.5 * pinnedSteps;
      wrapper.style.height = `${held.offsetHeight + distance}px`;
      held.style.top = `${stickTop()}px`;
    };
    const update = () => {
      frame = 0;
      const rect = wrapper.getBoundingClientRect();
      // Fade the section in once its top passes 85% of the viewport; hide it again only
      // after scrolling back so its top is below the viewport (no flicker at the edge).
      const viewport = window.innerHeight;
      if (rect.top < viewport * 0.85) wrapper.dataset.pop = "in";
      else if (rect.top > viewport) wrapper.dataset.pop = "out";
      const progress = clamp01((stickTop() - rect.top) / distance);
      if (progress === 0) {
        base = null;
        return;
      }
      if (base === null) {
        base = slider.realIndex;
        shown = 0;
      }
      const step = Math.min(pinnedSteps, Math.floor(progress * pinnedSteps + 0.5));
      if (step !== shown && !slider.destroyed) {
        shown = step;
        slider.slideToLoop((base + step) % equipment.length, 1400);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(() => {
      if (!active) return;
      layout();
      schedule();
    });

    const start = () => {
      if (active) return;
      active = true;
      held.style.position = "sticky";
      layout();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      resize.observe(held);
      update();
    };
    const stop = () => {
      if (!active) return;
      active = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
      frame = 0;
      for (const property of ["position", "top"]) held.style.removeProperty(property);
      wrapper.style.removeProperty("height");
      delete wrapper.dataset.pop;
    };
    const sync = () => (reduced.matches ? stop() : start());
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      stop();
      reduced.removeEventListener("change", sync);
    };
  }, [ready]);

  return (
    <section
      ref={section}
      id="equipment"
      aria-labelledby="equipment-heading"
      className="relative isolate overflow-x-clip bg-[#43586b]"
    >
      <div
        ref={stage}
        data-equipment-stage
        className="flex min-h-svh flex-col justify-center py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[984px] px-[15px] min-[769px]:max-w-[1148px] min-[769px]:px-5 min-[1241px]:max-w-[1312px] min-[1641px]:max-w-[1476px] min-[2001px]:max-w-[1640px] min-[3200px]:max-w-[1968px]">
          <div className="flex flex-wrap items-end justify-between gap-7">
            <div>
              <h2
                id="equipment-heading"
                className="text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-white sm:text-[40px] lg:text-[50px]"
              >
                진료를 위한 장비
              </h2>
              <p className="mt-[18px] max-w-2xl text-base leading-[1.85] text-white sm:text-lg">
                <span className="hidden sm:block">{equipmentContent.description[0]}</span>
                <span className="block">{equipmentContent.description[1]}</span>
              </p>
            </div>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
              className="flex min-h-11 shrink-0 items-center justify-center gap-4 rounded-full border border-white bg-transparent px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:bg-white active:text-[#254b7d] motion-reduce:transition-none sm:min-h-[56px] sm:gap-7 sm:px-7 sm:py-3 sm:text-[17px] [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-[#254b7d]"
            >
              <span className="whitespace-nowrap">전체 보기</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="size-3.5 sm:size-4"
              >
                <path d="M4 12h16m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div
            ref={track}
            className="relative left-1/2 mt-10 w-screen -translate-x-1/2 sm:mt-14 lg:mt-16"
            tabIndex={0}
            role="region"
            aria-label="진료 장비 목록, 좌우로 넘겨 확인"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                if (event.key === "ArrowLeft") sliderRef.current?.slidePrev();
                else sliderRef.current?.slideNext();
              }
            }}
          >
            <Swiper
              className="clinic-equipment-carousel"
              modules={[A11y]}
              onSwiper={(instance) => {
                sliderRef.current = instance;
                setReady(true);
              }}
              slidesPerView={1.65}
              centeredSlides
              spaceBetween={14}
              loop
              speed={1400}
              grabCursor
              breakpoints={{
                640: { slidesPerView: 1.8, spaceBetween: 28 },
                1024: { slidesPerView: 2.6, spaceBetween: 36 },
                1440: { slidesPerView: 3.4, spaceBetween: 36 },
                2000: { slidesPerView: 4.8, spaceBetween: 36 },
                2800: { slidesPerView: 5.3, spaceBetween: 36 },
              }}
              a11y={{
                containerMessage: "시원척척의원 진료 장비",
                itemRoleDescriptionMessage: "장비",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
              }}
            >
              {equipment.map(({ name, description, image, imageAlt }) => (
                <SwiperSlide key={name}>
                  <article className="clinic-equipment-card">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-[#f0f2f3] sm:rounded-[24px]">
                      <Image
                        src={image}
                        alt={imageAlt}
                        fill
                        sizes="(max-width: 639px) 61vw, (max-width: 1023px) 56vw, (max-width: 1439px) 39vw, (max-width: 1999px) 30vw, 22vw"
                        className={
                          image.includes("shoot-")
                            ? "equipment-photo pointer-events-none object-cover"
                            : "equipment-photo pointer-events-none object-contain p-[7%]"
                        }
                      />
                    </div>
                    <h3 className="mt-4 text-lg leading-snug font-semibold tracking-[-0.025em] break-keep text-white sm:mt-5 sm:text-[22px] lg:text-2xl">
                      {name}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.85] break-keep text-white sm:text-base">
                      {description}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {open && (
        <Dialog
          title="진료 장비 전체 보기"
          onClose={() => setOpen(false)}
          className="max-w-6xl text-[#30343b]"
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
            {equipment.map(({ name, description, image, imageAlt }) => (
              <article key={name} className="min-w-0">
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#f0f2f3] sm:rounded-[20px]">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 40vw, 340px"
                    className={
                      image.includes("shoot-")
                        ? "equipment-photo object-cover"
                        : "equipment-photo object-contain p-[7%]"
                    }
                  />
                </div>
                <h3 className="mt-3 text-base font-semibold tracking-tight break-keep text-[#30343b] sm:mt-4 sm:text-xl">
                  {name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed break-keep text-[#666666] sm:text-base sm:leading-[1.85]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </Dialog>
      )}
    </section>
  );
}

export function ClinicEquipment() {
  return (
    <Suspense
      fallback={
        <section
          className="min-h-[960px] bg-[#43586b] py-28 sm:py-36 lg:py-44"
          aria-label="진료를 위한 장비 로딩 중"
        />
      }
    >
      <EquipmentContent />
    </Suspense>
  );
}
