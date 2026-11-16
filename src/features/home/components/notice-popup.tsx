"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { koreaDate, notices, noticeStorageKey } from "../model/notices";

export function NoticePopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const focusBeforeOpen = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const hovered = useRef(false);
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const moving = useRef(false);
  const paused = useRef(false);
  const selected = (position - 1 + notices.length) % notices.length;
  const slides = [notices[notices.length - 1], ...notices, notices[0]];
  const notice = notices[selected];
  const storageKey = `${noticeStorageKey}:carousel`;

  function open(manual = true) {
    if (!dialog.current || dialog.current.open) return;
    let hidden = false;
    try {
      hidden = localStorage.getItem(storageKey) === koreaDate();
    } catch {
      /* Storage is optional. */
    }
    if (!manual && (hidden || koreaDate() > notices[0].expires)) return;
    focusBeforeOpen.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    if (window.matchMedia("(max-width: 600px)").matches) {
      dialog.current.showModal();
      document.body.style.overflow = "hidden";
    } else dialog.current.show();
  }
  function restorePage() {
    moving.current = false;
    setAnimate(false);
    setPosition(1);
    document.body.style.overflow = previousOverflow.current;
    focusBeforeOpen.current?.focus();
  }
  function hideToday() {
    try {
      localStorage.setItem(storageKey, koreaDate());
    } catch {
      /* Closing still works without storage. */
    }
    dialog.current?.close();
  }
  function move(direction: number) {
    if (moving.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduce);
    if (reduce)
      setPosition((current) => ((current - 1 + direction + notices.length) % notices.length) + 1);
    else {
      moving.current = true;
      setPosition((current) => current + direction);
    }
  }
  function finishSlide() {
    moving.current = false;
    if (position === 0 || position === notices.length + 1) {
      setAnimate(false);
      setPosition(position === 0 ? notices.length : 1);
    }
  }
  const openInitially = useEffectEvent(() => open(false));
  const advance = useEffectEvent(() => {
    if (dialog.current?.open && !hovered.current && !paused.current && !document.hidden) move(1);
  });
  useEffect(() => {
    const current = dialog.current;
    openInitially();
    return () => {
      if (current?.open) {
        current.close();
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(advance, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <dialog
        ref={dialog}
        aria-label="시원척척의원 안내 슬라이드"
        onClose={restorePage}
        onKeyDown={(event) => {
          if (event.key === "Escape") dialog.current?.close();
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "Tab") paused.current = true;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        className="notice-popup fixed top-auto right-0 bottom-0 left-auto z-50 m-0 max-h-[94svh] w-[min(300px,100vw)] max-w-full overflow-auto rounded-t-[20px] border-0 bg-white p-0 text-black min-[601px]:right-[21px] min-[601px]:bottom-[21px] min-[601px]:w-[400px] min-[601px]:rounded-b-[20px] min-[1241px]:right-6 min-[1241px]:bottom-6 min-[1641px]:right-[27px] min-[1641px]:bottom-[27px] min-[2001px]:right-[30px] min-[2001px]:bottom-[30px]"
      >
        <div
          aria-roledescription="carousel"
          aria-label="병원 안내 이미지"
          onMouseEnter={() => {
            hovered.current = true;
          }}
          onMouseLeave={() => {
            hovered.current = false;
          }}
          className="relative overflow-hidden"
        >
          <div
            className={
              animate
                ? "flex transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none"
                : "flex"
            }
            style={{ transform: `translateX(-${position * 100}%)` }}
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget) finishSlide();
            }}
          >
            {slides.map((slide, index) => (
              <a
                key={`${slide.id}-${index}`}
                href={slide.original}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${slide.title} 고화질 이미지 크게 보기`}
                aria-hidden={position !== index}
                tabIndex={position === index ? 0 : -1}
                className="relative block w-full shrink-0 overflow-hidden"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  unoptimized
                  className="aspect-square h-auto w-full object-contain"
                />
                {slide.id === "clinic-introduction" && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-t-[20px] border-x-[5px] border-t-[5px] border-[#293d7d]"
                  />
                )}
              </a>
            ))}
          </div>
          <div className="absolute right-[15px] bottom-3 flex items-center gap-1 rounded-full bg-black/35 px-1 text-white">
            <button
              onClick={() => move(1)}
              aria-label={`${selected + 1} / ${notices.length}, 다음 안내 보기`}
              className="min-h-11 rounded-full px-3 text-sm leading-none tabular-nums hover:bg-black/20"
            >
              {selected + 1} / {notices.length}
            </button>
          </div>
          <span className="sr-only" aria-live="off">
            {notice.title}
          </span>
        </div>
        <div className="flex min-h-[60px] items-center justify-between gap-2 bg-[#f2f2f2] px-[15px] text-black">
          <button
            onClick={hideToday}
            className="group flex min-h-11 flex-1 items-center gap-[7px] py-2 text-left text-base text-[#a7a7a7] transition-colors hover:text-black"
            aria-label="오늘 하루 안내 팝업 다시 보지 않기"
          >
            <span
              aria-hidden="true"
              className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-[#a7a7a7] text-xs text-white transition-colors group-hover:bg-black"
            >
              ✓
            </span>
            다시 보지 않기
          </button>
          <button
            onClick={() => dialog.current?.close()}
            className="min-h-11 shrink-0 py-2 pl-2 text-base font-medium text-black hover:text-[#666]"
          >
            닫기
          </button>
        </div>
      </dialog>
    </>
  );
}
