"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/shared/config/routes";
import { site } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";
import { track } from "@/shared/lib/analytics";
import { navigation } from "@/shared/config/navigation";
function SubmenuLink({
  href,
  children,
  ...props
}: {
  href: (typeof routes)[keyof typeof routes];
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) {
  // Native hash navigation also notifies the news category selector on the current page.
  return href.startsWith("/news#") ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <nav
      id="mobile-menu"
      aria-label="모바일 메뉴"
      className="absolute inset-x-0 top-full max-h-[calc(100svh-70px)] [scrollbar-width:none] overflow-y-auto overscroll-y-contain border-t border-slate-100 bg-white px-6 pt-2 pb-6 shadow-[0_12px_20px_rgba(15,23,42,0.08)] min-[1241px]:hidden [&::-webkit-scrollbar]:hidden"
    >
      <ul className="divide-y divide-slate-100">
        {navigation.map(({ label, href, children }, index) => {
          const expanded = expandedIndex === index;
          const submenuId = "mobile-submenu-" + index;

          return (
            <li key={href}>
              <div className="flex min-h-14 items-center justify-between gap-3">
                <span className="text-base font-semibold text-[#1b2d59]">{label}</span>
                <button
                  type="button"
                  aria-label={label + " 하위 메뉴"}
                  aria-expanded={expanded}
                  aria-controls={submenuId}
                  onClick={() => setExpandedIndex(expanded ? null : index)}
                  className="flex size-11 shrink-0 items-center justify-center rounded-lg text-[#1b2d59] hover:bg-slate-50 active:bg-slate-100"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn("size-5", expanded && "rotate-180")}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              <ul
                id={submenuId}
                className={cn("grid-cols-2 gap-x-4 pb-3", expanded ? "grid" : "hidden")}
              >
                {children.map((child) => (
                  <li key={child.href}>
                    <SubmenuLink
                      href={child.href}
                      onClick={onNavigate}
                      className="flex min-h-11 items-center text-[15px] text-[#555] hover:text-[#173c83]"
                    >
                      {child.label}
                    </SubmenuLink>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <a
        href={site.phoneHref}
        onClick={() => track("contact_clicked", { source: "header" })}
        className="mt-4 inline-flex min-h-11 items-center gap-4 text-sm font-semibold text-[#1b2d59]"
      >
        진료 문의 <span>{site.phone}</span>
      </a>
    </nav>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let previous = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = Math.max(0, window.scrollY);
      if (current <= 80) setHidden(false);
      else if (Math.abs(current - previous) >= 6) setHidden(current > previous);
      if (Math.abs(current - previous) >= 6 || current <= 80) previous = current;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1241) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, [open]);
  function closeMenu() {
    setOpen(false);
    toggle.current?.focus();
  }
  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setMega(false);
          if (open) closeMenu();
        }
      }}
      onMouseLeave={() => setMega(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMega(false);
      }}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-40 w-full bg-white font-sans text-black transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [&_:focus-visible]:outline-[#1b2d59]",
        hidden && !open && !mega ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full hidden h-[260px] origin-top bg-white shadow-[0_12px_20px_rgba(15,23,42,0.06)] transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none min-[1241px]:block",
          mega ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
        )}
      />
      <a
        href="#main"
        className="absolute -top-20 left-5 z-50 bg-[#1b2d59] p-3 text-sm text-white focus:top-3"
      >
        본문으로 바로가기
      </a>
      <div className="grid h-[70px] w-full grid-cols-[max-content_minmax(0,1fr)_max-content] items-center px-[15px] min-[769px]:px-5 min-[1641px]:h-20 min-[1641px]:px-[63px] min-[2001px]:h-[90px] min-[2001px]:px-[70px]">
        <Link
          href={routes.home}
          aria-label={`${site.name} 홈`}
          onClick={() => setOpen(false)}
          className="col-start-1 row-start-1 shrink-0"
        >
          <Image
            src="/images/brand/siwon-clinic-logo.svg"
            alt={site.name}
            width={330}
            height={82}
            unoptimized
            preload
            className="h-auto w-[174px] min-[1641px]:w-[220px] sm:w-[200px]"
          />
        </Link>
        <nav
          aria-label="주 메뉴"
          onMouseEnter={() => setMega(true)}
          onFocus={() => setMega(true)}
          className="col-start-2 row-start-1 mx-auto hidden h-full min-[1241px]:block"
        >
          <ul className="flex h-full items-center justify-center">
            {navigation.map(({ label, href, children }, index) => (
              <li
                key={href}
                className={cn(
                  "group relative h-full transition-[width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                  mega
                    ? "w-[160px] min-[1641px]:w-[190px] min-[2001px]:w-[210px]"
                    : index === 0
                      ? "w-[156px] min-[1641px]:w-[168px]"
                      : "w-[106px] min-[1641px]:w-[120px]",
                )}
              >
                <button
                  type="button"
                  aria-expanded={mega}
                  aria-controls={`desktop-submenu-${index}`}
                  onClick={() => setMega(true)}
                  className="group relative flex h-full w-full cursor-pointer items-center justify-center px-3 text-base leading-[1.7] font-semibold whitespace-nowrap transition-colors hover:text-[#1b2d59] min-[1641px]:px-4 min-[1641px]:text-[17px] min-[2001px]:px-4 min-[2001px]:text-lg"
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-[#1b2d59] transition-transform duration-300 group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </button>
                <ul
                  id={`desktop-submenu-${index}`}
                  inert={!mega}
                  aria-hidden={!mega}
                  className={cn(
                    "absolute inset-x-0 top-full pt-5 text-center transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                    mega
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0",
                  )}
                >
                  {children.map((child) => (
                    <li key={child.href}>
                      <SubmenuLink
                        href={child.href}
                        onClick={() => setMega(false)}
                        className="flex min-h-11 items-center justify-center px-1 text-base font-medium text-[#555] transition-colors hover:text-[#173c83] focus-visible:text-[#173c83] min-[1641px]:text-[17px]"
                      >
                        {child.label}
                      </SubmenuLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-start-3 row-start-1 flex items-center justify-end gap-3 max-[359px]:gap-0 sm:gap-5">
          <a
            href={site.phoneHref}
            onClick={() => track("contact_clicked", { source: "header" })}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1b2d59] px-2 py-2 text-sm leading-tight font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#263d79] min-[360px]:px-4 min-[2001px]:text-lg sm:text-base"
          >
            전화 문의
          </a>
          <button
            ref={toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen(!open)}
            className="flex size-11 items-center justify-center min-[1241px]:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-6"
              aria-hidden="true"
            >
              {open ? <path d="m5 5 14 14M19 5 5 19" /> : <path d="M3 5h18M3 12h18M3 19h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && <MobileNavigation onNavigate={() => setOpen(false)} />}
    </header>
  );
}
