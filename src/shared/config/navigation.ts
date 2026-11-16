import { routes } from "./routes";
export const navigation = [
  {
    label: "시원척척의원 소개",
    href: routes.about,
    children: [
      { label: "병원소개", href: routes.about },
      { label: "병원둘러보기", href: routes.gallery },
      { label: "장비소개", href: routes.equipment },
      { label: "의료진 소개", href: routes.doctors },
    ],
  },
  {
    label: "AK치료",
    href: routes.ak,
    children: [
      { label: "AK통합통증치료센터", href: routes.ak },
      { label: "AK치료 소개", href: routes.akIntro },
    ],
  },
  {
    label: "진료·치료",
    href: routes.treatments,
    children: [
      { label: "진료 분야", href: routes.treatments },
      { label: "치료 안내", href: routes.treatmentGuide },
    ],
  },
  {
    label: "소식",
    href: routes.news,
    children: [
      { label: "공지사항", href: routes.newsNotice },
      { label: "언론보도", href: routes.newsPress },
      { label: "미디어룸", href: routes.newsMedia },
      { label: "FAQ", href: routes.newsFaq },
    ],
  },
  {
    label: "오시는길",
    href: routes.location,
    children: [
      { label: "위치 안내", href: routes.location },
      { label: "진료시간", href: routes.hours },
      { label: "대중교통·주차", href: routes.transport },
    ],
  },
] as const;
