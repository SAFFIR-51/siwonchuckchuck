import Image from "next/image";
import { IntroductionReveal } from "./introduction-reveal";
import { ClinicPhoto } from "@/shared/ui/clinic-photo";
import { homeContent } from "../model/content";

export function HospitalIntroduction() {
  const philosophy = homeContent.philosophy;
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-20 sm:py-24">
      <IntroductionReveal />
      <div className="mx-auto w-full max-w-[984px] px-[15px] min-[769px]:max-w-[1148px] min-[769px]:px-5 min-[1241px]:max-w-[1312px] min-[1641px]:max-w-[1476px] min-[2001px]:max-w-[1640px] min-[3200px]:max-w-[1968px]">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 xl:gap-20">
          <div data-about-copy className="lg:sticky lg:top-40 lg:mt-24 lg:self-start">
            <h2
              id="about-heading"
              className="text-[30px] leading-[1.4] font-bold tracking-[-0.035em] text-[#3c3c3c] sm:text-[40px] lg:text-[50px]"
            >
              {philosophy.title.map((line) => (
                <span
                  key={line}
                  data-reveal-text
                  className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
                >
                  <span data-reveal-inner className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <div className="mt-6 w-fit max-w-[min(100%,340px)] space-y-4 text-base leading-[1.85] text-[#3c3c3c] min-[769px]:max-w-full sm:text-[18px]">
              <p
                data-reveal-text
                className="max-w-full tracking-[-0.015em] min-[1641px]:grid min-[1641px]:w-fit min-[1641px]:grid-cols-[minmax(0,1fr)]"
              >
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
                  data-signature
                  width={2172}
                  height={724}
                  className="h-auto w-[150px] sm:w-[180px]"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 items-start gap-x-3 gap-y-4 pb-10 sm:gap-x-5 sm:gap-y-8 sm:pb-20 lg:gap-x-6 lg:gap-y-12 lg:pb-24">
            {philosophy.cards.map((card) => (
              <article
                key={card.title}
                data-converge
                className="relative isolate grid aspect-[4/5] content-end overflow-hidden rounded-2xl bg-[#e6ecf2] odd:translate-y-10 sm:block sm:aspect-[10/11] sm:rounded-[24px] sm:odd:translate-y-20 lg:odd:translate-y-24"
              >
                <div className="absolute inset-0">
                  <ClinicPhoto name={card.image} alt={card.alt} className="size-full" />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#142137]/90 via-[#142137]/35 to-transparent sm:via-[#142137]/10"
                />
                <div className="relative mt-12 px-3 py-3.5 text-white sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0 sm:px-5 sm:py-6 xl:px-7 xl:py-8">
                  <p className="mb-1.5 flex items-center gap-1.5 text-[11px] leading-snug font-medium sm:mb-3 sm:gap-3 sm:text-xs sm:leading-relaxed xl:text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-[#173c83] sm:size-2"
                    />
                    {card.subtitle}
                  </p>
                  <h3 className="text-base leading-[1.4] font-semibold tracking-[-0.025em] break-keep sm:text-[clamp(22px,1.7vw,28px)]">
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
