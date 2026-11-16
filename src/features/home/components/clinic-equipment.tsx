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
              {equipmentContent.description.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className="flex min-h-[56px] shrink-0 items-center justify-center gap-7 rounded-full border border-white bg-transparent px-7 py-3 text-[15px] font-semibold text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:bg-white active:text-[#254b7d] motion-reduce:transition-none [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-[#254b7d]"
          >
            <span className="relative">
              <span aria-hidden="true" className="invisible">
                전체 보기
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-[17px] whitespace-nowrap">
                전체 보기
              </span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-4"
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
            slidesPerView={1.2}
            centeredSlides
            spaceBetween={20}
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
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[20px] bg-white sm:rounded-[24px]">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 400px, 500px"
                      className="pointer-events-none object-contain p-5 sm:p-7"
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
        <Dialog title="진료 장비 전체 보기" onClose={() => setOpen(false)} className="max-w-6xl">
          <p className="mb-7 text-sm leading-relaxed text-[#64748b]">
            장비 이해를 돕기 위한 대표 이미지가 포함되어 있으며, 실제 보유 모델과 외관은 다를 수
            있습니다.
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map(({ name, description, image, imageAlt }) => (
              <article key={name} className="min-w-0">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] border border-[#e7edf5] bg-white">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 340px"
                    className="object-contain p-6"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#173c83]">{name}</h3>
                <p className="mt-2 text-sm leading-[1.85] break-keep text-[#4b5563] sm:text-base">
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
