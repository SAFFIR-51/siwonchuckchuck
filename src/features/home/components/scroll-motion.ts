/** Shared helpers for the home page's scroll-linked motion (client code only). */

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
export const easeOut = (value: number) => 1 - (1 - value) ** 3;

/**
 * Progress of a text block entering the viewport: 0 when its top reaches `start`,
 * 1 when it reaches `end` (both as fractions of the viewport height).
 */
export function textProgress(
  element: HTMLElement,
  viewportHeight: number,
  start = 0.85,
  end = 0.4,
) {
  return clamp01(
    (viewportHeight * start - element.getBoundingClientRect().top) /
      (viewportHeight * (start - end)),
  );
}

const revealEase = "cubic-bezier(0.22, 1, 0.36, 1)";
// Hover colour changes on revealed controls (e.g. buttons) stay quick.
const revealTransition = `transform 0.7s ${revealEase}, opacity 0.7s ${revealEase}, filter 0.7s ${revealEase}, color 0.2s, background-color 0.2s, border-color 0.2s`;

/**
 * Lines appear one after another as `progress` goes from 0 to 1.
 * - A line with a `[data-reveal-inner]` child is masked: the text slides up from below
 *   its own line box with a slight tilt.
 * - Other lines (body copy) rise 56px while going from blurred and transparent to sharp.
 * A short transition eases each change so the scroll-linked motion feels smooth.
 */
export function revealLines(lines: readonly HTMLElement[], progress: number) {
  for (const [index, line] of lines.entries()) {
    const local = easeOut(clamp01((progress - index * 0.2) / 0.45));
    const rest = 1 - local;
    const inner = line.querySelector<HTMLElement>("[data-reveal-inner]");
    if (inner) {
      inner.style.transition = revealTransition;
      inner.style.transformOrigin = "0 100%";
      inner.style.transform = `translate3d(0, ${rest * 110}%, 0) rotate(${rest * 4}deg)`;
      continue;
    }
    line.style.transition = revealTransition;
    line.style.opacity = String(local);
    line.style.transform = `translate3d(0, ${rest * 56}px, 0)`;
    line.style.filter = local < 1 ? `blur(${rest * 10}px)` : "";
  }
}

export function clearMotionStyles(elements: readonly (HTMLElement | null)[]) {
  for (const element of elements) {
    if (!element) continue;
    const inner = element.querySelector<HTMLElement>("[data-reveal-inner]");
    for (const target of inner ? [element, inner] : [element]) {
      for (const property of ["opacity", "transform", "filter", "transition", "transform-origin"]) {
        target.style.removeProperty(property);
      }
    }
  }
}

/** A soft-edged mask that slides across the signature like a pencil stroke. */
const signatureMask = "linear-gradient(90deg, #000 42%, transparent 52%)";
const signatureStroke: Keyframe[] = [
  { maskPosition: "100% 0", easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { maskPosition: "72% 0", offset: 0.3, easing: "ease-out" },
  { maskPosition: "68% 0", offset: 0.38, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { maskPosition: "32% 0", offset: 0.72, easing: "ease-out" },
  { maskPosition: "28% 0", offset: 0.8, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { maskPosition: "0% 0" },
];

function setSignatureMask(element: HTMLElement, position: string | null) {
  for (const prefix of ["", "-webkit-"]) {
    if (position === null) {
      element.style.removeProperty(prefix + "mask-image");
      element.style.removeProperty(prefix + "mask-size");
      element.style.removeProperty(prefix + "mask-repeat");
      element.style.removeProperty(prefix + "mask-position");
      continue;
    }
    element.style.setProperty(prefix + "mask-image", signatureMask);
    element.style.setProperty(prefix + "mask-size", "240% 100%");
    element.style.setProperty(prefix + "mask-repeat", "no-repeat");
    element.style.setProperty(prefix + "mask-position", position);
  }
}

/**
 * Writes a signature image in like a pencil stroke once `update` receives a progress of 1,
 * and hides it again after scrolling back below 0.5. Does nothing for a missing element.
 */
export function signatureWriter(element: HTMLElement | null) {
  let stroke: Animation | null = null;
  if (element) setSignatureMask(element, "100% 0");
  return {
    update(progress: number) {
      if (!element) return;
      if (progress >= 1 && !stroke) {
        stroke = element.animate(signatureStroke, { duration: 1600, fill: "forwards" });
      } else if (stroke && progress < 0.5) {
        stroke.cancel();
        stroke = null;
      }
    },
    clear() {
      stroke?.cancel();
      stroke = null;
      if (element) setSignatureMask(element, null);
    },
  };
}
