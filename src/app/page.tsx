import { HomePage } from "@/features/home";
import { pageMetadata } from "@/shared/config/seo";
import { site } from "@/shared/config/site";
import { ClinicSchema } from "@/shared/seo/clinic-schema";
export const metadata = pageMetadata(
  `${site.name} | 중랑구 AK치료·정형외과 진료`,
  "중랑구 시원척척의원. AK치료와 정형외과 진료, 의료진 소개와 진료시간, 봉화산로 194 신아타운 7층 오시는 길을 안내합니다.",
  "/",
);
export default function Page() {
  return (
    <>
      <ClinicSchema />
      <HomePage />
    </>
  );
}
