"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ContactLink } from "@/shared/ui/contact-link";
import { clinics } from "../model/content";
import { clinicDetails } from "../model/clinic-details";
import "./clinic-list.css";

const number = (index: number) => String(index + 1).padStart(2, "0");

/**
 * All clinics listed one after another (replaces the former detail popup), after the
 * reference site's clinic pages (doodoorim-clinic.com):
 * - Speech bubbles with the patient's own words rise in one by one (`intro_sect`).
 * - The care photo stays put while the conditions scroll past, only within the span
 *   from the conditions heading to the bottom of the visit note; the condition passing
 *   70% of the screen lights up and gains a dark underline (`com_special_sect`).
 * Each clinic opens with a pager (01–04): the open clinic shows its name, the others
 * are numbers that jump to them. Without JavaScript or with reduced motion everything is
 * shown still.
 */
export function ClinicList() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const blocks = [...element.querySelectorAll<HTMLElement>("[data-clinic-block]")];
    const groups = blocks.map((block) => [
      ...block.querySelectorAll<HTMLElement>("[data-clinic-topic]"),
    ]);

    // Speech bubbles: play once when the intro comes into view.
    const bubbles = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          bubbles.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    if (!reduced.matches) {
      element.dataset.motion = "on";
      for (const intro of element.querySelectorAll("[data-clinic-intro]")) bubbles.observe(intro);
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.7;
      for (const items of groups) {
        let active = 0;
        for (const [index, item] of items.entries()) {
          if (item.getBoundingClientRect().top < line) active = index;
        }
        for (const [index, item] of items.entries()) {
          item.toggleAttribute("data-active", index === active);
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      bubbles.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      delete element.dataset.motion;
    };
  }, []);

  return (
    <div ref={root} className="clinic-list mt-16 sm:mt-24">
      {clinics.map((clinic, index) => {
        const detail = clinicDetails[clinic.title];
        return (
          <article
            key={clinic.id}
            id={"clinic-" + clinic.id}
            data-clinic-block
            aria-labelledby={"clinic-" + clinic.id + "-heading"}
            className="scroll-mt-20 pb-20 last:pb-0 sm:pb-32"
          >
            {/* ① The patient's own words. */}
            <div
              data-clinic-intro
              className="mx-[calc(50%-50vw)] bg-[#293d7d] px-6 py-14 text-center text-white sm:px-10 sm:py-20"
            >
              <nav aria-label="진료 분야 이동" className="clinic-intro-pager">
                <ol className="flex items-baseline justify-center gap-4 sm:gap-7">
                  {clinics.map((other, otherIndex) =>
                    otherIndex === index ? (
                      <li
                        key={other.id}
                        aria-current="page"
                        className="flex items-baseline gap-1.5 text-[13px] font-bold text-white sm:gap-2 sm:text-lg"
                      >
                        <span className="tabular-nums">{number(otherIndex)}</span>
                        {other.title}
                      </li>
                    ) : (
                      <li key={other.id}>
                        <a
                          href={"#clinic-" + other.id}
                          aria-label={other.title + "로 이동"}
                          className="text-xs font-semibold text-white/45 tabular-nums transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
                        >
                          {number(otherIndex)}
                        </a>
                      </li>
                    ),
                  )}
                </ol>
              </nav>
              <h3
                id={"clinic-" + clinic.id + "-heading"}
                className="mt-6 -mb-[0.12em] overflow-hidden pb-[0.12em] text-[22px] leading-[1.4] font-bold tracking-[-0.035em] break-keep sm:mt-8 sm:text-[36px] xl:text-[42px]"
              >
                <span className="clinic-intro-heading block">{detail.heading}</span>
              </h3>
              <ul
                aria-label="이런 불편함이 있나요?"
                className="mx-auto mt-8 flex max-w-[720px] flex-col items-center gap-6 sm:mt-14 sm:gap-10"
              >
                {detail.voices.map((voice) => (
                  <li
                    key={voice}
                    className="clinic-voice relative rounded-full bg-white px-4 py-2.5 text-[15px] font-semibold break-keep text-[#293d7d] shadow-[0_10px_30px_rgb(0_0_0/0.12)] sm:px-8 sm:py-4 sm:text-xl odd:sm:-translate-x-16 even:sm:translate-x-16"
                  >
                    “{voice}”
                  </li>
                ))}
              </ul>
              <p className="clinic-intro-copy mx-auto mt-10 max-w-[760px] text-sm leading-[1.85] break-keep text-white/85 sm:mt-16 sm:text-xl sm:leading-[1.9] sm:text-white/90">
                {detail.intro}
              </p>
            </div>

            {/* ② Conditions beside a fixed care photo. */}
            <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-16 xl:gap-24">
              <div className="lg:sticky lg:top-[18vh] lg:self-start">
                <div className="clinic-frame relative mx-auto aspect-[9/7] w-full max-w-[560px] overflow-hidden bg-[#eef3fa]">
                  <Image
                    src={clinic.careImage}
                    alt={clinic.careImageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 560px"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#293d7d]">
                    진료 이미지 예시
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#3c3c3c] sm:text-2xl">
                  {clinic.id === "growth" ? "성장 상담에서 살펴보는 내용" : "살펴보는 질환"}
                </h4>
                <ol className="mt-8 space-y-10 sm:space-y-14">
                  {detail.topics.map((topic) => (
                    <li
                      key={topic.title}
                      data-clinic-topic
                      className="clinic-topic border-b-2 border-[#e4e8ef] pb-8 sm:pb-10"
                    >
                      <p className="text-[24px] leading-[1.35] font-bold tracking-[-0.03em] break-keep text-[#3c3c3c] sm:text-[30px]">
                        {topic.title}
                      </p>
                      <p className="mt-3 max-w-[36em] text-base leading-[1.9] break-keep text-[#4a5463] sm:text-lg">
                        {topic.text}
                      </p>
                    </li>
                  ))}
                </ol>
                <section className="mt-16 rounded-[20px] bg-[#f1f4fa] p-6 sm:mt-20 sm:p-8">
                  <h4 className="text-lg font-bold text-[#293d7d]">
                    시원척척의원은 이렇게 살핍니다
                  </h4>
                  <p className="mt-3 text-[15px] leading-7 break-keep text-[#596575] sm:text-base">
                    {detail.care}
                  </p>
                </section>
                <div className="mt-5 flex flex-col gap-5 rounded-[20px] border border-[#e4e8ef] p-6 sm:p-7">
                  <p className="text-[15px] leading-7 break-keep text-[#596575]">
                    <strong className="mb-1 block font-semibold text-[#3c3c3c]">
                      방문 전 참고해 주세요
                    </strong>
                    {detail.preparation}
                  </p>
                  <ContactLink showArrow={false} className="self-start !bg-[#293d7d] !text-white">
                    진료 상담 문의
                  </ContactLink>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
