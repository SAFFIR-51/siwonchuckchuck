"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { site } from "@/shared/config/site";

export function ClinicLocation({ children }: { children?: ReactNode }) {
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
    <section id="location" aria-label="오시는 길" className="border-y border-[#e5e8ee] bg-white">
      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-[clamp(32px,4vw,96px)] lg:py-14">
          <div className="flex items-start gap-2">
            <h3 className="text-xl leading-[1.4] font-bold tracking-tight break-keep text-[#30343b] sm:text-2xl xl:text-[28px]">
              {site.address}
            </h3>
            <button
              type="button"
              onClick={copyAddress}
              aria-label="주소 복사"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#173c83] hover:bg-[#edf2f9] focus-visible:outline-2 focus-visible:outline-[#173c83]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="size-6"
              >
                <rect x="8" y="3" width="12" height="15" rx="2" />
                <path d="M5 7H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" />
              </svg>
            </button>
          </div>
          <p role="status" className="min-h-6 text-xs text-[#173c83]">
            {copyStatus}
          </p>
          <div className="mt-5 grid gap-7 xl:grid-cols-[1.1fr_0.9fr] xl:gap-x-8">
            <div>
              <dl
                id="transport"
                className="space-y-5 text-base leading-[1.7] font-medium text-[#30343b] 2xl:text-lg"
              >
                <div className="flex items-start gap-4">
                  <dt className="shrink-0 rounded bg-[#173c83] px-2.5 py-1 text-xs font-bold text-white sm:text-sm">
                    대중교통
                  </dt>
                  <dd>
                    망우역 2번 출구에서 약 972m
                    <br />
                    <span className="text-[#7a8290]">중랑구청 사거리 · 신아타운 7층</span>
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="shrink-0 rounded bg-[#173c83] px-2.5 py-1 text-xs font-bold text-white sm:text-sm">
                    주차 안내
                  </dt>
                  <dd>
                    건물 무료주차 이용
                    <br />
                    <span className="text-[#7a8290]">주차 이용은 접수처에 문의해 주세요.</span>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { label: "네이버 지도", icon: "/images/maps/naver.svg", href: site.map },
                  { label: "카카오맵", icon: "/images/maps/kakao.svg", href: site.kakaoMap },
                  {
                    label: "구글 지도",
                    icon: "/images/maps/google.png",
                    href:
                      "https://www.google.com/maps/search/?api=1&query=" +
                      encodeURIComponent(site.name + " " + site.address),
                  },
                ].map(({ label, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#dce1e9] px-3 text-sm font-semibold text-[#30343b] transition-colors hover:border-[#173c83] hover:bg-[#f2f5fa] focus-visible:outline-2 focus-visible:outline-[#173c83] sm:text-base"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 shrink-0 object-contain"
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="border-t border-[#edf0f4] pt-6 xl:border-t-0 xl:pt-0">
              <div id="hours">
                <h3 className="text-lg font-semibold text-[#30343b] 2xl:text-xl">진료 안내</h3>
                <dl className="mt-5 space-y-2.5 text-base font-medium text-[#30343b] 2xl:text-[17px]">
                  {[
                    ["월 – 금", "09:00 – 18:30"],
                    ["토요일", "09:00 – 14:00"],
                    ["점심시간", "13:00 – 14:00"],
                    ["일요일", "휴진"],
                  ].map(([day, time]) => (
                    <div key={day} className="grid grid-cols-[76px_1fr] gap-3">
                      <dt>{day}</dt>
                      <dd className="whitespace-nowrap">{time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 max-w-[540px] text-sm leading-[1.8] break-keep text-[#7a8290] lg:text-balance 2xl:text-base">
                  공휴일·임시 휴진 및 토요일 점심시간 운영은 방문 전 전화 또는 진료 소식으로 확인해
                  주세요.
                </p>
              </div>
            </div>
          </div>
          {children}
        </div>
        <div className="relative h-[340px] overflow-hidden bg-[#edf1f5] sm:h-[420px] lg:h-auto lg:min-h-0">
          <iframe
            title="시원척척의원 위치 지도"
            src={
              "https://maps.google.com/maps?q=" +
              encodeURIComponent(site.name + " " + site.address) +
              "&output=embed&hl=ko&z=16"
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
          <a
            href={site.map}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-5 bottom-5 inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-5 text-sm font-semibold text-[#173c83] shadow-sm ring-1 ring-black/5 hover:bg-[#edf2f9]"
          >
            네이버 지도로 길찾기
          </a>
        </div>
      </div>
    </section>
  );
}
