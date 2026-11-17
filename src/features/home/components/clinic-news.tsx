import Image from "next/image";
import Link from "next/link";
import { articles } from "@/content/news";
import { newsArticlePath, routes } from "@/shared/config/routes";
import { Container } from "@/shared/ui/container";
import { ClinicPhoto } from "@/shared/ui/clinic-photo";

export function ClinicNews() {
  const news = articles.filter((article) => article.indexable && article.url);
  return (
    <section aria-labelledby="clinic-news-title" className="bg-[#f7f8fa] py-20 sm:py-28">
      <Container className="max-w-[1720px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <h2
            id="clinic-news-title"
            className="text-[30px] leading-[1.4] font-bold tracking-[-0.03em] text-[#3c3c3c] sm:text-[50px]"
          >
            시원척척의원의
            <br />
            새로운 소식을 만나보세요.
          </h2>
          <Link
            href={routes.news}
            className="inline-flex min-h-12 items-center gap-8 rounded-full border border-[#293d7d] px-7 py-3 text-base font-semibold text-[#293d7d] transition-colors hover:bg-[#293d7d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d]"
          >
            전체 보기
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-2 sm:gap-7 [&::-webkit-scrollbar]:hidden">
          {news.map((article) => (
            <Link
              key={article.id}
              href={newsArticlePath(article)}
              className="group flex w-[85%] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#293d7d] sm:w-[340px]"
            >
              {article.cardImage ? (
                <div className="relative aspect-square overflow-hidden bg-[#faf4e9]">
                  <Image
                    src={`/images/clinic/${article.image}.webp`}
                    alt={article.title}
                    fill
                    sizes="(max-width: 399px) 85vw, 340px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <ClinicPhoto
                  name={article.image}
                  alt="시원척척의원 접수 공간"
                  className="aspect-square"
                />
              )}
              <div className="flex flex-1 flex-col items-start p-5">
                <span className="rounded-md bg-[#edf1fa] px-3 py-1 text-xs font-semibold text-[#293d7d]">
                  {article.category}
                </span>
                <h3 className="mt-3 text-lg leading-relaxed font-semibold text-[#3c3c3c] group-hover:text-[#293d7d]">
                  {article.title}
                </h3>
                <time
                  dateTime={article.date.replaceAll(".", "-")}
                  className="mt-auto pt-6 text-sm text-[#697586] tabular-nums"
                >
                  {article.date}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
