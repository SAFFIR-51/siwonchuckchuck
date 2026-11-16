"use client";
import { site } from "@/shared/config/site";
import { track } from "@/shared/lib/analytics";
import { cn } from "@/shared/lib/cn";
export function ContactLink({
  children,
  className,
  source = "home",
}: {
  children: React.ReactNode;
  className?: string;
  source?: "header" | "home" | "footer";
}) {
  return (
    <a
      href={site.phoneHref}
      onClick={() => track("contact_clicked", { source })}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-5 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-foreground",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
