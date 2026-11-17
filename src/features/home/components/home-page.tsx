import { Container } from "@/shared/ui/container";
import { ClinicNews } from "./clinic-news";
import { AkSection } from "./ak-section";
import { ClinicMarquee } from "./clinic-marquee";
import { Hero } from "./hero";
import { HospitalIntroduction } from "./hospital-introduction";
import { ClinicGallery } from "./clinic-gallery";
import { DoctorIntroduction } from "./doctor-introduction";
import { ClinicEquipment } from "./clinic-equipment";
import { NoticePopup } from "./notice-popup";
import { ClinicCards, TreatmentGuide } from "./home-interactions";

export function HomePage() {
  return (
    <main id="main">
      <NoticePopup />
      <Hero />
      <ClinicMarquee belowHero />
      <HospitalIntroduction />
      <ClinicGallery />
      <ClinicEquipment />
      <DoctorIntroduction />
      <AkSection />
      <ClinicMarquee />
      <section id="treatments" className="py-24 sm:py-32">
        <Container className="max-w-[1720px]">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-[30px] leading-[1.4] font-bold tracking-[-0.045em] text-[#3c3c3c] sm:text-[50px]">
              진료 분야
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-[#595959] sm:text-lg">
              일상에서 느끼는 불편함, 부위별로 세심하게 살펴봅니다.
            </p>
          </div>
          <ClinicCards />
        </Container>
      </section>
      <section id="treatment-guide" className="bg-white py-24 sm:py-32">
        <Container className="max-w-[1720px]">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[30px] leading-[1.4] font-bold tracking-[-0.045em] text-[#3c3c3c] sm:text-[50px]">
              시원척척만의 진료,
              <br />
              환자의 일상을 세심하게 살핍니다
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-[#595959] sm:text-lg">
              팔을 들고, 계단을 오르고, 오래 앉아 있는 순간까지. 익숙했던 일상의 불편함에 귀
              기울입니다.
              <br className="hidden sm:block" /> 통증이 시작된 과정과 몸의 상태를 살펴, 지금 필요한
              치료를 함께 찾아갑니다.
            </p>
          </div>
          <TreatmentGuide />
        </Container>
      </section>
      <ClinicNews />
    </main>
  );
}
