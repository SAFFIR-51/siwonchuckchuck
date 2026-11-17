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
    label: "자가진단",
    href: routes.selfCheck,
    children: [
      { label: "손/손목", href: routes.selfCheckHand },
      { label: "목", href: routes.selfCheckNeck },
      { label: "어깨", href: routes.selfCheckShoulder },
    ],
  },
  {
    label: "진료·치료",
    href: routes.treatments,
    children: [
      {
        label: "진료 분야",
        href: routes.treatments,
        children: [
          { label: "어깨 클리닉", href: routes.clinicShoulder },
          { label: "무릎 클리닉", href: routes.clinicKnee },
          { label: "척추관절 클리닉", href: routes.clinicSpine },
          { label: "성장 클리닉", href: routes.clinicGrowth },
        ],
      },
      {
        label: "치료 안내",
        href: routes.treatmentGuide,
        children: [
          { label: "프롤로", href: routes.treatmentProlo },
          { label: "PRP", href: routes.treatmentPrp },
          { label: "체외충격파", href: routes.treatmentShockwave },
          { label: "C-arm 주사", href: routes.treatmentCArm },
          { label: "초음파 주사", href: routes.treatmentUltrasound },
          { label: "턱관절 교정", href: routes.treatmentJaw },
          { label: "족부교정", href: routes.treatmentFoot },
          { label: "수액", href: routes.treatmentIv },
        ],
      },
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
