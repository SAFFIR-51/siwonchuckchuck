import { Container } from "@/shared/ui/container";
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
              나에게 맞는 치료를 위해
            </h2>
            <p className="mt-5 text-base leading-[1.8] text-[#595959] sm:text-lg">
              진찰을 통해 필요한 치료를 함께 결정합니다.
              <br className="sm:hidden" /> 각 치료의 안내와 주의사항을 확인해 보세요.
            </p>
          </div>
          <TreatmentGuide />
        </Container>
      </section>
    </main>
  );
}
