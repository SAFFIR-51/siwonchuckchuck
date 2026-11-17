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
type NavigationChild = (typeof navigation)[number]["children"][number];

/** Second-level items of a menu entry (진료 분야 → 어깨 클리닉 …), if it has any. */
function subItems(child: NavigationChild) {
  return "children" in child ? child.children : null;
}

/** Chevron matching the header's line icons (1.6 stroke). */
function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 transition-transform duration-200", open && "rotate-180", className)}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MobileNavigation({ onNavigate }: { onNavigate: () => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <nav
      id="mobile-menu"
      aria-label="모바일 메뉴"
      className="absolute inset-x-0 top-full h-[calc(100dvh-70px)] [scrollbar-width:none] overflow-y-auto overscroll-y-contain border-t border-slate-100 bg-white px-6 pt-2 pb-6 min-[1241px]:hidden [&::-webkit-scrollbar]:hidden"
    >
      <ul className="divide-y divide-slate-100">
        {navigation.map(({ label, href, children }, index) => {
          const expanded = expandedIndex === index;
          const submenuId = "mobile-submenu-" + index;

          return (
            <li key={href}>
              {/* The whole row opens the section. */}
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={submenuId}
                onClick={() => setExpandedIndex(expanded ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-3 text-left text-base font-semibold text-[#111]"
              >
                {label}
                <Chevron open={expanded} className="size-6" />
              </button>
              <ul
                id={submenuId}
                className={cn("grid-cols-2 gap-x-4 pb-3", expanded ? "grid" : "hidden")}
              >
                {children.map((child) => {
                  const items = subItems(child);
                  if (!items) {
                    return (
                      <li key={child.href}>
                        <SubmenuLink
                          href={child.href}
                          onClick={onNavigate}
                          className="flex min-h-11 items-center text-[15px] text-[#555] hover:text-[#111]"
                        >
                          {child.label}
                        </SubmenuLink>
                      </li>
                    );
                  }
                  // Second-level items are listed open under a small label.
                  return (
                    <li key={child.href} className="col-span-2">
                      <p className="flex min-h-10 items-center text-[15px] text-[#555]">
                        {child.label}
                      </p>
                      <ul className="mb-2 grid grid-cols-2 gap-x-4 rounded-lg bg-slate-50 px-3 py-1">
                        {items.map((item) => (
                          <li key={item.href}>
                            <SubmenuLink
                              href={item.href}
                              onClick={onNavigate}
                              className="flex min-h-10 items-center text-sm text-[#666] hover:text-[#111]"
                            >
                              {item.label}
                            </SubmenuLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
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
  const menu = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  // Fit the white mega-menu panel to the tallest open column instead of a fixed height.
  useEffect(() => {
    const nav = menu.current;
    const backdrop = panel.current;
    if (!nav || !backdrop) return;
    let tallest = 0;
    for (const list of nav.querySelectorAll<HTMLElement>("[id^='desktop-submenu-']")) {
      tallest = Math.max(tallest, list.scrollHeight);
    }
    backdrop.style.height = `${Math.max(220, tallest + 36)}px`;
  }, [mega, openGroup]);
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
      onMouseLeave={() => {
        setMega(false);
        setOpenGroup(null);
      }}
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
        ref={panel}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full hidden h-[260px] origin-top bg-white shadow-[0_12px_20px_rgba(15,23,42,0.06)] transition-[transform,opacity,height] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none min-[1241px]:block",
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
          ref={menu}
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
                    ? "w-[144px] min-[1641px]:w-[176px] min-[2001px]:w-[200px]"
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
                  className="group relative flex h-full w-full cursor-pointer items-center justify-center px-3 text-base leading-[1.7] font-semibold whitespace-nowrap transition-colors hover:text-[#111] min-[1641px]:px-4 min-[1641px]:text-[17px] min-[2001px]:px-4 min-[2001px]:text-lg"
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-[#111] transition-transform duration-300 group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
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
                  {children.map((child) => {
                    const items = subItems(child);
                    const groupId = "desktop-group-" + child.href.replace(/[^a-z]/gi, "");
                    const expanded = openGroup === child.href;
                    return (
                      <li key={child.href}>
                        {items ? (
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-controls={groupId}
                            onClick={() => setOpenGroup(expanded ? null : child.href)}
                            className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-1.5 px-1 text-[15px] font-medium whitespace-nowrap text-[#555] transition-colors hover:text-[#111] focus-visible:text-[#111] min-[1641px]:text-[17px]"
                          >
                            {child.label}
                            <Chevron open={expanded} className="size-4 text-[#111]" />
                          </button>
                        ) : (
                          <SubmenuLink
                            href={child.href}
                            onClick={() => setMega(false)}
                            className="flex min-h-11 items-center justify-center px-1 text-[15px] font-medium whitespace-nowrap text-[#555] transition-colors hover:text-[#111] focus-visible:text-[#111] min-[1641px]:text-[17px]"
                          >
                            {child.label}
                          </SubmenuLink>
                        )}
                        {items && (
                          <ul
                            id={groupId}
                            className={cn("mb-2 pb-1", expanded ? "block" : "hidden")}
                          >
                            {items.map((item) => (
                              <li key={item.href}>
                                <SubmenuLink
                                  href={item.href}
                                  onClick={() => {
                                    setMega(false);
                                    setOpenGroup(null);
                                  }}
                                  className="flex min-h-9 items-center justify-center px-1 text-sm whitespace-nowrap text-[#888] transition-colors hover:text-[#111] focus-visible:text-[#111]"
                                >
                                  {item.label}
                                </SubmenuLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
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
