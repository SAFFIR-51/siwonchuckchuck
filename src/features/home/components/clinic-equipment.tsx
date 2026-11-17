"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "./clinic-equipment.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { Dialog } from "@/shared/ui/dialog";
import { equipment, equipmentContent } from "../model/content";

function EquipmentContent() {
  const [open, setOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<SwiperInstance | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const viewport = track.current;
    const slider = sliderRef.current;
    if (!viewport || !slider) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let hovered = false;
    let focused = false;
    const pausedAnimations = new Set<Animation>();
    function resumeMotion() {
      pausedAnimations.forEach((animation) => {
        if (animation.playState === "paused") animation.play();
      });
      pausedAnimations.clear();
    }
    function sync() {
      if (!slider || slider.destroyed) return;
      slider.params.speed = reduced.matches ? 0 : 1500;
      if (reduced.matches || !visible || document.hidden || open || hovered || focused) {
        // Stop the transition itself, not only the next autoplay timeout.
        viewport?.getAnimations({ subtree: true }).forEach((animation) => {
          if (animation.playState === "running") {
            animation.pause();
            pausedAnimations.add(animation);
          }
        });
        slider.autoplay.stop();
      } else {
        resumeMotion();
        if (!slider.autoplay.running) slider.autoplay.start();
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        hovered = true;
        sync();
      }
    };
    const leave = () => {
      hovered = false;
      sync();
    };
    const focus = () => {
      focused = viewport.matches(":focus-visible");
      sync();
    };
    const blur = () => {
      focused = false;
      sync();
    };
    // Release paused transitions before Swiper reads the current transform
    // for a drag. Swiper then owns the pointer movement.
    const dragStart = () => {
      resumeMotion();
      slider.autoplay.stop();
    };
    const dragEnd = () => {
      sync();
    };
    viewport.addEventListener("pointerdown", dragStart, true);
    viewport.addEventListener("pointerup", dragEnd);
    viewport.addEventListener("pointercancel", dragEnd);
    observer.observe(viewport);
    viewport.addEventListener("pointerenter", enter);
    viewport.addEventListener("pointerleave", leave);
    viewport.addEventListener("focusin", focus);
    viewport.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      resumeMotion();
      viewport.removeEventListener("pointerdown", dragStart, true);
      viewport.removeEventListener("pointerup", dragEnd);
      viewport.removeEventListener("pointercancel", dragEnd);
      observer.disconnect();
      viewport.removeEventListener("pointerenter", enter);
      viewport.removeEventListener("pointerleave", leave);
      viewport.removeEventListener("focusin", focus);
      viewport.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      if (!slider.destroyed) slider.autoplay.stop();
    };
  }, [ready, open]);
  return (
    <section
      id="equipment"
      aria-labelledby="equipment-heading"
      className="relative isolate overflow-hidden bg-[#315786] py-28 sm:py-36 lg:py-44"
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
            modules={[Autoplay, A11y]}
            onSwiper={(instance) => {
              sliderRef.current = instance;
              setReady(true);
            }}
            slidesPerView={1.65}
            centeredSlides
            spaceBetween={14}
            loop
            speed={1500}
            grabCursor
            autoplay={{ delay: 2500, disableOnInteraction: false }}
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
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white sm:rounded-[24px]">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 639px) 61vw, (max-width: 1024px) 400px, 500px"
                      className="pointer-events-none object-contain p-4 sm:p-7"
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
      {open && (
        <Dialog
          title="진료 장비 전체 보기"
          onClose={() => setOpen(false)}
          className="max-w-6xl text-[#30343b]"
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
            {equipment.map(({ name, description, image, imageAlt }) => (
              <article key={name} className="min-w-0">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[#e7edf5] bg-white sm:rounded-[20px]">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 40vw, 340px"
                    className="object-contain p-3 sm:p-6"
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
          className="min-h-[960px] bg-[#315786] py-28 sm:py-36 lg:py-44"
          aria-label="진료를 위한 장비 로딩 중"
        />
      }
    >
      <EquipmentContent />
    </Suspense>
  );
}
