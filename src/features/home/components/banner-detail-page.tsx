import Image from "next/image";
import Link from "next/link";
import { routes } from "@/shared/config/routes";
import { site } from "@/shared/config/site";
import { ContactLink } from "@/shared/ui/contact-link";
import { bannerDetails, careJourney, detailClinics, visitChecklist } from "../model/banner-details";
import { homeContent, spaces, treatments } from "../model/content";

const sectionClass = "scroll-mt-44 py-16 sm:py-20 lg:py-24";
const containerClass = "mx-auto max-w-[1392px] px-5 sm:px-8 lg:px-10";
const outlineLink =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#d7dfeb] px-6 text-sm font-semibold text-[#293d7d] transition-colors hover:bg-[#edf2fa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d]";
type Detail = (typeof bannerDetails)[number];

function SectionTitle({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <div className="mb-9 max-w-3xl sm:mb-12">
      <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-[#7a879a]">{label}</p>
      <h2 className="text-[28px] leading-[1.4] font-bold tracking-[-0.035em] sm:text-[36px] lg:text-[40px]">
        {title}
      </h2>
      {text && <p className="mt-5 text-sm leading-[1.9] text-[#6c7582] sm:text-base">{text}</p>}
    </div>
  );
}

function OrthopedicContent() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {detailClinics.map((clinic, index) => (
        <article
          key={clinic.id}
          id={"detail-" + clinic.id}
          className="scroll-mt-44 overflow-hidden rounded-[24px] border border-[#e2e7ef] bg-white sm:rounded-[32px]"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative aspect-[3/2] overflow-hidden bg-[#eaf2fa] lg:aspect-auto">
              <Image
                src={clinic.image}
                alt={clinic.imageAlt}
                fill
                sizes="(min-width: 1392px) 525px, (min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>
            <div className="p-6 sm:p-9 lg:p-10">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold text-[#7a879a]">
                <span className="text-[#293d7d]">0{index + 1}</span>
                <span>{clinic.tags.join(" · ")}</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{clinic.title}</h3>
              <p className="mt-4 text-sm leading-[1.9] text-[#626b77] sm:text-base">
                {clinic.intro}
              </p>
              <ul className="mt-6 space-y-3 border-t border-[#e5eaf1] pt-6">
                {clinic.symptoms.map((symptom) => (
                  <li key={symptom} className="flex gap-3 text-sm leading-[1.8]">
                    <span aria-hidden="true" className="text-[#7e96be]">
                      ✓
                    </span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-[#e2e7ef] p-6 sm:p-9 lg:p-10">
            <h4 className="mb-5 text-base font-semibold">진료에서 살펴보는 내용</h4>
            <div className="grid gap-6 md:grid-cols-3">
              {clinic.topics.map((topic) => (
                <div key={topic.title}>
                  <h5 className="text-sm font-semibold text-[#293d7d] sm:text-base">
                    {topic.title}
                  </h5>
                  <p className="mt-2 text-sm leading-[1.9] text-[#727b88]">{topic.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 rounded-2xl bg-[#f3f6fa] p-5 text-sm leading-[1.9] text-[#626b77]">
              <strong className="mb-1 block font-semibold text-[#303c50]">
                방문 전 참고해 주세요
              </strong>
              {clinic.preparation}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function PainContent() {
  return (
    <>
      <div className="mb-8 rounded-2xl border border-[#dfe6ef] bg-[#f3f6fa] p-5 text-sm leading-[1.9] text-[#626b77]">
        치료마다 기대할 수 있는 변화와 주의사항이 다릅니다. 아래 설명은 진료를 이해하기 위한
        안내이며, 실제 적용 여부와 횟수·주기는 진찰 후 결정합니다.
      </div>
      <div className="grid items-start gap-5 xl:grid-cols-2">
        {treatments.map((treatment, index) => (
          <article
            key={treatment.slug}
            className="min-w-0 rounded-[24px] border border-[#e2e7ef] bg-white p-5 sm:p-7"
          >
            <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[128px_minmax(0,1fr)] sm:gap-6">
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#edf1f5]">
                <Image
                  src={
                    treatment.image.startsWith("/")
                      ? treatment.image
                      : `/images/treatments/portrait/${treatment.image}.webp`
                  }
                  alt={treatment.imageAlt}
                  fill
                  sizes="(min-width: 640px) 128px, 88px"
                  className="object-contain"
                />
              </div>
              <div>
                {treatment.image.includes("-generated") && (
                  <p className="mb-2 text-xs text-[#6a7585]">AI 생성 참고 이미지</p>
                )}
                <p className="mb-3 text-xs font-semibold tracking-wider text-[#8a99ad]">
                  TREATMENT {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl leading-[1.4] font-bold tracking-tight sm:text-2xl">
                  {treatment.name}
                </h3>
                <p className="mt-3 text-xs leading-[1.8] text-[#727b88] sm:text-sm">
                  {treatment.lead}
                </p>
              </div>
            </div>
            <details className="group mt-5 border-t border-[#e5eaf1] pt-2">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-semibold text-[#293d7d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d] [&::-webkit-details-marker]:hidden">
                치료 설명 및 주의사항
                <span
                  aria-hidden="true"
                  className="text-xl font-normal transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="space-y-4 pb-2 text-sm leading-[1.9] text-[#626b77]">
                <p>{treatment.text}</p>
                <p>{treatment.emphasis}</p>
                <div className="rounded-xl bg-[#f4f6f9] p-4">
                  <h4 className="mb-2 font-semibold text-[#303c50]">치료 전 알아두세요</h4>
                  <p>{treatment.caution}</p>
                </div>
              </div>
            </details>
          </article>
        ))}
      </div>
    </>
  );
}

function ClinicContent() {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-3">
        {homeContent.directions.map((direction, index) => (
          <article key={direction.title} className="rounded-[24px] bg-[#f3f6fa] p-6 sm:p-8">
            <p className="mb-8 text-sm font-semibold text-[#8b9db8]">0{index + 1}</p>
            <h3 className="text-xl leading-[1.5] font-semibold tracking-tight">
              {direction.title}
            </h3>
            <p className="mt-4 text-sm leading-[1.9] text-[#727b88]">{direction.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-16 sm:mt-20">
        <SectionTitle
          label="OUR SPACE"
          title="진료와 검사가 이어지는 공간"
          text="실제 원내 촬영 사진으로 진료 공간을 미리 확인해 보세요."
        />
        <div className="grid gap-7 md:grid-cols-3">
          {spaces
            .filter((space) => space.name !== "shoot-reception-front")
            .map((space) => (
              <figure key={space.name}>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#edf1f5]">
                  <Image
                    src={`/images/clinic/${space.name}.webp`}
                    alt={"시원척척의원 " + space.title}
                    fill
                    sizes="(min-width: 1392px) 420px, (min-width: 768px) 33vw, calc(100vw - 40px)"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-4">
                  <h3 className="text-lg font-semibold">{space.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[#727b88]">{space.description}</p>
                </figcaption>
              </figure>
            ))}
        </div>
      </div>
    </>
  );
}

export function BannerDetailPage({ detail }: { detail: Detail }) {
  return (
    <main id="main" className="bg-white text-[#303c50]">
      <section className="overflow-hidden bg-[#edf2f8]">
        <div className={containerClass + " pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pb-20"}>
          <nav
            aria-label="현재 위치"
            className="mb-8 flex items-center gap-3 text-xs text-[#76849a] sm:mb-12"
          >
            <Link href={routes.home} className="min-h-11 content-center hover:text-[#293d7d]">
              홈
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{detail.title}</span>
          </nav>
          <div className="grid items-center gap-9 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-[#7a8ba6]">
                {detail.english}
              </p>
              <h1 className="mt-5 text-[36px] leading-[1.25] font-bold tracking-[-0.045em] text-[#293d7d] sm:text-[48px] xl:text-[58px]">
                {detail.title}
              </h1>
              <p className="mt-6 max-w-lg text-xl leading-[1.5] font-medium tracking-tight sm:text-2xl">
                {detail.headline}
              </p>
              <p className="mt-5 max-w-xl text-sm leading-[1.9] text-[#6c7582] sm:text-base">
                {detail.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ContactLink showArrow={false} tone="navy" className="px-6">
                  진료 문의 {site.phone}
                </ContactLink>
                <a href="#detail-overview" className={outlineLink}>
                  자세히 알아보기 ↓
                </a>
              </div>
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] bg-[#dae5f0] sm:rounded-[32px]">
              <Image
                src={detail.image}
                alt={detail.imageAlt}
                fill
                preload
                sizes="(min-width: 1392px) 620px, (min-width: 1024px) 48vw, calc(100vw - 40px)"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <nav aria-label="진료 상세 페이지" className="border-b border-[#e2e7ef] bg-white">
        <div className={containerClass + " grid grid-cols-3"}>
          {bannerDetails.map((page, index) => (
            <Link
              key={page.slug}
              href={page.path}
              aria-current={page.slug === detail.slug ? "page" : undefined}
              className={
                "flex min-h-16 flex-col items-center justify-center gap-1 border-b-2 px-1 py-4 text-center text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#293d7d] sm:min-h-20 sm:flex-row sm:gap-3 sm:text-base " +
                (page.slug === detail.slug
                  ? "border-[#293d7d] text-[#293d7d]"
                  : "border-transparent text-[#8893a3] hover:text-[#293d7d]")
              }
            >
              <span className="text-[10px] opacity-60 sm:text-xs">0{index + 1}</span>
              {page.title}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-b border-[#e8edf4] bg-white">
        <nav
          aria-label="페이지 안에서 이동"
          className={
            containerClass +
            " grid grid-cols-4 gap-2 text-center text-[11px] sm:flex sm:gap-9 sm:text-sm sm:whitespace-nowrap"
          }
        >
          {[
            ["#detail-overview", "상세 안내"],
            ["#detail-process", "진료 과정"],
            ["#detail-faq", "자주 묻는 질문"],
            ["#detail-visit", "방문 준비"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="flex min-h-14 items-center justify-center py-3 font-medium text-[#6c7582] hover:text-[#293d7d] focus-visible:outline-2 focus-visible:outline-[#293d7d]"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <section id="detail-overview" className={containerClass + " " + sectionClass}>
        <SectionTitle
          label={detail.slug === "clinic" ? "OUR APPROACH" : "CARE GUIDE"}
          title={detail.overviewTitle}
          text={detail.overviewText}
        />
        {detail.slug === "orthopedic" ? (
          <OrthopedicContent />
        ) : detail.slug === "pain" ? (
          <PainContent />
        ) : (
          <ClinicContent />
        )}
      </section>
      <section id="detail-process" className={sectionClass + " bg-[#f3f6fa]"}>
        <div className={containerClass}>
          <SectionTitle label="YOUR CARE JOURNEY" title="이야기를 듣는 것부터, 일상의 관리까지." />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careJourney.map((step, index) => (
              <li key={step.title} className="border-t border-[#d3ddec] pt-5">
                <span className="text-sm font-semibold text-[#8b9db8]">STEP 0{index + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-[1.9] text-[#727b88]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="detail-faq" className={containerClass + " " + sectionClass}>
        <SectionTitle label="QUESTIONS & ANSWERS" title="방문 전, 궁금한 점을 확인하세요." />
        <div className="divide-y divide-[#e0e6ef] border-y border-[#e0e6ef]">
          {detail.faqs.map((faq) => (
            <details key={faq.title} className="group">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-semibold outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#293d7d] sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>
                  <span aria-hidden="true" className="mr-4 text-[#91a1ba]">
                    Q.
                  </span>
                  {faq.title}
                </span>
                <span
                  aria-hidden="true"
                  className="text-2xl font-normal text-[#91a1ba] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-4xl pb-7 text-sm leading-[1.9] text-[#727b88] sm:pl-10 sm:text-base">
                {faq.text}
              </p>
            </details>
          ))}
        </div>
      </section>
      <section id="detail-visit" className={containerClass + " scroll-mt-44 pb-16 sm:pb-24"}>
        <div className="grid gap-8 rounded-[24px] bg-[#293d7d] p-6 text-white sm:rounded-[32px] sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-white/50">
              BEFORE YOUR VISIT
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              처음 방문하시나요?
            </h2>
            <ul className="mt-6 space-y-3">
              {visitChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-[1.8] text-white/75">
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <ContactLink tone="light" className="border border-white/20" showArrow={false}>
              전화 문의 {site.phone}
            </ContactLink>
            <Link
              href={routes.location}
              className="flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              진료시간 · 오시는 길 ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="border-t border-[#e2e7ef] bg-[#f8fafc] py-12 sm:py-16">
        <div className={containerClass}>
          <h2 className="mb-6 text-lg font-semibold">함께 확인해 보세요</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {bannerDetails
              .filter((page) => page.slug !== detail.slug)
              .map((page) => (
                <Link
                  key={page.slug}
                  href={page.path}
                  className="group flex min-h-24 items-center justify-between gap-5 rounded-2xl border border-[#e2e7ef] bg-white px-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d]"
                >
                  <div>
                    <p className="text-[10px] font-semibold tracking-wider text-[#91a1ba]">
                      {page.english}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold group-hover:text-[#293d7d]">
                      {page.title}
                    </h3>
                  </div>
                  <span aria-hidden="true" className="text-[#91a1ba]">
                    ↗
                  </span>
                </Link>
              ))}
          </div>
          <Link href={detail.back} className={outlineLink + " mt-7"}>
            {detail.backLabel} ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
