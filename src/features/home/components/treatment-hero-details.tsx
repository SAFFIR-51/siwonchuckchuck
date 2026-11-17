import Image from "next/image";
import { treatmentHero } from "../model/hero";

export function TreatmentHeroDetails() {
  return (
    <aside
      aria-label="진료 및 치료 항목"
      className="absolute top-[7.5%] left-0 flex w-[55%] max-w-[245px] flex-col items-center lg:top-[calc(50%-64px)] lg:w-[24%] lg:max-w-[460px] lg:-translate-y-1/2 lg:gap-6"
    >
      <Image
        src="/images/clinic/treatment-gold-badge.webp"
        alt="통증 진료"
        width={1254}
        height={1254}
        unoptimized
        draggable={false}
        className="hidden shrink-0 object-contain lg:block lg:size-[clamp(160px,24svh,270px)]"
      />
      <ul className="flex w-full flex-col gap-2 lg:-ml-10 lg:w-[calc(100%+40px)] lg:gap-5">
        {treatmentHero.items.map((item) => (
          <li
            key={item}
            className="relative isolate flex min-h-[clamp(30px,4.7svh,48px)] items-center justify-center overflow-hidden py-1.5 pr-3 pl-1 text-center text-[clamp(13px,4.2vw,18px)] leading-tight font-extrabold break-keep text-[#20232b] lg:min-h-[clamp(64px,9svh,104px)] lg:py-4 lg:pr-5 lg:pl-12 lg:text-[clamp(24px,2.3vw,44px)] lg:leading-normal"
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
