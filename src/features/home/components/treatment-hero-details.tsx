import Image from "next/image";
import { treatmentHero } from "../model/hero";

export function TreatmentHeroDetails() {
  return (
    <aside
      aria-label="진료 및 치료 항목"
      className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3 max-[1023px]:absolute max-[1023px]:top-[66%] max-[1023px]:left-0 max-[1023px]:mt-0 max-[1023px]:w-[44%] max-[1023px]:flex-col max-[1023px]:gap-2 lg:absolute lg:top-[calc(50%-64px)] lg:left-0 lg:mt-0 lg:w-[24%] lg:max-w-[460px] lg:-translate-y-1/2 lg:flex-col lg:gap-6"
    >
      <Image
        src="/images/clinic/treatment-gold-badge.webp"
        alt="통증 진료"
        width={1254}
        height={1254}
        unoptimized
        draggable={false}
        className="size-[100px] shrink-0 object-contain max-[1023px]:hidden lg:size-[clamp(160px,24svh,270px)]"
      />
      <ul className="flex flex-1 flex-col gap-2 max-[1023px]:w-full max-[1023px]:flex-none lg:-ml-10 lg:w-[calc(100%+40px)] lg:flex-none lg:gap-5">
        {treatmentHero.items.map((item) => (
          <li
            key={item}
            className="relative isolate flex min-h-12 items-center justify-center overflow-hidden py-3 pr-4 pl-7 text-center text-sm font-extrabold text-[#20232b] max-[1023px]:min-h-9 max-[1023px]:py-2 max-[1023px]:pr-3 max-[1023px]:pl-3 max-[1023px]:text-xs lg:min-h-[clamp(64px,9svh,104px)] lg:py-4 lg:pr-5 lg:pl-12 lg:text-[clamp(24px,2.3vw,44px)]"
          >
            <svg
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 -z-10 size-full"
            >
              <defs>
                <linearGradient id={`ribbon-${item}`}>
                  <stop stopColor="#fff" stopOpacity=".18" />
                  <stop offset=".45" stopColor="#fff" stopOpacity=".74" />
                  <stop offset="1" stopColor="#fff" stopOpacity=".94" />
                </linearGradient>
              </defs>
              <path
                d="M1 1H365L399 99H1Z"
                fill={`url(#ribbon-${item})`}
                stroke="white"
                strokeOpacity=".65"
                strokeWidth="1.5"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
