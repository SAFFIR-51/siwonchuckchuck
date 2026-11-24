"use client";
import { site } from "@/shared/config/site";
import { track } from "@/shared/lib/analytics";
import { cn } from "@/shared/lib/cn";
export function ContactLink({
  children,
  className,
  source = "home",
  showArrow = true,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  source?: "header" | "home" | "footer";
  showArrow?: boolean;
  tone?: "brand" | "navy" | "light";
}) {
  return (
    <a
      href={site.phoneHref}
      onClick={() => track("contact_clicked", { source })}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-5 rounded-full px-7 py-3 text-sm font-medium transition-colors",
        tone === "navy"
          ? "bg-[#293d7d] text-white hover:bg-[#1f3067]"
          : tone === "light"
            ? "bg-white text-[#293d7d] hover:bg-[#edf2fa]"
            : "bg-accent text-white hover:bg-foreground",
        className,
      )}
    >
      {children}
      {showArrow && <span aria-hidden="true">↗</span>}
    </a>
  );
}
