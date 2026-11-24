"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryContent, spaces } from "../model/content";
import { GalleryMotion } from "./gallery-motion";

export function ClinicGallery() {
  const [selected, setSelected] = useState(0);
  const space = spaces[selected];
  function move(direction: number) {
    setSelected((current) => Math.max(0, Math.min(spaces.length - 1, current + direction)));
  }
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="overflow-x-clip bg-white py-20 sm:py-24 lg:py-28"
    >
      <GalleryMotion />
      <div className="mx-auto max-w-[1392px] px-5 sm:px-8 lg:px-10">
        <header
          data-gallery-head
          className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10"
        >
          <div>
            <h2
              id="gallery-heading"
              className="text-[28px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[46px]"
            >
              {galleryContent.title.map((line) => (
                <span
                  key={line}
                  data-reveal-text
                  className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
                >
                  <span data-reveal-inner className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-[1.8] text-[#626b77] sm:text-base">
              {galleryContent.description[1]}
            </p>
          </div>
          <div role="group" aria-label="병원 사진 이동" className="flex items-center gap-3">
            <span
              aria-live="polite"
              className="mr-2 text-sm font-semibold text-[#7a879a] tabular-nums"
            >
              {String(selected + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")}
            </span>
            {[-1, 1].map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => move(direction)}
                disabled={direction === -1 ? selected === 0 : selected === spaces.length - 1}
                aria-label={direction === -1 ? "이전 공간 사진" : "다음 공간 사진"}
                aria-controls="clinic-gallery-track"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#dce3ed] text-[#293d7d] transition-colors hover:bg-[#edf2fa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d] disabled:cursor-default disabled:opacity-30 sm:size-12"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="size-5"
                >
                  <path d={direction === -1 ? "M19 12H5m7-7-7 7 7 7" : "M5 12h14m-7-7 7 7-7 7"} />
                </svg>
              </button>
            ))}
          </div>
        </header>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
          <figure
            id="clinic-gallery-track"
            tabIndex={0}
            aria-label="시원척척의원 실제 공간 사진"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            className="min-w-0 rounded-2xl outline-offset-4 focus-visible:outline-[#293d7d]"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#edf1f5] sm:rounded-[24px]">
              <Image
                key={space.name}
                src={`/images/clinic/${space.name}.webp`}
                alt={"시원척척의원 " + space.title}
                fill
                sizes="(min-width: 1392px) 1020px, (min-width: 1024px) 74vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-5 sm:mt-6">
              <h3 className="text-xl font-semibold tracking-tight text-[#303c50] sm:text-2xl">
                {space.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.8] text-[#727b88] sm:text-base">
                {space.description}
              </p>
            </figcaption>
          </figure>
          <div
            role="group"
            aria-label="둘러볼 공간 선택"
            className="grid grid-cols-4 gap-2.5 sm:gap-4 lg:grid-cols-1 lg:gap-3"
          >
            {spaces.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                aria-controls="clinic-gallery-track"
                className={
                  "group min-w-0 cursor-pointer rounded-xl p-1 text-left outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#293d7d] lg:grid lg:grid-cols-[90px_minmax(0,1fr)] lg:items-center lg:gap-3 lg:p-2 xl:grid-cols-[108px_minmax(0,1fr)] " +
                  (selected === index
                    ? "bg-[#edf2fa] text-[#293d7d] ring-1 ring-[#bac8df]"
                    : "text-[#7a8290] hover:bg-[#f5f7fa]")
                }
              >
                <span className="relative block aspect-[3/2] overflow-hidden rounded-lg">
                  <Image
                    src={`/images/clinic/${item.name}.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 108px, (min-width: 1024px) 90px, 23vw"
                    className="object-cover transition-opacity group-hover:opacity-85"
                  />
                </span>
                <span className="mt-2 block text-center text-[11px] leading-[1.5] font-semibold break-keep sm:text-sm lg:mt-0 lg:text-left">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
