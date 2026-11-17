import { NewsPage } from "@/features/news";
import { pageMetadata } from "@/shared/config/seo";
export const metadata = pageMetadata(
  "소식·공지사항·자주 묻는 질문",
  "시원척척의원의 진료 공지사항, 언론보도, 미디어룸과 방문 안내 FAQ를 확인하세요.",
  "/news",
);
export default function Page() {
  return <NewsPage />;
}
