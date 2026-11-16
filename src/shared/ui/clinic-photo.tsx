import Image from "next/image";
import { cn } from "@/shared/lib/cn";

const fullPhotos = new Set([
  "gallery-reception-front-level",
  "gallery-reception-wide",
  "gallery-waiting-room",
  "gallery-treatment-room",
  "gallery-therapy-room",
  "about-waiting-clean",
  "about-care-branded",
  "about-orthopedic-branded",
  "about-consultation-desk",
  "reception-wide",
  "reception-front",
  "waiting-room",
  "treatment-room",
]);

/** Full photographs use a normal cover layout; legacy blog cards retain their photographic viewport. */
export function ClinicPhoto({
  name,
  alt,
  className,
  preload = false,
}: {
  name: string;
  alt: string;
  className?: string;
  preload?: boolean;
}) {
  if (fullPhotos.has(name)) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <Image
          src={`/images/clinic/${name}.webp`}
          alt={alt}
          fill
          preload={preload}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className={cn("[container-type:size] relative overflow-hidden bg-surface", className)}>
      <Image
        src={`/images/clinic/${name}.webp`}
        alt={alt}
        width={900}
        height={900}
        preload={preload}
        sizes="(max-width: 768px) 150vw, 100vw"
        className="absolute top-1/2 left-1/2 h-auto w-[max(100cqw,231cqh)] max-w-none -translate-x-1/2 -translate-y-[47%]"
      />
    </div>
  );
}
