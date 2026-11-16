"use client";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/shared/config/site";
import { Dialog } from "@/shared/ui/dialog";
import { doctorContent, doctorBiography, doctorLetter } from "../model/content";

function Portrait({ modal = false }: { modal?: boolean }) {
  return (
    <div
      className={
        "relative overflow-hidden " +
        (modal ? "aspect-[4/5] w-full max-w-[280px]" : "aspect-[3/4] w-full bg-transparent")
      }
    >
      <Image
        src="/images/clinic/director-portrait-v2.webp"
        alt="시원척척의원 원장"
        fill
        sizes={modal ? "280px" : "(max-width: 640px) 90vw, 440px"}
        className={
          modal ? "object-contain object-bottom px-4 pt-6" : "object-cover object-top px-3 pt-8"
        }
      />
    </div>
  );
}

export function DoctorIntroduction() {
  const [open, setOpen] = useState(false);
  const [sample, setSample] = useState<string | null>(null);
  return (
    <section
      id="doctors"
      aria-labelledby="doctors-heading"
      className="bg-[#f8f9fb] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[984px] px-[15px] min-[769px]:max-w-[1148px] min-[769px]:px-5 min-[1241px]:max-w-[1312px] min-[1641px]:max-w-[1476px] min-[2001px]:max-w-[1640px] min-[3200px]:max-w-[1968px]">
        <h2
          id="doctors-heading"
          className="text-center text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[50px]"
        >
          시원척척의원 의료진 소개
        </h2>
        <p className="mx-auto mt-5 max-w-[720px] text-center text-base leading-[1.8] break-keep text-[#626b77] sm:text-lg">
          {doctorContent.description}
        </p>
        <div className="mx-auto mt-12 grid max-w-[1120px] items-start gap-10 md:grid-cols-3 md:gap-5 lg:mt-16 lg:gap-7">
          {[
            { name: doctorContent.name, focus: doctorContent.focus, image: null, sample: false },
            {
              name: "가상 의료진 A",
              focus: "AK치료 · 정형외과 진료",
              image: "/images/clinic/sample-doctor-male.webp",
              sample: true,
            },
            {
              name: "가상 의료진 B",
              focus: "AK치료 · 정형외과 진료",
              image: "/images/clinic/sample-doctor-female.webp",
              sample: true,
            },
          ].map((doctor) => (
            <article
              key={doctor.name}
              className="mx-auto w-full max-w-[360px] bg-transparent text-center"
            >
              {doctor.image ? (
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={doctor.image}
                    alt={doctor.name + " · 디자인 시안용 가상 인물"}
                    fill
                    sizes="(max-width: 768px) 90vw, 360px"
                    className="object-contain object-bottom px-3 pt-8"
                  />
                </div>
              ) : (
                <Portrait />
              )}
              <div className="px-2 pt-6">
                <p className="text-sm font-medium text-[#173c83]">{doctor.focus}</p>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-[#3c3c3c] lg:text-2xl">
                  {doctor.name}
                  {!doctor.sample && (
                    <span className="ml-1.5 font-medium">{doctorContent.role}</span>
                  )}
                </h3>
                <button
                  type="button"
                  onClick={() => (doctor.sample ? setSample(doctor.name) : setOpen(true))}
                  aria-haspopup="dialog"
                  className="group mx-auto mt-4 flex min-h-11 cursor-pointer items-center justify-center gap-3 rounded-full px-5 py-2 text-sm font-medium text-[#173c83] transition-colors hover:bg-[#eaf0f8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173c83]"
                >
                  약력 보기
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    <path d="M4 12h16m-7-7 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {sample && (
        <Dialog title={sample + " · 시안용 프로필"} onClose={() => setSample(null)}>
          <p className="text-base leading-relaxed text-[#626b77]">
            레이아웃 확인을 위한 가상 인물입니다. 실제 의료진 사진과 이름, 진료과목 및 약력으로
            교체할 예정입니다.
          </p>
        </Dialog>
      )}
      {open && (
        <Dialog
          title="원장님 소개 · 약력"
          onClose={() => setOpen(false)}
          className="max-w-[1000px] rounded-lg"
          headerContent={
            <div className="flex min-w-0 flex-1 bg-[#f0f5fc]">
              <span className="flex min-h-10 items-center justify-center bg-[#173c83] px-5 py-2 text-sm font-semibold text-white sm:min-w-[220px]">
                시원척척의원 원장
              </span>
            </div>
          }
        >
          <div className="grid items-start gap-7 md:grid-cols-[250px_1fr] md:gap-9">
            <div className="mx-auto w-full max-w-[250px]">
              <Portrait modal />
              <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm font-medium">
                <a
                  href={site.phoneHref}
                  className="flex min-h-11 items-center justify-center rounded-sm bg-[#173c83] px-2 text-white hover:bg-[#244d94] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173c83]"
                >
                  진료 문의 ↗
                </a>
                <a
                  href={site.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-sm bg-[#edf3fb] px-2 text-[#173c83] hover:bg-[#dfe9f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173c83]"
                >
                  공식 블로그 ↗
                </a>
              </div>
            </div>
            <div
              tabIndex={0}
              role="region"
              aria-label="원장 소개 및 약력"
              className="max-h-[48svh] [scrollbar-width:thin] [scrollbar-color:#173c83_#edf1f6] overflow-y-auto pr-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173c83] md:max-h-[430px] md:pr-5"
            >
              <p className="inline-flex w-fit items-center rounded-md bg-white px-3 py-1.5 text-xs leading-5 font-medium text-[#173c83] ring-1 ring-[#e7edf5] ring-inset sm:text-sm">
                {doctorContent.focus}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-[#30343b] sm:text-2xl">
                {doctorContent.name}{" "}
                <span className="text-base font-medium">{doctorContent.role}</span>
              </h3>
              <p className="mt-4 text-sm leading-[1.85] break-keep text-[#626b77]">
                {doctorContent.message.join(" ")}
              </p>
              <dl className="mt-6 border-t border-[#e7ebf0]">
                {doctorBiography.map(({ title, text }) => (
                  <div
                    key={title}
                    className="grid grid-cols-[64px_1fr] gap-4 border-b border-[#e7ebf0] py-5 sm:grid-cols-[76px_1fr]"
                  >
                    <dt className="text-sm font-semibold text-[#30343b]">{title}</dt>
                    <dd className="flex gap-2 text-sm leading-[1.85] break-keep text-[#687180]">
                      <span
                        aria-hidden="true"
                        className="mt-[11px] size-[3px] shrink-0 rounded-full bg-[#8a97aa]"
                      />
                      <span>{text}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="mt-9 border-t border-[#e7ebf0] pt-7">
            <h3 className="text-lg font-semibold text-[#173c83]">환자분께 드리는 편지</h3>
            <p className="mt-4 text-sm leading-[1.9] break-keep text-[#626b77]">
              {doctorLetter.paragraphs.join(" ")}
            </p>
            <Image
              src="/images/brand/siwon-signature.webp"
              alt="시원척척의원 드림"
              width={190}
              height={64}
              className="mt-5 ml-auto h-auto w-[160px]"
            />
          </div>
        </Dialog>
      )}
    </section>
  );
}
