import type { Metadata } from "next";
import { NewsPage } from "@/features/news";
export const metadata: Metadata = { title: "소식" };
export default function Page() {
  return <NewsPage />;
}
