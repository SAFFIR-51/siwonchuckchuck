import Image from "next/image";
import { doctorContent, philosophyContent } from "../model/content";
import { PhilosophyMotion } from "./philosophy-motion";
import "./clinic-philosophy.css";

export function ClinicPhilosophy() {
  return (
    <section id="philosophy" className="philosophy" aria-labelledby="philosophy-heading">
      <PhilosophyMotion />
      <div className="philosophy-sequence">
        <div className="philosophy-frame">
          <div className="philosophy-intro">
            <div className="philosophy-intro-inner">
              <p className="philosophy-eyebrow">{doctorContent.eyebrow}</p>
              <h2 id="philosophy-heading">
                {philosophyContent.intro.map((line) => (
                  <span key={line} className="philosophy-line" data-philosophy-line>
                    {line}
                  </span>
                ))}
              </h2>
              <p className="philosophy-scroll" aria-hidden="true">
                SCROLL TO DISCOVER <span>↓</span>
              </p>
            </div>
          </div>
          <div className="philosophy-stage">
            <div className="philosophy-window">
              <div className="philosophy-column philosophy-column--left">
                <div className="philosophy-track" data-philosophy-left>
                  <article className="philosophy-panel philosophy-panel--first">
                    <p className="philosophy-panel-label">
                      진료 철학 <span>01</span>
                    </p>
                    <div>
                      <p className="philosophy-panel-en" aria-hidden="true">
                        LISTEN CLOSELY
                      </p>
                      <h3>{philosophyContent.panels[0].title}</h3>
                      <p className="philosophy-panel-copy">{philosophyContent.panels[0].text}</p>
                    </div>
                    <p className="philosophy-panel-footer">시원척척의원 · AK치료 · 정형외과 진료</p>
                  </article>
                  <div className="philosophy-photo philosophy-photo--care">
                    <span className="philosophy-photo-word" aria-hidden="true">
                      CARE
                    </span>
                    <div className="philosophy-care-frame">
                      <Image
                        src={philosophyContent.careImage}
                        alt="원장이 검사 영상을 설명하는 상담 장면 · 환자 모습 편집"
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <span className="philosophy-photo-caption">
                      {philosophyContent.careCaption}
                    </span>
                  </div>
                </div>
                <div className="philosophy-curtain" aria-hidden="true" />
              </div>
              <div className="philosophy-column philosophy-column--right">
                <div className="philosophy-track" data-philosophy-right>
                  <div className="philosophy-photo philosophy-photo--portrait">
                    <span className="philosophy-photo-word" aria-hidden="true">
                      SIWON
                    </span>
                    <Image
                      src={philosophyContent.portraitImage}
                      alt="시원척척의원 원장"
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-contain object-bottom"
                    />
                    <span className="philosophy-photo-caption">
                      {doctorContent.name} {doctorContent.role}
                    </span>
                  </div>
                  <article className="philosophy-panel philosophy-panel--second">
                    <p className="philosophy-panel-label">
                      진료 철학 <span>02</span>
                    </p>
                    <div>
                      <p className="philosophy-panel-en" aria-hidden="true">
                        CARE TOGETHER
                      </p>
                      <h3>{philosophyContent.panels[1].title}</h3>
                      <p className="philosophy-panel-copy">{philosophyContent.panels[1].text}</p>
                    </div>
                    <p className="philosophy-panel-footer">{doctorContent.message.join(" ")}</p>
                  </article>
                </div>
                <div className="philosophy-curtain" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
