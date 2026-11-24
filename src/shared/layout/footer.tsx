"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/shared/config/site";
import { routes } from "@/shared/config/routes";
import { Dialog } from "@/shared/ui/dialog";
import { ContactLink } from "@/shared/ui/contact-link";
import { QuickContact } from "./quick-contact";
import { ClinicLocation } from "./clinic-location";
const policies = ["개인정보처리방침", "이용약관", "환자의 권리와 의무", "비급여 안내"];
const socialIcons: Record<string, string> = {
  blog: "/images/social/blog.png",
  instagram: "/images/social/instagram-brand.png",
  chat: "/images/social/kakaotalk-bubble.svg",
  calendar: "/images/social/naver.svg",
};

export function Footer() {
  const [policy, setPolicy] = useState<string | null>(null);
  return (
    <>
      <ClinicLocation />
      <footer id="site-footer" className="bg-[#111318] text-white">
        <div className="mx-auto max-w-[1392px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <nav
            aria-label="하단 안내"
            className="flex flex-wrap gap-x-5 gap-y-1 border-b border-white/10 pb-6 text-xs text-white/60 sm:gap-x-7 sm:text-sm"
          >
            {policies.map((label) => (
              <button
                key={label}
                onClick={() => setPolicy(label)}
                className={
                  "min-h-11 cursor-pointer text-left transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " +
                  (label === "개인정보처리방침" ? "font-semibold text-white/85" : "")
                }
              >
                {label}
              </button>
            ))}
            <Link
              href={routes.news}
              className="flex min-h-11 items-center hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              소식
            </Link>
          </nav>
          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <Link
              href={routes.home}
              aria-label="시원척척의원 홈"
              className="w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src="/images/brand/siwon-clinic-logo-white.svg"
                alt={site.name}
                width={220}
                height={71}
                className="h-auto w-[180px] sm:w-[200px]"
              />
            </Link>
            <div className="flex items-center gap-2">
              {[
                { label: "공식 블로그", href: site.blog, kind: "blog" },
                { label: "인스타그램", href: site.instagram, kind: "instagram" },
                { label: "카카오톡 공유", href: site.kakao, kind: "chat" },
                { label: "네이버 플레이스", href: site.reservation, kind: "calendar" },
              ].map((c) => (
                <a
                  key={c.kind}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  title={c.label}
                  className="flex size-11 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <Image
                    src={socialIcons[c.kind]}
                    alt=""
                    width={c.kind === "blog" ? 40 : 26}
                    height={c.kind === "blog" ? 40 : 26}
                    unoptimized
                    className={
                      c.kind === "blog" ? "size-10 object-contain" : "size-6 object-contain"
                    }
                  />
                </a>
              ))}
            </div>
          </div>
          <dl className="mt-7 grid gap-x-10 gap-y-3 text-sm leading-[1.8] sm:flex sm:flex-wrap">
            <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:flex">
              <dt className="text-white/45">주소</dt>
              <dd className="break-keep text-white/80">{site.address}</dd>
            </div>
            <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:flex">
              <dt className="text-white/45">대표번호</dt>
              <dd>
                <a
                  href={site.phoneHref}
                  className="text-white/80 hover:underline focus-visible:outline-2 focus-visible:outline-white"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-7 max-w-3xl text-xs leading-[1.9] text-white/45">
            원내 촬영 사진과 AI 생성 참고 이미지를 사용했습니다. 일부 진료 사진의 환자 모습은 AI로
            편집한 가상 인물입니다.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="text-xs leading-[1.9] text-white/40">
              © {site.name}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "instant"
                    : "smooth",
                })
              }
              className="min-h-11 cursor-pointer text-xs text-white/65 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              맨 위로 ↑
            </button>
          </div>
        </div>
      </footer>
      <QuickContact />
      {policy && (
        <Dialog title={policy} onClose={() => setPolicy(null)}>
          <p className="leading-8 text-muted">
            {policy === "비급여 안내"
              ? "현재 적용되는 비급여 항목과 비용은 접수처에서 안내해 드립니다. 과거 블로그에 게시된 금액은 현재와 다를 수 있습니다."
              : "병원 확인을 거친 정식 안내문이 준비되면 이곳에 게시됩니다. 현재 페이지는 홈페이지 검토용 시안입니다."}
          </p>
          <ContactLink className="mt-6">접수처 문의</ContactLink>
        </Dialog>
      )}
    </>
  );
}
