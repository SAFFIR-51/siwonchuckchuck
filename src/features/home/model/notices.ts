export const notices = [
  {
    id: "november-2026",
    title: "11월 진료 안내",
    image: "/images/notices/november-2026-hd.webp",
    original: "/images/notices/november-2026-hd.png",
    width: 1254,
    height: 1254,
    alt: "시원척척의원 2026년 11월 진료 안내. 11월은 휴진없이 정상진료입니다. 내원 및 예약에 참고하시어 이용에 불편 없으시길 바랍니다. 11월 1일은 일요일, 30일은 월요일입니다.",
    expires: "2026-11-30",
  },
  {
    id: "clinic-introduction",
    title: "시원척척의원 소개",
    image: "/images/notices/clinic-introduction-navy.webp",
    original: "/images/notices/clinic-introduction-navy.png",
    width: 1254,
    height: 1254,
    alt: "시원척척의원 의료진 소개. 통증의 원인까지 꿰뚫다. 관절은 가볍게, 척추는 시원하게! 경력은 길게, 치료는 정밀하게!",
    expires: null,
  },
] as const;

export const noticeStorageKey = "siwon:notices:2026-11:v1:hidden-date";

export function koreaDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return ["year", "month", "day"]
    .map((type) => parts.find((part) => part.type === type)?.value)
    .join("-");
}
