"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactLink } from "@/shared/ui/contact-link";
import { Dialog } from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/cn";
import { selfCheckParts, selfCheckResult } from "../model/self-check";
import { clearMotionStyles, revealLines, textProgress } from "./scroll-motion";
import "./self-check.css";

type Part = (typeof selfCheckParts)[number];

/**
 * "어디가 아프세요?" — one self-check card per body part (손/손목, 목, 어깨), after the
 * reference layout: a photo panel on the left, the checklist with a "결과보기" button on
 * the right, and the result in a dialog. A reference for consultation, not a diagnosis.
 */
export function SelfCheck() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || preference.matches) return;
    const head = root.querySelector<HTMLElement>("[data-self-head]");
    const lines = [...root.querySelectorAll<HTMLElement>("[data-self-head] [data-reveal-text]")];
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    root.dataset.motion = "on";
    for (const card of root.querySelectorAll("[data-self-card]")) reveal.observe(card);

    let frame = 0;
    const update = () => {
      frame = 0;
      if (head) revealLines(lines, textProgress(head, window.innerHeight, 1, 0.6));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      reveal.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      clearMotionStyles(lines);
      delete root.dataset.motion;
    };
  }, []);

  return (
    <section
      ref={section}
      id="self-check"
      aria-labelledby="self-check-heading"
      className="bg-white py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1640px] px-6 min-[2001px]:px-0 sm:px-10">
        <div data-self-head>
          <h2
            id="self-check-heading"
            className="text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[50px]"
          >
            <span data-reveal-text className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-reveal-inner className="block">
                어디가 아프세요?
              </span>
            </span>
            <span data-reveal-text className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span data-reveal-inner className="block">
                불편한 곳부터 차근차근 살펴보세요
              </span>
            </span>
          </h2>
          <p
            data-reveal-text
            className="mt-6 max-w-[680px] text-base leading-[1.85] break-keep text-[#595959] sm:text-lg"
          >
            손목이 시큰거리거나 목이 뻐근하고, 팔을 올리기 불편한 순간들. 지금 느끼는 증상을 체크해
            보시면 진료 전에 내 상태를 정리하는 데 도움이 됩니다.
          </p>
        </div>

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
          {selfCheckParts.map((part) => (
            <SelfCheckCard key={part.id} part={part} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SelfCheckCard({ part }: { part: Part }) {
  const [checked, setChecked] = useState<ReadonlySet<number>>(new Set());
  const [open, setOpen] = useState(false);
  const result = selfCheckResult(checked.size);
  const headingId = "self-check-" + part.id + "-heading";

  return (
    <article
      id={"self-check-" + part.id}
      data-self-card
      aria-labelledby={headingId}
      className="grid scroll-mt-28 overflow-hidden rounded-[20px] bg-[#eff4fb] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:rounded-[24px]"
    >
      <div className="relative isolate flex min-h-[260px] items-center px-8 py-12 text-white sm:min-h-[320px] sm:px-12 lg:px-[min(14%,120px)]">
        <Image
          src={part.image}
          alt={part.imageAlt}
          fill
          sizes="(max-width: 1023px) 100vw, 40vw"
          className="self-check-photo -z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#293d7d]/85" />
        <div className="self-check-intro">
          <p className="text-[26px] leading-[1.35] tracking-[-0.03em] sm:text-[34px]">
            <strong id={headingId} className="block font-bold">
              {part.lead}
            </strong>
            <span className="block font-light">자가진단 테스트</span>
          </p>
          <p className="mt-6 text-[15px] leading-[1.7] break-keep text-white/90 sm:mt-8 sm:text-base">
            체크리스트에서 해당하는 문항을 차례로 체크하시고,
            <br className="hidden sm:block" /> 지금 상태를 참고용으로 확인해 보세요.
          </p>
        </div>
      </div>

      <div className="px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
        <div className="flex items-center justify-end gap-4 border-b border-[#d9e0ea] pb-5">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full bg-[#293d7d] px-5 text-[15px] font-bold text-white transition-colors hover:bg-[#1d2d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#293d7d] sm:min-h-12 sm:px-7 sm:text-base"
          >
            결과보기
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
              <path d="M4 12h15m-5-5 5 5-5 5" />
            </svg>
          </button>
        </div>
        <ul className="self-check-list mt-5 space-y-2.5">
          {part.checks.map((text, index) => {
            const on = checked.has(index);
            return (
              <li key={text}>
                <label
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-[15px] leading-6 break-keep text-[#222] ring-1 transition-[box-shadow,color] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#293d7d] sm:text-base",
                    on ? "ring-[#293d7d]" : "ring-transparent hover:ring-[#c9d3e3]",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => {
                      const next = new Set(checked);
                      if (on) next.delete(index);
                      else next.add(index);
                      setChecked(next);
                    }}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-white transition-colors",
                      on ? "bg-[#293d7d]" : "bg-[#bfc4cb]",
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3.5"
                    >
                      <path d="m6 12 4 4 8-8" />
                    </svg>
                  </span>
                  {text}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {open && (
        <Dialog
          title={part.label + " 자가진단 결과"}
          onClose={() => setOpen(false)}
          className="max-w-[640px] rounded-[24px] text-[#222]"
        >
          <div className="rounded-2xl bg-[#eff4fb] p-6">
            <p className="text-xl font-bold text-[#111]">{result.title}</p>
            <p className="mt-2 text-[15px] leading-7 break-keep text-[#555] sm:text-base">
              {result.text}
            </p>
          </div>
          <h3 className="mt-7 text-lg font-bold text-[#111]">함께 살펴볼 수 있는 질환</h3>
          <ul className="mt-3 space-y-3">
            {part.conditions.map((condition) => (
              <li key={condition.title} className="rounded-2xl border border-[#e4e8ef] p-5">
                <p className="font-bold text-[#111]">{condition.title}</p>
                <p className="mt-1.5 text-[15px] leading-7 break-keep text-[#555]">
                  {condition.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={part.related.href}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#293d7d] px-6 text-[15px] font-semibold text-[#293d7d] transition-colors hover:bg-[#293d7d] hover:text-white"
            >
              {part.related.label}
            </a>
            <ContactLink showArrow={false} className="!bg-[#293d7d] !text-white">
              진료 상담 문의
            </ContactLink>
          </div>
          <p className="mt-5 text-xs leading-5 break-keep text-[#888] sm:text-sm">
            자가진단은 상담을 위한 참고용이며 진단을 대신하지 않습니다. 정확한 상태는 진찰과 필요한
            검사를 통해 확인합니다.
          </p>
        </Dialog>
      )}
    </article>
  );
}
