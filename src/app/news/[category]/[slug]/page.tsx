import { notFound } from "next/navigation";
import { articles } from "@/content/news";
import { NewsArticle } from "@/features/news";
import { pageMetadata, absoluteUrl } from "@/shared/config/seo";
import { newsArticlePath } from "@/shared/config/routes";
import { JsonLd } from "@/shared/seo/json-ld";
// Resolve the article before streaming so unknown URLs return a real HTTP 404.
export const instant = false;
type Props = { params: Promise<{ category: string; slug: string }> };
export function generateStaticParams() {
  return articles.map((a) => ({ category: a.section, slug: a.slug }));
}
async function getArticle(params: Props["params"]) {
  const { category, slug } = await params;
  const article = articles.find((a) => a.section === category && a.slug === slug);
  if (!article) notFound();
  return article;
}
export async function generateMetadata({ params }: Props) {
  const a = await getArticle(params);
  return pageMetadata(a.title, a.text, newsArticlePath(a), a.indexable);
}
export default async function Page({ params }: Props) {
  const a = await getArticle(params);
  const url = absoluteUrl(newsArticlePath(a));
  return (
    <>
      {url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            url,
            name: a.title,
            description: a.text,
            inLanguage: "ko-KR",
            ...(a.url ? { citation: a.url } : {}),
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "홈", item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "소식", item: absoluteUrl("/news") },
                { "@type": "ListItem", position: 3, name: a.title, item: url },
              ],
            },
          }}
        />
      )}
      <NewsArticle article={a} />
    </>
  );
}
