"use client";
import { useState } from "react";
import Image from "next/image";
import { ClinicPhoto } from "@/shared/ui/clinic-photo";
import { Dialog } from "@/shared/ui/dialog";
import { ContactLink } from "@/shared/ui/contact-link";
import { cn } from "@/shared/lib/cn";
import { clinics, treatments } from "../model/content";

export function ClinicCards() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {clinics.map((clinic, index) => (
          <button
            key={clinic.title}
            onClick={() => setSelected(index)}
            aria-label={clinic.title + " 자세히 보기"}
            aria-haspopup="dialog"
            className="group relative isolate aspect-[3/4] overflow-hidden rounded-[24px] bg-[#d9e7f5] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Image
              src={clinic.image}
              alt={clinic.imageAlt}
              fill
              sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] group-focus-visible:scale-[1.045] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#1b315e]/85 via-[#334e7a]/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-7 text-center text-white xl:px-7 xl:pb-9">
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                {clinic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#263d68] sm:text-[13px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-[25px] leading-snug font-bold tracking-[-0.04em] xl:text-[30px]">
                {clinic.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/85 xl:text-[15px]">
                {clinic.subtitle}
              </p>
              <span
                aria-hidden="true"
                className="mt-4 inline-flex items-center gap-3 text-xs font-medium text-white/90 transition-opacity duration-300 motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
              >
                자세히 보기
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 12h15m-6-6 6 6-6 6" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <Dialog title={clinics[selected].title} onClose={() => setSelected(null)}>
          <p className="text-lg leading-8">{clinics[selected].text}</p>
          <p className="mt-6 text-sm leading-7 text-muted">
            진단과 치료 계획은 진찰 후 결정됩니다. 기존 검사 결과가 있다면 지참해 주세요.
          </p>
          <ContactLink className="mt-8">진료 상담 문의</ContactLink>
        </Dialog>
      )}
    </>
  );
}
export function TreatmentGuide() {
  const [selected, setSelected] = useState(0);
  const item = treatments[selected];
  const considerations = [
    [
      "인대·힘줄 부위의 불편함이 있어 상태 확인이 필요한 경우",
      "진찰 후 주사치료의 필요성을 상담하려는 경우",
    ],
    [
      "자가 혈액을 활용한 치료의 적용 가능성을 상담하려는 경우",
      "기존 검사 결과를 바탕으로 치료 방향을 확인하려는 경우",
    ],
    [
      "통증 부위에 체외충격파를 적용할 수 있는지 상담하려는 경우",
      "현재 상태에 맞는 치료 강도와 계획을 확인하려는 경우",
    ],
    [
      "영상으로 치료 부위를 확인하는 주사치료를 상담하려는 경우",
      "증상과 검사 결과에 따른 신경치료 계획을 확인하려는 경우",
    ],
    [
      "초음파로 통증 부위의 상태를 살펴볼 필요가 있는 경우",
      "초음파 유도 주사치료의 적용 여부를 상담하려는 경우",
    ],
    ["입을 벌리거나 씹을 때 불편함을 느끼는 경우", "턱의 움직임과 자세를 함께 확인하고 싶은 경우"],
    ["걷거나 서 있을 때 발에 불편함을 느끼는 경우", "보행 습관과 교정·관리 방향을 상담하려는 경우"],
    [
      "현재 건강 상태에 수액치료가 필요한지 상담하려는 경우",
      "병력과 복용 약물을 고려해 치료 가능 여부를 확인하려는 경우",
    ],
  ];
  const faqs = [
    { title: "치료 전후 주의사항", text: item.caution },
    {
      title: "프롤로와 PRP는 어떻게 다른가요?",
      text: "주입하는 성분과 적용 조건이 다릅니다. PRP는 자가 혈액에서 분리한 성분을 이용하며, 어떤 치료가 적합한지는 진찰과 적응증 확인 후 결정합니다. 두 치료 중 하나가 항상 더 좋은 것은 아닙니다.",
    },
    {
      title: "치료는 몇 번 받아야 하나요?",
      text: "증상과 진찰 결과, 치료 반응에 따라 달라집니다. 진료 시 예상되는 계획과 경과 확인 방법을 안내해 드립니다.",
    },
  ];
  return (
    <div>
      <div
        role="tablist"
        aria-label="치료 선택"
        className="mb-9 flex [scrollbar-width:none] gap-6 overflow-x-auto border-b border-[#dfe4ed] sm:mb-12 sm:gap-8 lg:flex-wrap lg:gap-x-9 [&::-webkit-scrollbar]:hidden"
      >
        {treatments.map((t, index) => (
          <button
            key={t.title}
            id={"treatment-tab-" + index}
            role="tab"
            aria-selected={index === selected}
            aria-controls="treatment-panel"
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % treatments.length;
              else if (event.key === "ArrowLeft")
                next = (index - 1 + treatments.length) % treatments.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = treatments.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              document.getElementById("treatment-tab-" + next)?.focus();
            }}
            className={cn(
              "relative min-h-16 shrink-0 border-b-2 px-1 py-5 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent sm:text-lg xl:text-xl",
              index === selected
                ? "border-[#263d79] text-[#263d79]"
                : "border-transparent text-[#69717d] hover:text-[#263d79]",
            )}
          >
            {t.title}
          </button>
        ))}
      </div>
      <div
        id="treatment-panel"
        role="tabpanel"
        aria-labelledby={"treatment-tab-" + selected}
        tabIndex={0}
        className="outline-offset-8"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-14 xl:gap-20">
          <figure className="w-full max-w-[560px] min-w-0 overflow-hidden rounded-[24px]">
            <ClinicPhoto
              name={item.photo}
              alt="시원척척의원 진료 참고 이미지"
              className="aspect-[3/2] rounded-[24px]"
            />
          </figure>
          <div className="min-w-0">
            <h3 className="text-[30px] leading-snug font-bold tracking-[-0.03em] text-[#3c3c3c] sm:text-[38px]">
              {item.name}
            </h3>
            <p className="mt-4 text-base leading-[1.85] text-[#595959] sm:text-lg">{item.text}</p>
            <div className="mt-8 border-t border-[#e4e8ef] pt-7">
              <h4 className="text-base font-semibold text-[#304880] sm:text-lg">
                이런 경우 고려합니다
              </h4>
              <ul className="mt-3 space-y-2 text-[15px] leading-[1.8] text-[#595959] sm:text-base">
                {considerations[selected].map((text) => (
                  <li key={text} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.8em] size-1 shrink-0 rounded-full bg-[#304880]"
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-7">
              <h4 className="text-base font-semibold text-[#304880] sm:text-lg">진행 과정</h4>
              <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#3c3c3c] sm:gap-x-5 sm:text-base">
                {["상담", "상태 확인", "치료", "관리 안내"].map((step, index) => (
                  <li key={step} className="flex items-center gap-3 sm:gap-5">
                    {index > 0 && (
                      <svg
                        aria-hidden="true"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8793aa"
                        strokeWidth="1.5"
                      >
                        <path d="m9 5 7 7-7 7" />
                      </svg>
                    )}
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm leading-[1.8] text-[#707783]">
                입원·절개 여부와 시술 시간은 진료 후 안내하며, 치료 횟수는 상태와 경과에 따라
                결정합니다.
              </p>
            </div>
            <div key={item.title} className="mt-7 border-t border-[#e4e8ef]">
              {faqs.map((faq) => (
                <details key={faq.title} className="group border-b border-[#e4e8ef]">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-medium text-[#3c3c3c] sm:text-base [&::-webkit-details-marker]:hidden">
                    {faq.title}
                    <svg
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#304880]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M5 12h14" />
                      <path className="group-open:hidden" d="M12 5v14" />
                    </svg>
                  </summary>
                  <p className="pr-6 pb-5 text-sm leading-[1.85] text-[#595959] sm:text-base">
                    {faq.text}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs leading-6 text-muted">
        치료의 적용 여부와 효과, 부작용은 개인에 따라 다르며 의료진과 상담 후 결정합니다.
      </p>
    </div>
  );
}
