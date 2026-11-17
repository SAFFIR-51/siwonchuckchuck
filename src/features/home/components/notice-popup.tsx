"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from "react";
import { koreaDate, notices, noticeStorageKey } from "../model/notices";

type Notice = (typeof notices)[number];

const carouselStorageKey = `${noticeStorageKey}:carousel`;
const desktopQuery = "(min-width: 1024px)";

function subscribeToDesktop(onChange: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isDesktop() {
  return window.matchMedia(desktopQuery).matches;
}

function noticeKey(notice: Notice) {
  return `${noticeStorageKey}:${notice.id}`;
}

function NoticeImage({ notice, inactive = false }: { notice: Notice; inactive?: boolean }) {
  return (
    <div
      aria-hidden={inactive || undefined}
      className="relative block w-full shrink-0 overflow-hidden"
    >
      <Image
        src={notice.image}
        alt={notice.alt}
        width={notice.width}
        height={notice.height}
        unoptimized
        className="aspect-square h-auto w-full object-contain"
      />
      {notice.id === "clinic-introduction" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-t-[20px] border-x-[5px] border-t-[5px] border-[#293d7d]"
        />
      )}
    </div>
  );
}

function NoticeActions({
  title,
  onHideToday,
  onClose,
}: {
  title?: string;
  onHideToday: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex min-h-[60px] items-center justify-between gap-2 bg-[#f2f2f2] px-[15px] text-black">
      <button
        type="button"
        onClick={onHideToday}
        className="group flex min-h-11 flex-1 items-center gap-[7px] py-2 text-left text-base text-[#a7a7a7] transition-colors hover:text-black"
        aria-label={`오늘 하루 ${title ?? "안내 팝업"} 다시 보지 않기`}
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
        type="button"
        onClick={onClose}
        aria-label={title ? `${title} 닫기` : undefined}
        className="min-h-11 shrink-0 py-2 pl-2 text-base font-medium text-black hover:text-[#666]"
      >
        닫기
      </button>
    </div>
  );
}

function NoticeCarousel({
  items,
  onHideToday,
  onClose,
}: {
  items: Notice[];
  onHideToday: () => void;
  onClose: () => void;
}) {
  const [position, setPosition] = useState(1);
  const [animate, setAnimate] = useState(true);
  const hovered = useRef(false);
  const moving = useRef(false);
  const paused = useRef(false);
  const count = items.length;
  const selected = (position - 1 + count) % count;
  const slides = count > 1 ? [items[count - 1], ...items, items[0]] : items;
  const visiblePosition = count > 1 ? position : 0;

  function move(direction: number) {
    if (count < 2 || moving.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduce);
    if (reduce) {
      setPosition((current) => ((current - 1 + direction + count) % count) + 1);
    } else {
      moving.current = true;
      setPosition((current) => current + direction);
    }
  }

  const advance = useEffectEvent(() => {
    if (!hovered.current && !paused.current && !document.hidden) move(1);
  });

  useEffect(() => {
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(advance, 5000);
    return () => window.clearInterval(timer);
  }, [count]);

  return (
    <div
      className="overflow-hidden rounded-[20px] bg-white"
      onKeyDown={(event) => {
        if (count > 1 && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
        if (event.key === "Tab") paused.current = true;
      }}
    >
      <div
        aria-roledescription={count > 1 ? "carousel" : undefined}
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
          style={{ transform: `translateX(-${visiblePosition * 100}%)` }}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            moving.current = false;
            if (position === 0 || position === count + 1) {
              setAnimate(false);
              setPosition(position === 0 ? count : 1);
            }
          }}
        >
          {slides.map((notice, index) => (
            <NoticeImage
              key={`${notice.id}-${index}`}
              notice={notice}
              inactive={visiblePosition !== index}
            />
          ))}
        </div>
        {count > 1 && (
          <div className="absolute right-[15px] bottom-3 flex items-center gap-1 rounded-full bg-black/35 px-1 text-white">
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={`${selected + 1} / ${count}, 다음 안내 보기`}
              className="min-h-11 rounded-full px-3 text-sm leading-none tabular-nums hover:bg-black/20"
            >
              {selected + 1} / {count}
            </button>
          </div>
        )}
      </div>
      <NoticeActions onHideToday={onHideToday} onClose={onClose} />
    </div>
  );
}

export function NoticePopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const focusBeforeOpen = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const [activeNotices, setActiveNotices] = useState<Notice[]>([]);
  const desktop = useSyncExternalStore(subscribeToDesktop, isDesktop, () => false);

  function restorePage() {
    setActiveNotices([]);
    document.body.style.overflow = previousOverflow.current;
    focusBeforeOpen.current?.focus();
  }

  const loadNotices = useEffectEvent(() => {
    const today = koreaDate();
    const current = notices.filter((notice) => !notice.expires || notice.expires >= today);
    try {
      if (localStorage.getItem(carouselStorageKey) === today) return;
      setActiveNotices(
        current.filter((notice) => localStorage.getItem(noticeKey(notice)) !== today),
      );
    } catch {
      setActiveNotices(current);
    }
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => loadNotices());
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const hasNotices = activeNotices.length > 0;
  useEffect(() => {
    const current = dialog.current;
    if (!hasNotices || !current) return;

    focusBeforeOpen.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    current.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      if (current.open) current.close();
      document.body.style.overflow = previousOverflow.current;
    };
  }, [hasNotices]);

  useEffect(() => {
    const current = dialog.current;
    if (current?.open && !current.contains(document.activeElement)) {
      current.querySelector("button")?.focus();
    }
  }, [desktop, activeNotices]);

  function close() {
    dialog.current?.close();
  }

  function hideToday(notice?: Notice) {
    try {
      localStorage.setItem(notice ? noticeKey(notice) : carouselStorageKey, koreaDate());
    } catch {
      /* Closing still works without storage. */
    }
    if (notice) closeCard(notice);
    else close();
  }

  function closeCard(notice: Notice) {
    if (activeNotices.length === 1) close();
    else setActiveNotices((current) => current.filter(({ id }) => id !== notice.id));
  }

  return (
    <dialog
      ref={dialog}
      aria-label="시원척척의원 안내"
      onClose={restorePage}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="notice-popup fixed inset-0 z-50 m-auto max-h-[calc(100svh-32px)] w-[min(400px,calc(100vw-32px),calc(100svh-92px))] max-w-full overflow-auto border-0 bg-transparent p-0 text-black lg:w-fit"
    >
      {hasNotices &&
        (desktop ? (
          <div className="flex justify-center gap-4">
            {activeNotices.map((notice) => (
              <article
                key={notice.id}
                aria-label={notice.title}
                className="w-[min(400px,calc(100svh-92px))] shrink-0 overflow-hidden rounded-[20px] bg-white"
              >
                <NoticeImage notice={notice} />
                <NoticeActions
                  title={notice.title}
                  onHideToday={() => hideToday(notice)}
                  onClose={() => closeCard(notice)}
                />
              </article>
            ))}
          </div>
        ) : (
          <NoticeCarousel items={activeNotices} onHideToday={() => hideToday()} onClose={close} />
        ))}
    </dialog>
  );
}
