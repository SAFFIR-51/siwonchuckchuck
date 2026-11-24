import Link from "next/link";
import Image from "next/image";
import { Container } from "@/shared/ui/container";
import { routes } from "@/shared/config/routes";
import { articles } from "../model/content";
import { getNewsVisual } from "@/content/news";
export function NewsArticle({ article }: { article: (typeof articles)[number] }) {
  const visual = getNewsVisual(article);
  return (
    <main id="main" className="min-h-svh bg-white py-20 text-[#3c3c3c] sm:py-28">
      <Container className="max-w-[1000px]">
        <nav aria-label="현재 위치" className="mb-10 flex gap-3 text-sm text-[#626976]">
          <Link href={routes.home}>홈</Link>
          <span>/</span>
          <Link href={routes.news}>소식</Link>
          <span>/</span>
          <span>{article.category}</span>
        </nav>
        <article>
          <header className="border-b border-[#dfe4ed] pb-8">
            <p className="mb-4 text-sm text-[#304880]">{article.category}</p>
            <h1 className="text-3xl leading-[1.4] font-bold break-keep sm:text-[42px]">
              {article.title}
            </h1>
            <p className="mt-5 text-sm text-[#747b86]">
              {article.url ? "공식 블로그 원문 게시일 · " : ""}
              {article.date}
            </p>
          </header>
          <p className="mt-10 text-lg leading-[1.9] break-keep">{article.text}</p>
          {article.category !== "FAQ" && (
            <figure className="mt-10">
              <Image
                src={visual.src}
                alt={visual.alt}
                width={visual.width}
                height={visual.height}
                sizes={`(max-width: 640px) calc(100vw - 48px), ${Math.min(800, visual.width)}px`}
                style={{ maxWidth: Math.min(800, visual.width) }}
                className="mx-auto h-auto w-full rounded-2xl"
              />
              {visual.caption && (
                <figcaption className="mt-4 text-center text-xs leading-[1.8] text-[#7a8290]">
                  {visual.caption}
                </figcaption>
              )}
            </figure>
          )}
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center text-[#304880] underline underline-offset-4"
            >
              공식 블로그 원문 보기
            </a>
          )}
        </article>
        <div className="mt-12 border-t border-[#dfe4ed] pt-8">
          <Link
            href={{ pathname: routes.news, hash: article.section }}
            className="inline-flex min-h-12 items-center rounded-full border border-[#304880] px-7 text-[#304880]"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </Container>
    </main>
  );
}
