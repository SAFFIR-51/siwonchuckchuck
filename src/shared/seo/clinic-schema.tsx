import { site } from "@/shared/config/site";
import { absoluteUrl } from "@/shared/config/seo";
import { JsonLd } from "./json-ld";
export function ClinicSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "@id": absoluteUrl("/#clinic"),
        url: absoluteUrl("/"),
        name: site.name,
        description: site.description,
        telephone: site.phone,
        logo: absoluteUrl("/images/brand/siwon-clinic-logo.svg"),
        image: absoluteUrl("/images/clinic/reception.webp"),
        address: {
          "@type": "PostalAddress",
          streetAddress: "봉화산로 194, 신아타운 7층",
          addressLocality: "중랑구",
          addressRegion: "서울특별시",
          addressCountry: "KR",
        },
        hasMap: site.map,
        sameAs: [site.blog, site.instagram, site.map],
      }}
    />
  );
}
