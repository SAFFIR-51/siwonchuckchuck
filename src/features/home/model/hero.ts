import { routes } from "@/shared/config/routes";

export const spineHero = {
  title: ["관절은 가볍게,", "척추는 시원하게"],
  items: ["척추·관절 진료", "자세·움직임 평가", "상태에 맞는 치료"],
};

export const heroPhotos = [
  {
    name: "hero-spine-curve-sky",
    mobileName: "hero-spine-mobile",
    alt: "하늘색 배경에 척추 일부의 측면 곡선을 담은 일러스트",
    label: "시원척척의원 진료 철학",
    href: routes.orthopedicDetail,
  },
  {
    name: "hero-treatment",
    mobileName: "hero-treatment-mobile",
    alt: "허리에 손을 댄 인물이 오른쪽에 배치된 진료 안내 이미지",
    label: "통증 진료 안내",
    href: routes.painDetail,
  },
  {
    name: "shoot-reception-front",
    mobileName: "shoot-reception-front",
    alt: "시원척척의원 접수대 정면",
    label: "접수대 정면",
    href: routes.clinicDetail,
  },
];

export const treatmentHero = {
  title: ["일상을 어렵게 하는 통증,", "상태에 맞는 치료를 찾습니다"],
  subtitle: "어깨·무릎·척추관절 진료",
};
