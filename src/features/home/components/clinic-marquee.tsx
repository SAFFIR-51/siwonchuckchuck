/** Decorative brand lettering; duplicate groups make the loop seamless. */
export function ClinicMarquee() {
  return (
    <div className="clinic-marquee" aria-hidden="true">
      <div className="clinic-marquee__track">
        {[0, 1].map((copy) => (
          <span className="clinic-marquee__text" key={copy}>
            Siwon Spine and Joint Clinic Siwon Spine and Joint Clinic
          </span>
        ))}
      </div>
    </div>
  );
}
