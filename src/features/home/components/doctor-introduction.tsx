"use client";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/shared/config/site";
import { Dialog } from "@/shared/ui/dialog";
import { doctorContent, doctorBiography, doctorLetter } from "../model/content";
import { DoctorMotion } from "./doctor-motion";
import "./doctor-introduction.css";

function Portrait({ modal = false }: { modal?: boolean }) {
  return (
    <div
      className={
        "relative " + (modal ? "aspect-[3/5] w-full max-w-[260px]" : "aspect-[3/4] w-full")
      }
    >
      <Image
        src="/images/clinic/shoot-director-cutout.webp"
        alt="시원척척의원 원장"
        fill
        sizes={modal ? "280px" : "(max-width: 639px) 280px, 440px"}
        className="object-contain object-bottom"
      />
    </div>
  );
}

export function DoctorIntroduction() {
  const [open, setOpen] = useState(false);
  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="overflow-x-clip bg-[#f8f9fb] py-24 sm:py-32 lg:py-40"
    >
      <DoctorMotion />
      <div className="mx-auto w-full max-w-[984px] px-[15px] min-[769px]:max-w-[1148px] min-[769px]:px-5 min-[1241px]:max-w-[1312px] min-[1641px]:max-w-[1476px] min-[2001px]:max-w-[1640px] min-[3200px]:max-w-[1968px]">
        <h2
          id="doctors-heading"
          data-doctor-heading
          className="-mb-[0.12em] overflow-hidden pb-[0.12em] text-center text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[50px]"
        >
          <span className="block">시원척척의원 의료진 소개</span>
        </h2>
        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:max-w-none">
            <button
              type="button"
              data-doctor-photo
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-label="원장님 약력 보기"
              className="block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d]"
            >
              <Portrait />
            </button>
            <div data-doctor-side className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5">
              {["AK 치료", "정형외과 진료"].map((label) => (
                <span
                  key={label}
                  className="rounded-md bg-[#293d7d] px-3 py-1.5 text-sm font-semibold text-white sm:px-4 sm:py-2 sm:text-base"
                >
                  {label}
                </span>
              ))}
            </div>
            <h3
              data-doctor-side
              className="mt-3 flex items-center justify-center gap-2 text-[#3c3c3c]"
            >
              <span data-signature className="block w-[169px] overflow-hidden">
                <Image
                  src="/images/brand/siwon-signature.webp"
                  alt="시원척척의원"
                  width={2172}
                  height={724}
                  className="h-auto w-[220px] max-w-none"
                />
              </span>
              <span className="text-sm font-medium">{doctorContent.role}</span>
            </h3>
          </div>
          <div data-doctor-text className="min-w-0">
            <p className="mt-5 text-base leading-[1.8] break-keep text-[#626b77] sm:text-lg">
              {doctorContent.description
                .filter((_, index) => index !== 1)
                .map((line, index) => (
                  <span key={line}>
                    {index > 0 && (
                      <>
                        <br className="hidden lg:block" />
                        <span className="lg:hidden"> </span>
                      </>
                    )}
                    {line}
                  </span>
                ))}
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="group mt-6 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-[#293d7d] px-4 py-2 text-sm font-semibold text-[#293d7d] transition-colors hover:bg-[#293d7d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d] sm:min-h-12 sm:gap-5 sm:px-6 sm:py-3 sm:text-base"
            >
              원장님 약력 확인
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 sm:size-5"
              >
                <path d="M4 12h16m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div data-doctor-pointer aria-hidden="true" className="doctor-pointer">
        <span className="doctor-pointer-box">
          <span className="doctor-pointer-plus">+</span>
          <span>약력 보기</span>
        </span>
      </div>
      {open && (
        <Dialog
          title="원장님 소개 · 약력"
          onClose={() => setOpen(false)}
          className="max-w-[960px] rounded-[24px] text-[#3c3c3c]"
        >
          <div className="grid items-center gap-8 md:grid-cols-[280px_minmax(0,1fr)] md:gap-12">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl bg-[#f8f9fb]">
              <Portrait modal />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {["AK 치료", "정형외과 진료"].map((label) => (
                  <span
                    key={label}
                    className="rounded-md bg-[#293d7d] px-3 py-1.5 text-sm font-semibold text-white"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-[30px]">
                {doctorContent.name}{" "}
                <span className="text-base font-medium text-[#626b77]">{doctorContent.role}</span>
              </h3>
              <p className="mt-3 text-base leading-[1.8] break-keep text-[#626b77]">
                {doctorContent.message.join(" ")}
              </p>
              <dl className="mt-6 border-t border-[#e7ebf0]">
                {doctorBiography.map(({ title, text }) => (
                  <div
                    key={title}
                    className="grid grid-cols-[72px_1fr] gap-4 border-b border-[#e7ebf0] py-4"
                  >
                    <dt className="text-sm font-semibold text-[#293d7d]">{title}</dt>
                    <dd className="text-sm leading-[1.8] break-keep text-[#626b77]">{text}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#293d7d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1d2d61] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d]"
                >
                  진료 문의
                </a>
                <a
                  href={site.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d9dfeb] px-5 text-sm font-semibold text-[#293d7d] transition-colors hover:bg-[#edf1f8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d]"
                >
                  공식 블로그
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-[#e7ebf0] pt-8 sm:mt-12">
            <h3 className="text-xl font-semibold tracking-tight">환자분께 드리는 편지</h3>
            <p className="mt-5 text-[15px] leading-[2] break-keep text-[#626b77] sm:text-base">
              {doctorLetter.paragraphs.join(" ")}
            </p>
            <Image
              src="/images/brand/siwon-signature.webp"
              alt="시원척척의원 드림"
              width={2172}
              height={724}
              className="mt-6 ml-auto h-auto w-[160px]"
            />
          </div>
        </Dialog>
      )}
    </section>
  );
}
