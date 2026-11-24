import { routes } from "@/shared/config/routes";
import { clinicDetails } from "./clinic-details";
import { clinics, homeContent, treatments } from "./content";

export const bannerDetails = [
  {
    slug: "orthopedic",
    path: routes.orthopedicDetail,
    title: "척추·관절 진료",
    english: "SPINE & JOINT CARE",
    headline: "익숙한 움직임을, 다시 편안하게.",
    intro: "불편한 움직임과 일상의 변화를 살피고, 상태에 맞는 치료 방향을 함께 찾습니다.",
    image: "/images/clinic/shoot-ak-explanation-edited.webp",
    imageAlt: "척추 모형으로 진료 내용을 설명하는 촬영 사진 · 환자 모습 편집",
    back: routes.treatments,
    backLabel: "메인에서 진료 분야 보기",
    overviewTitle: "불편한 부위부터 살펴보세요.",
    overviewText:
      "같은 부위의 통증도 느껴지는 순간과 양상이 다릅니다. 일상 속 불편함과 움직임의 변화를 함께 확인합니다.",
    faqs: [
      {
        title: "처음 방문할 때 무엇을 준비하면 좋을까요?",
        text: "통증이 시작된 시점, 다친 경험, 반복하는 작업이나 운동을 알려주세요. 기존 영상과 검사 결과가 있다면 함께 지참해 주세요.",
      },
      { title: "성장 상담은 어떤 내용을 확인하나요?", text: clinicDetails["성장 클리닉"].care },
      {
        title: "진료 분야별 안내는 어디에서 볼 수 있나요?",
        text: "이 페이지의 각 진료 분야에서 주요 증상과 진료 시 살펴보는 내용을 확인하실 수 있습니다. 실제 검사와 치료의 필요성은 진찰 후 안내합니다.",
      },
    ],
  },
  {
    slug: "pain",
    path: routes.painDetail,
    title: "통증 진료 안내",
    english: "PERSONALIZED PAIN CARE",
    headline: "지금의 상태에 맞는 치료를 함께 찾습니다.",
    intro: "문진과 진찰, 필요한 검사를 통해 상태를 확인하고 치료 방법을 상담합니다.",
    image: "/images/clinic/shoot-ultrasound-edited.webp",
    imageAlt: "원내 초음파 검사 장면 · 환자 모습 편집",
    back: routes.treatmentGuide,
    backLabel: "메인에서 치료 안내 보기",
    overviewTitle: "치료를 결정하기 전에, 충분히 이해하도록.",
    overviewText:
      "치료의 목적과 과정을 먼저 확인해 보세요. 적용 여부와 치료 계획은 진찰 결과와 개인의 상태에 따라 달라집니다.",
    faqs: [
      treatments[0].faqs[0],
      treatments[1].faqs[0],
      {
        title: "진료 전에 복용 중인 약을 알려야 하나요?",
        text: "복용 약물과 알레르기, 출혈 관련 병력을 의료진에게 알려주세요. 기존 검사와 치료 기록도 함께 지참하시면 도움이 됩니다.",
      },
    ],
  },
  {
    slug: "clinic",
    path: routes.clinicDetail,
    title: "시원척척의원 소개",
    english: "MEET SIWON CLINIC",
    headline: "몸의 움직임을 세심하게, 이야기를 소중하게.",
    intro: homeContent.philosophy.description.join(" "),
    image: "/images/clinic/shoot-reception-wide.webp",
    imageAlt: "시원척척의원 접수 공간 촬영 사진",
    back: routes.gallery,
    backLabel: "메인에서 병원 둘러보기",
    overviewTitle: "충분히 듣고, 세심하게 살핍니다.",
    overviewText:
      "통증이 시작된 순간부터 일상에서 느끼는 작은 불편함까지 귀 기울입니다. 진료의 방향과 과정을 이해하기 쉽게 설명하겠습니다.",
    faqs: [
      {
        title: "진료시간과 위치는 어디에서 확인하나요?",
        text: "페이지 아래 ‘진료시간 및 오시는 길’에서 운영시간과 주소를 확인하실 수 있습니다. 공휴일·임시 휴진은 방문 전 전화 또는 진료 소식으로 확인해 주세요.",
      },
      {
        title: "주차장을 이용할 수 있나요?",
        text: "건물 무료주차를 이용하실 수 있습니다. 주차 이용은 접수처에 문의해 주세요.",
      },
      {
        title: "방문 전에 문의하고 싶어요.",
        text: "대표번호로 전화해 진료와 방문 안내를 받으실 수 있습니다. 네이버 플레이스에서도 위치와 병원 안내를 확인하실 수 있습니다.",
      },
    ],
  },
] as const;

export const detailClinics = clinics.map((clinic) => ({
  ...clinic,
  ...clinicDetails[clinic.title],
}));
export const careJourney = [
  {
    title: "이야기를 듣습니다",
    text: "불편함이 시작된 시점과 일상에서 어려운 움직임을 확인합니다.",
  },
  { title: "상태를 살핍니다", text: "문진과 진찰을 바탕으로 필요한 검사를 안내합니다." },
  { title: "방향을 함께 정합니다", text: "상태에 맞는 치료의 필요성과 과정을 설명합니다." },
  { title: "일상까지 이어갑니다", text: "경과를 살피며 생활 속 관리 방법을 함께 이야기합니다." },
] as const;
export const visitChecklist = [
  "언제부터, 어떤 움직임에서 불편한지 정리해 주세요.",
  "이전 검사·영상과 치료 기록이 있다면 함께 지참해 주세요.",
  "복용 약물과 알레르기, 기존 질환을 알려주세요.",
] as const;
