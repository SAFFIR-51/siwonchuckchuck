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
  instagram: "/images/social/instagram.svg",
  chat: "/images/social/kakaotalk.svg",
  calendar: "/images/social/naver.svg",
};

export function Footer() {
  const [policy, setPolicy] = useState<string | null>(null);
  return (
    <>
      <footer className="bg-white text-[#30343b]">
        <ClinicLocation>
          <div className="mt-8 border-t border-[#dfe4eb] pt-5">
            <nav aria-label="하단 안내" className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {policies.map((label) => (
                <button
                  key={label}
                  onClick={() => setPolicy(label)}
                  className={
                    "min-h-11 cursor-pointer text-[#626b77] hover:text-[#173c83] " +
                    (label === "개인정보처리방침" ? "font-semibold text-[#30343b]" : "")
                  }
                >
                  {label}
                </button>
              ))}
              <Link
                href={routes.news}
                className="flex min-h-11 items-center text-[#626b77] hover:text-[#173c83]"
              >
                소식
              </Link>
            </nav>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <Link href={routes.home} aria-label="시원척척의원 홈" className="inline-block">
                <Image
                  src="/images/brand/siwon-clinic-logo.svg"
                  alt="시원척척의원"
                  width={220}
                  height={60}
                  className="h-auto w-[180px]"
                />
              </Link>
              <div className="flex items-center gap-2">
                {[
                  { label: "공식 블로그", href: site.blog, kind: "blog" },
                  { label: "인스타그램", href: site.instagram, kind: "instagram" },
                  { label: "카카오톡 공유", href: site.kakao, kind: "chat" },
                  { label: "네이버 예약", href: site.reservation, kind: "calendar" },
                ].map((c) => (
                  <a
                    key={c.kind}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={c.label}
                    title={c.label}
                    className="flex size-11 items-center justify-center rounded-full text-[#173c83] transition-colors hover:bg-[#edf2f9] focus-visible:outline-2 focus-visible:outline-[#173c83]"
                  >
                    <Image
                      src={socialIcons[c.kind]}
                      alt=""
                      width={28}
                      height={28}
                      unoptimized
                      className="size-7 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs leading-6 break-keep text-[#7a8290]">{site.address}</p>
            <p className="mt-4 text-xs leading-6 text-[#7a8290]">
              © {site.name}. All rights reserved.
            </p>
          </div>
        </ClinicLocation>
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
