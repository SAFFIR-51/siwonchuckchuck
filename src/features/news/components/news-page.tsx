"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { ClinicPhoto } from "@/shared/ui/clinic-photo";
import { Dialog } from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/cn";
import { articles, categories } from "../model/content";

type Article = (typeof articles)[number];
const categoryHashes: Record<string, string> = {
  공지사항: "notice",
  언론보도: "press",
  미디어룸: "media",
  FAQ: "faq",
};
const pageSize = 8;
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={cn("size-5 shrink-0", className)}
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}
function NewsPhoto({ article, large = false }: { article: Article; large?: boolean }) {
  return article.cardImage ? (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] bg-[#faf4e9]",
        large ? "aspect-square" : "aspect-[4/3]",
      )}
    >
      <Image
        src={`/images/clinic/${article.image}.webp`}
        alt={article.title}
        fill
        sizes={large ? "(max-width: 640px) 90vw, 640px" : "160px"}
        className="object-contain p-2"
      />
    </div>
  ) : (
    <ClinicPhoto name={article.image} alt={article.title} className="aspect-[4/3] rounded-[16px]" />
  );
}
export function NewsPage() {
  const [category, setCategory] = useState<string>("공지사항");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Article | null>(null);
  useEffect(() => {
    const syncCategory = () => {
      const hash = window.location.hash.slice(1);
      setCategory(
        Object.keys(categoryHashes).find((label) => categoryHashes[label] === hash) ?? "공지사항",
      );
      setPage(1);
    };
    const frame = requestAnimationFrame(syncCategory);
    window.addEventListener("hashchange", syncCategory);
    window.addEventListener("popstate", syncCategory);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncCategory);
      window.removeEventListener("popstate", syncCategory);
    };
  }, []);
  function selectCategory(label: string) {
    setCategory(label);
    setQuery("");
    setPage(1);
    const hash = categoryHashes[label];
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search + (hash ? `#${hash}` : ""),
    );
  }
  const search = query.trim().toLocaleLowerCase();
  const filtered = articles.filter(
    (article) =>
      article.category === category &&
      `${article.title} ${article.text}`.toLocaleLowerCase().includes(search),
  );
  const pageCount = Math.ceil(filtered.length / pageSize);
  return (
    <main id="main" className="min-h-svh bg-white pt-16 pb-24 text-[#3c3c3c] sm:pt-24 sm:pb-32">
      <Container className="max-w-[1440px]">
        <header className="mb-12 sm:mb-16">
          <h1 className="text-[34px] leading-[1.35] font-bold tracking-[-0.04em] sm:text-[50px]">
            시원척척 소식
          </h1>
          <p className="mt-5 text-base leading-[1.8] text-[#626976] sm:text-lg">
            진료 소식부터 자주 묻는 질문까지,
            <br className="sm:hidden" /> 필요한 이야기를 한곳에서 확인하세요.
          </p>
        </header>
        <div className="flex flex-col gap-6 border-b border-[#dfe4ed] lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <nav
            aria-label="소식 분류"
            className="flex [scrollbar-width:none] gap-5 overflow-x-auto sm:gap-9 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((label) => (
              <button
                key={label}
                aria-pressed={category === label}
                onClick={() => selectCategory(label)}
                className={cn(
                  "flex min-h-14 shrink-0 items-center gap-2 border-b-2 py-4 text-base font-semibold transition-colors focus-visible:outline-[#304880] sm:text-lg",
                  category === label
                    ? "border-[#304880] text-[#304880]"
                    : "border-transparent text-[#747b86] hover:text-[#304880]",
                )}
              >
                {label}
                <span className="text-xs font-medium tabular-nums sm:text-sm">
                  {articles.filter((a) => a.category === label).length}
                </span>
              </button>
            ))}
          </nav>
          <label className="mb-4 flex min-h-12 w-full items-center gap-3 rounded-full bg-[#f3f5f9] px-5 lg:w-[320px]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-5 shrink-0 text-[#304880]"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <span className="sr-only">소식 제목과 내용 검색</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="궁금한 소식을 검색해 보세요"
              className="min-h-12 w-full min-w-0 bg-transparent text-sm text-[#3c3c3c] placeholder:text-[#707783] focus-visible:outline-[#304880]"
            />
          </label>
        </div>
        <div
          className={
            query ? "flex min-h-12 items-center justify-end text-sm text-[#6b7280]" : "sr-only"
          }
        >
          <p aria-live="polite" aria-atomic="true" className="sr-only">
            {search ? "검색 결과" : category + " 소식"}{" "}
            <strong className="ml-1 font-semibold text-[#304880]">{filtered.length}</strong>건
          </p>
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              className="min-h-11 underline underline-offset-4 hover:text-[#304880]"
            >
              검색 초기화
            </button>
          )}
        </div>
        {filtered.length ? (
          <div
            className={
              category === "미디어룸"
                ? "grid gap-x-6 gap-y-10 pt-8 min-[480px]:grid-cols-2 sm:gap-y-14 sm:pt-10 lg:grid-cols-4"
                : ""
            }
          >
            {filtered.slice((page - 1) * pageSize, page * pageSize).map((article) =>
              article.category === "FAQ" ? (
                <details key={article.id} className="group border-b border-[#e4e8ef]">
                  <summary className="flex min-h-[100px] cursor-pointer list-none items-center gap-5 py-7 sm:gap-8 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span aria-hidden="true" className="text-[26px] font-semibold text-[#304880]">
                      Q.
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base leading-[1.6] font-semibold tracking-[-0.02em] group-hover:text-[#304880] sm:text-lg">
                        {article.title}
                      </h2>
                    </div>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="size-5 shrink-0 text-[#304880]"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" className="group-open:hidden" />
                    </svg>
                  </summary>
                  <div className="mb-6 rounded-[16px] bg-[#f4f6fa] px-6 py-6 sm:mx-6 sm:px-8">
                    <p className="max-w-[900px] text-base leading-[1.9] text-[#555e6c]">
                      {article.text}
                    </p>
                  </div>
                </details>
              ) : article.category === "미디어룸" ? (
                <button
                  key={article.id}
                  onClick={() => setSelected(article)}
                  aria-haspopup="dialog"
                  className="group min-w-0 text-left focus-visible:outline-[#304880]"
                >
                  <div className="relative overflow-hidden rounded-[20px] bg-[#f1f4f9]">
                    <ClinicPhoto
                      name={article.image}
                      alt={article.title}
                      className="aspect-square"
                    />
                    <span
                      className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-white"
                      aria-label="공식 블로그"
                    >
                      <Image
                        src="/images/social/blog.png"
                        alt=""
                        width={24}
                        height={24}
                        className="size-6"
                      />
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg leading-[1.6] font-semibold tracking-[-0.02em] group-hover:text-[#304880]">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#747b86]">{article.date}</p>
                </button>
              ) : (
                <button
                  key={article.id}
                  onClick={() => setSelected(article)}
                  aria-haspopup="dialog"
                  className="group grid min-h-[100px] w-full grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b border-[#dfe4ed] px-1 py-6 text-left transition-colors hover:bg-[#f8f9fc] focus-visible:outline-[#304880] sm:grid-cols-[64px_minmax(0,1fr)_110px] sm:gap-x-5 sm:px-8"
                >
                  <span className="flex min-h-9 w-16 items-center justify-center rounded-full bg-[#304880] px-2 py-2 text-xs font-semibold whitespace-nowrap text-white sm:text-sm">
                    {article.category === "공지사항" ? "공지" : article.category}
                  </span>
                  <h2 className="text-base leading-[1.6] font-semibold tracking-[-0.02em] group-hover:text-[#304880] sm:text-lg">
                    {article.title}
                  </h2>
                  <span className="col-start-2 text-sm text-[#747b86] tabular-nums sm:col-start-auto sm:text-right">
                    {article.date}
                  </span>
                </button>
              ),
            )}
          </div>
        ) : (
          <div className="border-b border-[#e4e8ef] px-6 py-20 text-center sm:py-28">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {search ? "검색 결과가 없습니다" : "새로운 소식을 준비하고 있습니다"}
            </h2>
            <p className="mt-4 text-base leading-7 text-[#626976]">
              {search
                ? "검색어를 짧게 입력하거나 다른 분류에서 찾아보세요."
                : `${category} 소식이 등록되면 이곳에서 전해 드리겠습니다.`}
            </p>
            <button
              onClick={() => {
                setQuery("");
                selectCategory("공지사항");
              }}
              className="mt-7 inline-flex min-h-12 items-center gap-8 rounded-full border border-[#304880] px-6 text-sm font-semibold text-[#304880] hover:bg-[#304880] hover:text-white"
            >
              공지사항 보기
              <Arrow />
            </button>
          </div>
        )}
        {pageCount > 1 && (
          <nav aria-label="소식 페이지" className="mt-12 flex justify-center gap-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                aria-current={page === index + 1 ? "page" : undefined}
                aria-label={`${index + 1}페이지`}
                className={cn(
                  "size-11 rounded-full",
                  page === index + 1
                    ? "bg-[#304880] text-white"
                    : "text-[#626976] hover:bg-[#f3f5f9]",
                )}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        )}
        {selected && (
          <Dialog
            title={selected.title}
            onClose={() => setSelected(null)}
            className="max-w-[800px] text-[#3c3c3c]"
          >
            <div className="mb-6 flex items-center gap-3 text-sm">
              <span className="font-semibold text-[#304880]">{selected.category}</span>
              <span className="text-[#747b86]">{selected.date}</span>
            </div>
            <div className="mx-auto mb-7 max-w-[560px]">
              <NewsPhoto article={selected} large />
            </div>
            <p className="text-base leading-[1.9] text-[#555e6c] sm:text-lg">{selected.text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4e8ef] pt-6">
              <button
                onClick={() => setSelected(null)}
                className="min-h-12 px-2 text-sm font-medium text-[#626976] hover:text-[#304880]"
              >
                목록으로 돌아가기
              </button>
              {selected.url && (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-7 rounded-full bg-[#304880] px-6 text-sm font-semibold text-white hover:bg-[#24386a]"
                >
                  공식 블로그 원문 보기
                  <Arrow />
                </a>
              )}
            </div>
          </Dialog>
        )}
      </Container>
    </main>
  );
}
