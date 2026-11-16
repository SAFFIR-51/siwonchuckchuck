import Image from "next/image";
import { akExplanation } from "../model/content";

const stages = [
  {
    title: "자세와 움직임 확인",
    image: "ak-posture-assessment",
    text: "서 있는 자세와 보행, 관절의 움직임을 살펴 일상에서 느끼는 불편함을 확인합니다.",
  },
  {
    title: "근육 반응 평가",
    image: "ak-muscle-response-v2",
    text: "정해진 자세에서 저항에 대한 근육의 반응을 살피고, 다른 진찰 소견과 함께 참고합니다.",
  },
  {
    title: "종합적인 진료 계획",
    image: "ak-movement-review",
    text: "문진과 진찰, 필요한 검사 결과를 종합해 상태에 맞는 치료와 생활 속 관리 방향을 설명합니다.",
  },
];

const container = "mx-auto w-full max-w-[1640px] px-6 sm:px-10 min-[2001px]:px-0";

export function AkSection() {
  return (
    <section
      id="ak"
      aria-labelledby="ak-heading"
      className="bg-white py-24 text-[#3c3c3c] sm:py-32 lg:py-40"
    >
      <div className={container}>
        <h2
          id="ak-heading"
          className="text-center text-[30px] leading-[1.4] font-bold tracking-[-0.035em] sm:text-[40px] lg:text-[50px]"
        >
          몸의 연결을 살피는
          <br />
          AK통합통증치료센터
        </h2>
        <p className="mt-10 text-left text-xl leading-[1.7] font-medium break-keep text-[#273f79] sm:mt-14 sm:text-2xl lg:max-w-[60%]">
          불편한 움직임부터 평소의 생활 습관까지,
          <br className="hidden sm:block" /> 상태를 이해하는 것에서 치료 방향을 찾습니다.
        </p>
        <p className="mt-6 text-left text-base leading-[1.9] break-keep text-[#626b77] sm:text-lg lg:max-w-[60%]">
          같은 부위의 통증이라도 시작된 과정과 생활 습관은 저마다 다릅니다. 시원척척의원은 환자분의
          이야기를 충분히 듣고, 어떤 자세와 움직임에서 불편함을 느끼는지 세심하게 살핍니다. AK는
          Applied Kinesiology, 응용근신경학을 뜻합니다.
          <br />
          근육의 반응과 움직임을 살피는 접근을 진료에 참고하며, 문진과 진찰, 필요한 검사 결과를 함께
          고려해 상태를 평가합니다. 한 분 한 분의 상태에 맞는 치료와 관리 방향을 함께 찾고, 진찰
          결과와 치료 과정을 이해하기 쉽게 설명하겠습니다. 더 편안한 일상을 향한 걸음에
          시원척척의원이 함께하겠습니다.
        </p>
        <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[24px] sm:mt-14 sm:aspect-[2.3/1] lg:mt-16 lg:rounded-[32px]">
          <Image
            src="/images/clinic/ak-main-assessment.webp"
            alt="자세를 살피는 진료 장면과 척추 영상 모니터를 표현한 AI 생성 이미지"
            fill
            sizes="(max-width: 1640px) 100vw, 1640px"
            className="object-cover object-[center_44%]"
          />
        </div>
      </div>

      <div
        id="ak-intro"
        className="mt-20 scroll-mt-28 bg-white py-16 sm:mt-28 sm:py-24 lg:mt-36 lg:py-28"
      >
        <div className={container + " grid items-start gap-10 lg:grid-cols-2 lg:gap-20"}>
          <div>
            <h3 className="text-[30px] leading-[1.45] font-bold tracking-[-0.035em] sm:text-[40px] lg:text-[50px]">
              AK치료는
              <br />
              몸을 어떻게 살필까요?
            </h3>
            <p className="mt-6 text-base leading-[1.9] break-keep text-[#626b77] sm:text-lg">
              시원척척의원은 통증 부위뿐 아니라
              <br />
              자세와 움직임, 일상의 습관을 함께 살핍니다.
              <br />
              진찰과 검사를 바탕으로 치료 방향을 찾습니다.
            </p>
          </div>
          <ol className="space-y-4 sm:space-y-6">
            {akExplanation.map((item, index) => (
              <li
                key={item.title}
                className="flex min-h-[84px] items-center gap-4 rounded-[32px] bg-[#f1f4fa] px-6 py-6 sm:gap-5 sm:rounded-full sm:px-8"
              >
                <span className="shrink-0 text-xl font-extrabold text-[#304880] tabular-nums">
                  0{index + 1}
                </span>
                <p className="text-base leading-[1.7] break-keep sm:text-lg">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className={container + " mt-20 sm:mt-28 lg:mt-36"}>
        <h3 className="text-[28px] leading-[1.45] font-bold tracking-[-0.03em] sm:text-[36px] lg:text-[42px]">
          자세와 근육의 반응을 살피는
          <br />
          AK 평가와 진료
        </h3>
        <p className="mt-6 text-base leading-[1.8] break-keep text-[#626b77] sm:text-lg">
          움직임을 살피는 평가와 필요한 진찰을 함께 고려합니다.
        </p>
        <ol className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-6 lg:gap-9">
          {stages.map((stage) => (
            <li key={stage.title}>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
                <Image
                  src={"/images/clinic/" + stage.image + ".webp"}
                  alt={stage.title + " 안내 이미지"}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-[center_38%]"
                />
              </div>
              <h4 className="mt-6 text-[22px] leading-[1.5] font-bold tracking-tight lg:text-[28px]">
                {stage.title}
              </h4>
              <p className="mt-3 text-base leading-[1.8] break-keep text-[#626b77] lg:text-lg">
                {stage.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
