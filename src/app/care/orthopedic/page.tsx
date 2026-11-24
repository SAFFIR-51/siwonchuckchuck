import { BannerDetailPage, bannerDetails } from "@/features/home";
import { pageMetadata } from "@/shared/config/seo";

const detail = bannerDetails[0];
export const metadata = pageMetadata(detail.title, detail.intro, detail.path);
export default function Page() {
  return <BannerDetailPage detail={detail} />;
}
