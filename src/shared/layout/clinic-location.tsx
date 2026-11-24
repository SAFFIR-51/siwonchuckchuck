"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/shared/config/site";
import { track } from "@/shared/lib/analytics";

const mapLinks = [
  { label: "네이버 지도", icon: "/images/maps/naver.svg", href: site.map },
  { label: "카카오맵", icon: "/images/maps/kakao.svg", href: site.kakaoMap },
  {
    label: "구글 지도",
    icon: "/images/maps/google.png",
    href:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(site.name + " " + site.address),
  },
];
const hours = [
  { day: "월요일 – 금요일", time: "09:00 – 18:30" },
  { day: "토요일", time: "09:00 – 14:00" },
  { day: "점심시간", time: "13:00 – 14:00" },
  { day: "일요일", time: "휴진" },
];

export function ClinicLocation() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(site.address);
      setCopyStatus("주소를 복사했습니다.");
    } catch {
      setCopyStatus("주소를 선택해 복사해 주세요.");
    }
  }
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="scroll-mt-20 bg-white text-[#303c50]"
    >
      <div className="mx-auto max-w-[1392px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <header className="mb-9 text-center sm:mb-12 lg:mb-16">
          <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-[#7a879a]">
            CLINIC INFORMATION
          </p>
          <h2
            id="location-heading"
            className="text-[28px] leading-[1.4] font-bold tracking-[-0.035em] text-[#293d7d] sm:text-4xl lg:text-[42px]"
          >
            <span className="block sm:inline">{site.name}</span> <span>진료시간 및 오시는 길</span>
          </h2>
          <p className="mt-5 text-sm leading-[1.8] text-[#626b77] sm:text-base">
            편안한 방문을 위해 진료시간과 위치를 안내해 드립니다.
          </p>
        </header>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="overflow-hidden rounded-[20px] border border-[#e4e9f0] sm:rounded-[24px]">
            <div className="relative aspect-[6/5] bg-[#edf1f5] sm:aspect-[16/9] lg:aspect-[7/5]">
              <iframe
                title="시원척척의원 위치 지도"
                src={
                  "https://maps.google.com/maps?q=" +
                  encodeURIComponent("서울특별시 중랑구 봉화산로 194") +
                  "&output=embed&hl=ko&z=16"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="bg-[#293d7d] px-5 py-6 text-white sm:px-8 sm:py-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">오시는 길</h3>
                <button
                  type="button"
                  onClick={copyAddress}
                  aria-label="주소 복사"
                  className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/30 px-3 text-xs font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="size-4"
                  >
                    <rect x="8" y="3" width="12" height="15" rx="2" />
                    <path d="M5 7H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" />
                  </svg>
                  주소 복사
                </button>
              </div>
              <p className="mt-3 text-base leading-[1.8] break-keep text-white/90 sm:text-lg">
                {site.address}
              </p>
              <div
                id="transport"
                className="mt-4 space-y-2 text-sm leading-[1.8] text-white/80 sm:text-base"
              >
                <p>망우역에서 중랑구청 사거리 방향</p>
                <p>
                  <span
                    className="mr-2 inline-flex size-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#293d7d]"
                    aria-hidden="true"
                  >
                    P
                  </span>
                  건물 무료주차 · 이용은 접수처에 문의해 주세요.
                </p>
              </div>
              <p role="status" className="sr-only">
                {copyStatus}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {mapLinks.map(({ label, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-white/45 px-1 text-[11px] font-semibold whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-2 sm:px-3 sm:text-sm"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={20}
                      height={20}
                      className="hidden size-4 shrink-0 rounded-sm bg-white object-contain min-[360px]:block sm:size-5"
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div id="hours" className="min-w-0 lg:pt-3">
            <div className="flex flex-wrap items-center gap-3 border-b-2 border-[#293d7d] pb-5">
              <h3 className="text-2xl font-bold tracking-tight sm:text-[28px]">진료시간</h3>
              <span className="rounded-full bg-[#edf1fa] px-3 py-1.5 text-xs font-semibold text-[#293d7d] sm:text-sm">
                평일 · 토요일 진료
              </span>
            </div>
            <dl className="grid grid-cols-2">
              {hours.map(({ day, time }) => (
                <div
                  key={day}
                  className="min-w-0 border-b border-[#e6e9ee] py-6 odd:pr-3 even:pl-3 sm:py-7 sm:odd:pr-5 sm:even:pl-5"
                >
                  <dt className="text-sm font-semibold sm:text-base">{day}</dt>
                  <dd
                    className={
                      "mt-3 text-[17px] font-medium tracking-[-0.035em] whitespace-nowrap sm:text-[23px] xl:text-[25px] " +
                      (time === "휴진" ? "text-[#7a8290]" : "text-[#293d7d]")
                    }
                  >
                    {time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-[1.85] break-keep text-[#7a8290] sm:text-sm">
              공휴일·임시 휴진 및 토요일 점심시간 운영은 방문 전 전화 또는 진료 소식으로 확인해
              주세요.
            </p>
            <a
              href={site.phoneHref}
              onClick={() => track("contact_clicked", { source: "footer" })}
              className="mt-8 flex min-h-12 flex-wrap items-baseline gap-x-4 gap-y-1 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d] sm:mt-10"
            >
              <span className="text-sm font-semibold sm:text-base">대표번호</span>
              <span className="text-[34px] leading-tight font-bold tracking-[-0.04em] whitespace-nowrap text-[#293d7d] sm:text-[44px] xl:text-[48px]">
                {site.phone}
              </span>
            </a>
            <a
              href={site.reservation}
              onClick={() => track("reservation_clicked", { source: "footer" })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#03c75a] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#02ad4e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#02ad4e] sm:min-h-16 sm:text-base"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 shrink-0"
              >
                <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
              </svg>
              네이버 플레이스 바로가기
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-4 shrink-0"
              >
                <path d="M6 18 18 6M6 6h12v12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
