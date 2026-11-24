import Image from "next/image";
import { akExplanation, akSummary } from "../model/content";
import { AkMotion } from "./ak-motion";

export function AkSection() {
  return (
    <>
      <section
        id="ak"
        aria-labelledby="ak-heading"
        className="bg-white py-20 text-[#303c50] sm:py-24"
      >
        <AkMotion />
        <div className="mx-auto grid max-w-[1312px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-20">
          <div data-ak-group>
            <p className="mb-5 text-sm font-semibold tracking-[0.12em] text-[#63768f]">
              AK INTEGRATED CARE
            </p>
            <h2
              id="ak-heading"
              className="text-3xl leading-[1.4] font-bold tracking-tight sm:text-[40px]"
            >
              {akSummary.centerTitle}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-[#626b77] sm:text-lg">
              {akSummary.centerText}
            </p>
          </div>
          <div data-ak-reveal className="relative aspect-[3/2] overflow-hidden rounded-3xl">
            <Image
              src="/images/clinic/shoot-ak-explanation-edited.webp"
              alt="원장이 척추 모형으로 진료 내용을 설명하는 촬영 사진 · 환자 모습 편집"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section
        id="ak-intro"
        aria-labelledby="ak-intro-heading"
        className="bg-[#f3f5f8] py-20 text-[#303c50] sm:py-24"
      >
        <div className="mx-auto grid max-w-[1312px] gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.12em] text-[#63768f]">ABOUT AK</p>
            <h2
              id="ak-intro-heading"
              className="text-3xl leading-[1.4] font-bold tracking-tight sm:text-[40px]"
            >
              {akSummary.introTitle}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.9] text-[#626b77] sm:text-lg">
              {akSummary.introText}
            </p>
          </div>
          <ol className="divide-y divide-[#dce2ea] border-y border-[#dce2ea]">
            {akExplanation
              .filter((_, index) => [0, 3, 4].includes(index))
              .map((item, index) => (
                <li key={item.title} className="flex gap-5 py-6">
                  <span className="text-sm font-semibold text-[#7b8ba2]">0{index + 1}</span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-[1.8] text-[#626b77] sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </section>
    </>
  );
}
