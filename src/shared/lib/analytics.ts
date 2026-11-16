export type EventName = "contact_clicked" | "reservation_clicked";
type EventProps = { source?: "header" | "home" | "footer" };
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
/** 개인정보를 받지 않는다. 분석 도구 연결 시 dataLayer를 소비한다. */
export function track(name: EventName, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push({ event: name, ...props });
}
