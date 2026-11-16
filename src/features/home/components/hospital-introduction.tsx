import Image from "next/image";
import { IntroductionReveal } from "./introduction-reveal";
import { ClinicPhoto } from "@/shared/ui/clinic-photo";
import { homeContent } from "../model/content";

export function HospitalIntroduction() {
  const philosophy = homeContent.philosophy;
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white py-20 sm:py-28 lg:py-36"
    >
      <IntroductionReveal />
      <div className="mx-auto w-full max-w-[984px] px-[15px] min-[769px]:max-w-[1148px] min-[769px]:px-5 min-[1241px]:max-w-[1312px] min-[1641px]:max-w-[1476px] min-[2001px]:max-w-[1640px] min-[3200px]:max-w-[1968px]">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 xl:gap-20">
          <div className="lg:sticky lg:top-40 lg:mt-40 lg:self-start">
            <h2
              id="about-heading"
              data-intro-reveal="0"
              className="text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[50px]"
            >
              {philosophy.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div
              data-intro-reveal="100"
              className="mt-6 w-fit max-w-[min(100%,340px)] space-y-4 text-base leading-[1.85] text-[#3c3c3c] min-[769px]:max-w-full sm:text-[18px]"
            >
              <p className="max-w-full tracking-[-0.015em] min-[1641px]:grid min-[1641px]:w-fit min-[1641px]:grid-cols-[minmax(0,1fr)]">
                <span>{philosophy.description[0]} </span>
                <br className="min-[769px]:hidden" />
                <span className="wrap-break-word min-[1641px]:w-0 min-[1641px]:min-w-full">
                  {philosophy.description[1]} {philosophy.description[2]}
                </span>
              </p>
              <div className="flex w-0 min-w-full justify-end pt-2">
                <Image
                  src="/images/brand/siwon-signature.webp"
                  alt={philosophy.signature}
                  width={2172}
                  height={724}
                  className="h-auto w-[150px] sm:w-[180px]"
                />
              </div>
            </div>
          </div>
          <div className="grid items-start gap-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 sm:pb-20 lg:gap-x-6 lg:gap-y-12 lg:pb-40">
            {philosophy.cards.map((card) => (
              <article
                key={card.title}
                data-intro-reveal="0"
                className="relative isolate aspect-[10/11] overflow-hidden rounded-[24px] bg-[#e6ecf2] sm:odd:translate-y-20 lg:odd:translate-y-40"
              >
                <ClinicPhoto
                  name={card.image}
                  alt={card.alt}
                  className="absolute inset-0 size-full"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#142137]/90 via-[#142137]/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 px-5 py-6 text-white xl:px-7 xl:py-8">
                  <p className="mb-3 flex items-center gap-3 text-xs leading-relaxed font-medium xl:text-sm">
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full bg-[#173c83]"
                    />
                    {card.subtitle}
                  </p>
                  <h3 className="text-[clamp(22px,1.7vw,28px)] leading-[1.4] font-semibold tracking-[-0.025em]">
                    {card.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
