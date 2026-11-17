"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@/shared/ui/dialog";
import { ContactLink } from "@/shared/ui/contact-link";
import { cn } from "@/shared/lib/cn";
import { clinics, treatments } from "../model/content";
import { clinicDetails } from "../model/clinic-details";

export function ClinicCards() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {clinics.map((clinic, index) => (
          <button
            key={clinic.title}
            onClick={() => setSelected(index)}
            aria-label={clinic.title + " 자세히 보기"}
            aria-haspopup="dialog"
            className="group relative isolate grid aspect-[3/4] content-end overflow-hidden rounded-2xl bg-[#d9e7f5] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:block sm:rounded-[24px]"
          >
            <Image
              src={clinic.image}
              alt={clinic.imageAlt}
              fill
              sizes="(max-width: 1023px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] group-focus-visible:scale-[1.045] motion-reduce:transform-none motion-reduce:transition-none"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#1b315e]/90 via-[#334e7a]/40 to-transparent sm:from-[#1b315e]/85 sm:via-[#334e7a]/10"
            />
            <div className="relative mt-9 px-2 pb-3 text-center text-white sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0 sm:px-6 sm:pb-7 xl:px-7 xl:pb-9">
              <div className="mb-2 flex flex-wrap justify-center gap-1 sm:mb-4 sm:gap-2">
                {clinic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-[#263d68] sm:px-3 sm:py-1.5 sm:text-[13px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg leading-snug font-bold tracking-[-0.04em] break-keep sm:text-[25px] xl:text-[30px]">
                {clinic.title}
              </h3>
              <p className="mt-2 hidden text-[13px] leading-relaxed break-keep text-white/85 sm:block xl:text-[15px]">
                {clinic.subtitle}
              </p>
              <span
                aria-hidden="true"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/90 transition-opacity duration-300 motion-reduce:transition-none sm:mt-4 sm:gap-3 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
              >
                자세히 보기
                <svg
                  className="size-3.5 sm:size-[18px]"
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
        <ClinicDetailDialog clinic={clinics[selected]} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function ClinicDetailDialog({
  clinic,
  onClose,
}: {
  clinic: (typeof clinics)[number];
  onClose: () => void;
}) {
  const detail = clinicDetails[clinic.title];
  return (
    <Dialog
      title={clinic.title}
      onClose={onClose}
      className="max-w-[960px] rounded-[24px] text-[#3c3c3c]"
    >
      <div className="grid min-w-0 items-center gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8">
        <div className="relative mx-auto aspect-[3/4] w-36 overflow-hidden rounded-2xl sm:w-40">
          <Image
            src={clinic.image}
            alt={clinic.imageAlt}
            fill
            sizes="(max-width: 639px) 144px, 160px"
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-[24px] leading-snug font-bold tracking-[-0.03em] sm:text-[28px]">
            {detail.heading}
          </h3>
          <p className="mt-4 text-[15px] leading-7 text-[#596575] sm:text-base">{detail.intro}</p>
        </div>
      </div>
      <section className="mt-8 rounded-2xl bg-[#f1f4fa] p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-[#293d7d]">이런 불편함이 있나요?</h3>
        <ul className="mt-3 space-y-2 text-[15px] leading-7">
          {detail.symptoms.map((symptom) => (
            <li key={symptom} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-3 size-1.5 shrink-0 rounded-full bg-[#293d7d]"
              />
              {symptom}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h3 className="text-xl font-semibold">
          {clinic.title === "성장 클리닉"
            ? "성장 상담에서 살펴보는 내용"
            : "함께 알아두면 좋은 내용"}
        </h3>
        <div className="mt-4 overflow-hidden rounded-xl border border-[#e3e7ef]">
          <table className="w-full table-auto border-collapse text-left">
            <caption className="sr-only">{clinic.title} 주요 내용과 설명</caption>
            <tbody className="divide-y divide-[#e3e7ef]">
              {detail.topics.map((topic) => (
                <tr key={topic.title}>
                  <th
                    scope="row"
                    className="w-[32%] border-r border-[#e3e7ef] bg-[#f1f4fa] px-3 py-5 align-top text-sm leading-6 font-semibold break-keep text-[#293d7d] sm:w-px sm:px-5 sm:text-base sm:whitespace-nowrap"
                  >
                    {topic.title}
                  </th>
                  <td className="px-4 py-5 text-[14px] leading-7 text-[#596575] sm:px-6 sm:text-[15px]">
                    {topic.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-8">
        <h3 className="text-xl font-semibold">시원척척의원은 이렇게 살핍니다</h3>
        <p className="mt-3 text-[15px] leading-7 text-[#596575]">{detail.care}</p>
        <p className="mt-5 rounded-xl bg-[#f3f4f6] px-5 py-4 text-[14px] leading-7 text-[#596575]">
          <strong className="mb-1 block font-semibold text-[#3c3c3c]">방문 전 참고해 주세요</strong>
          {detail.preparation}
        </p>
      </section>
      <div className="mt-7 flex justify-end border-t border-[#e3e7ef] pt-6">
        <ContactLink showArrow={false} className="shrink-0 !bg-[#293d7d] !text-white">
          진료 상담 문의
        </ContactLink>
      </div>
    </Dialog>
  );
}
export function TreatmentGuide() {
  const [selected, setSelected] = useState(0);
  const item = treatments[selected];
  const treatmentColumns = "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-x-14 xl:gap-x-20";
  const treatmentFacts = [
    {
      label: "입원 여부",
      value: "진료 후 안내",
      icon: "M3 18v-7m18 7v-5a2 2 0 0 0-2-2h-8v5M3 16h18M6 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 3v5m-2.5-2.5h5",
    },
    {
      label: "시술 시간",
      value: "시술별 안내",
      icon: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
      label: "절개 여부",
      value: item.incision,
      icon: "m14 6 4 4M4 19l5-1L21 6l-4-4-12 12-1 5Zm8 1h3m3 0h3",
    },
    {
      label: "치료 주기",
      value: "경과에 따라 결정",
      icon: "M7 3v4m10-4v4M4 10h16M4 5h16v15H4zm4 9h2m4 0h2m-8 3h2",
    },
  ];
  const considerations = [
    [
      "인대·힘줄 부위의 불편함이 있어 상태 확인이 필요한 경우",
      "진찰 후 주사치료의 필요성을 상담하려는 경우",
      "반복하는 동작에서 같은 부위가 계속 불편한 경우",
    ],
    [
      "자가 혈액을 활용한 치료의 적용 가능성을 상담하려는 경우",
      "기존 검사 결과를 바탕으로 치료 방향을 확인하려는 경우",
      "무릎 통증으로 걷거나 계단을 오르기 불편한 경우",
    ],
    [
      "통증 부위에 체외충격파를 적용할 수 있는지 상담하려는 경우",
      "현재 상태에 맞는 치료 강도와 계획을 확인하려는 경우",
      "발뒤꿈치가 계속 아파 걷거나 오래 서기 불편한 경우",
    ],
    [
      "영상으로 치료 부위를 확인하는 주사치료를 상담하려는 경우",
      "증상과 검사 결과에 따른 신경치료 계획을 확인하려는 경우",
      "목이나 허리에서 팔이나 다리로 통증이 뻗치는 경우",
    ],
    [
      "초음파로 통증 부위의 상태를 살펴볼 필요가 있는 경우",
      "초음파 유도 주사치료의 적용 여부를 상담하려는 경우",
      "관절을 움직일 때 통증이 생겨 힘줄과 주변 조직을 살펴보고 싶은 경우",
    ],
    [
      "입을 벌리거나 씹을 때 불편함을 느끼는 경우",
      "턱의 움직임과 자세를 함께 확인하고 싶은 경우",
      "이를 악무는 습관과 턱의 뻐근함을 함께 상담하고 싶은 경우",
    ],
    [
      "걷거나 서 있을 때 발에 불편함을 느끼는 경우",
      "보행 습관과 교정·관리 방향을 상담하려는 경우",
      "신발을 신을 때 발의 한 부위에 압박이 집중되는 경우",
    ],
    [
      "현재 건강 상태에 수액치료가 필요한지 상담하려는 경우",
      "병력과 복용 약물을 고려해 치료 가능 여부를 확인하려는 경우",
      "구토나 설사로 물을 충분히 마시기 어려워 수분 상태를 확인하려는 경우",
    ],
  ];
  const faqs = [
    { title: "치료 전후에 주의해야 할 사항이 있을까요?", text: item.caution },
    ...item.faqs,
  ];
  return (
    <div>
      <div
        role="tablist"
        aria-label="치료 선택"
        className="relative mb-9 grid grid-cols-4 grid-rows-2 gap-x-1 gap-y-3 border-b border-[#dfe4ed] max-sm:before:pointer-events-none max-sm:before:absolute max-sm:before:inset-x-0 max-sm:before:top-[calc(50%-0.375rem)] max-sm:before:h-px max-sm:before:bg-[#dfe4ed] sm:mb-12 sm:flex sm:[scrollbar-width:none] sm:gap-8 sm:overflow-x-auto lg:flex-wrap lg:gap-x-9 [&::-webkit-scrollbar]:hidden"
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
              "relative min-h-12 shrink-0 border-b-2 py-2 text-[clamp(14px,3.6vw,15px)] leading-tight font-semibold break-keep transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent sm:min-h-16 sm:px-1 sm:py-5 sm:text-lg sm:leading-normal xl:text-xl",
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
        <div className={cn("grid gap-8", treatmentColumns)}>
          <figure className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-[24px] bg-surface sm:max-lg:aspect-square lg:aspect-auto lg:min-h-[clamp(420px,38vw,600px)]">
            <Image
              src={`/images/treatments/portrait/${item.image}.webp`}
              alt={item.imageAlt}
              fill
              sizes="(min-width: 1720px) 560px, (min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="min-w-0 lg:flex lg:flex-col">
            <h3 className="text-[28px] leading-snug font-bold tracking-[-0.03em] break-keep sm:text-[38px]">
              <span className="block text-[0.8em] font-medium text-[#3c3c3c]">{item.lead}</span>
              <span className="mt-1 block text-[#263d79]">{item.name}</span>
            </h3>
            <p className="mt-5 max-w-[68ch] text-base leading-[1.85] break-keep text-[#595959] sm:text-lg">
              {item.text}
            </p>
            <p className="mt-4 max-w-[68ch] text-base leading-[1.85] font-semibold break-keep text-[#3c3c3c] sm:text-lg lg:pb-8">
              {item.emphasis}
            </p>
            <div className="mt-7 max-w-[800px] sm:mt-8 lg:mt-auto">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm leading-relaxed break-keep text-[#455269] sm:text-base">
                <span className="font-semibold text-[#263d79]">진행 과정</span>
                <span>상담 → 상태 확인 → 치료 → 관리 안내</span>
              </p>
              <dl
                aria-label="치료 정보"
                className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3"
              >
                {treatmentFacts.map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-xl bg-[#eef3fa] px-2 py-3.5 text-center break-keep sm:px-3 sm:py-5"
                  >
                    <dt className="text-sm font-semibold text-[#263d79] sm:text-base">
                      <span className="mx-auto mb-2 flex size-9 items-center justify-center rounded-full bg-white sm:size-11">
                        <svg
                          aria-hidden="true"
                          className="size-4 sm:size-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={icon} />
                        </svg>
                      </span>
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-[#455269]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className={cn("mt-10 grid items-start gap-7 sm:mt-14", treatmentColumns)}>
          <section aria-labelledby="treatment-considerations-heading">
            <h4
              id="treatment-considerations-heading"
              className="mb-4 text-2xl font-bold text-[#3c3c3c]"
            >
              이런 경우 고려합니다
            </h4>
            <ul role="list" className="grid gap-2 pt-1">
              {considerations[selected].map((text) => (
                <li
                  key={text}
                  className="flex min-h-12 items-center rounded-2xl bg-[#eef3fa] px-4 py-2 text-[15px] leading-6 font-medium break-keep text-black sm:px-5 sm:text-base"
                >
                  {text}
                </li>
              ))}
            </ul>
          </section>
          <section
            key={item.title}
            aria-labelledby="treatment-faq-heading"
            className="lg:max-w-[800px]"
          >
            <h4 id="treatment-faq-heading" className="mb-4 text-2xl font-bold text-[#3c3c3c]">
              자주 묻는 질문
            </h4>
            <div className="border-t border-[#e4e8ef]">
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
                  <p className="max-w-[85ch] pr-6 pb-5 text-sm leading-[1.85] text-[#595959] sm:text-base">
                    {faq.text}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
