"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { site } from "@/shared/config/site";
import { routes } from "@/shared/config/routes";
import { track } from "@/shared/lib/analytics";

const items: { label: string; icon: string; href: string; external?: boolean }[] = [
  { label: "전화", icon: "phone", href: site.phoneHref },
  { label: "블로그", icon: "blog", href: site.blog, external: true },
  { label: "오시는길", icon: "map", href: routes.location },
  { label: "예약", icon: "calendar", href: site.reservation, external: true },
  { label: "카톡", icon: "chat", href: site.kakao, external: true },
  { label: "인스타그램", icon: "instagram", href: site.instagram, external: true },
];

function QuickIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-6 lg:size-8"
    >
      {name === "phone" && (
        <path d="m7 3 3 5-2.5 2a15 15 0 0 0 6.5 6.5l2-2.5 5 3-1 4C10 22 2 14 3 4Z" />
      )}
      {name === "blog" && (
        <>
          <rect x="4" y="3" width="16" height="18" rx="3" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </>
      )}
      {name === "map" && (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M7 3v4m10-4v4M3 10h18m-13 5 3 3 5-5" />
        </>
      )}
      {name === "chat" && (
        <path d="M21 11c0 5-4 8-9 8H9l-5 3 1-6a8 8 0 0 1-2-5c0-5 4-8 9-8s9 3 9 8Z" />
      )}
      {name === "instagram" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

export function QuickContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function updateVisibility() {
      const next = window.scrollY > 80 && !document.querySelector("dialog[open]");
      setVisible(next);
      if (!next) setOpen(false);
    }
    const initialFrame = requestAnimationFrame(updateVisibility);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    const observer = new MutationObserver(updateVisibility);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", updateVisibility);
      observer.disconnect();
    };
  }, []);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer, true);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer, true);
  }, [open]);

  const itemClass =
    "flex min-h-[68px] w-full shrink-0 flex-col items-center justify-center gap-2 px-1 text-[11px] font-semibold text-white/55 transition-colors hover:bg-white/5 hover:text-white focus-visible:text-white focus-visible:outline-white lg:min-h-[80px] lg:gap-2.5 lg:text-sm";
  return (
    <>
      <aside
        aria-label="빠른 연락 및 안내"
        aria-hidden={!visible}
        inert={!visible}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
        className={cn(
          "fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-30 w-15 transition-[translate,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-y-0 motion-reduce:transition-opacity min-[601px]:right-[21px] min-[601px]:bottom-[21px] min-[1241px]:right-6 min-[1241px]:bottom-6 min-[1641px]:right-[27px] min-[1641px]:bottom-[27px] min-[2001px]:right-[30px] min-[2001px]:bottom-[30px] sm:w-[68px] lg:w-[100px]",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0",
        )}
      >
        <div
          ref={menu}
          className="relative"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches)
              setOpen(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setOpen(false);
          }}
          onBlur={(event) => {
            if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
              setOpen(false);
          }}
        >
          <button
            ref={toggle}
            aria-expanded={open}
            aria-controls="quick-contact-menu"
            aria-label={open ? "퀵메뉴 닫기" : "퀵메뉴 열기"}
            onClick={(event) => {
              if (
                event.nativeEvent instanceof PointerEvent &&
                event.nativeEvent.pointerType === "mouse" &&
                window.matchMedia("(hover: hover) and (pointer: fine)").matches
              )
                setOpen(true);
              else setOpen((current) => !current);
            }}
            className="relative z-10 flex aspect-square w-full items-center justify-center rounded-full bg-[#383838] text-sm font-bold text-white shadow-[0_3px_8px_rgb(0_0_0/10%)] transition-colors hover:bg-[#454545] sm:text-base lg:text-xl"
          >
            QUICK
          </button>
          <nav
            id="quick-contact-menu"
            aria-label="병원 바로가기"
            aria-hidden={!open}
            inert={!open}
            className={cn(
              "absolute right-0 bottom-1/2 flex max-h-[calc(100svh-154px)] w-full origin-bottom flex-col overflow-y-auto rounded-t-full bg-[#173c83] pt-5 pb-[30px] transition-[translate,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-y-0 motion-reduce:transition-opacity sm:pb-[34px] lg:max-h-[calc(100svh-214px)] lg:pt-6 lg:pb-[50px]",
              open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
            )}
          >
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (item.icon === "phone") track("contact_clicked", { source: "footer" });
                  setOpen(false);
                }}
                className={itemClass}
              >
                <QuickIcon name={item.icon} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <button
          aria-label="맨 위로 이동"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
          className="mx-auto mt-3 flex aspect-square w-full items-center justify-center rounded-full bg-[#2b467e] text-white shadow-[0_3px_8px_rgb(0_0_0/10%)] transition-colors hover:bg-[#34518b]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="size-6 sm:size-7 lg:size-8"
            aria-hidden="true"
          >
            <path d="M12 21V3m-8 8 8-8 8 8" />
          </svg>
        </button>
      </aside>
    </>
  );
}
