"use client";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/shared/lib/cn";
export function Dialog({
  title,
  onClose,
  children,
  className,
  headerContent,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  headerContent?: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={id}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "fixed inset-0 m-auto max-h-[85svh] w-[calc(100%-2rem)] max-w-3xl [scrollbar-width:none] overflow-y-auto rounded-2xl border-0 bg-white p-0 text-foreground shadow-2xl [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div
        className={cn(
          "sticky top-0 z-10 flex items-center justify-between gap-6 bg-white px-6 py-4 sm:px-9",
          !headerContent && "border-b border-foreground/10",
        )}
      >
        <h2 id={id} className={headerContent ? "sr-only" : "text-xl font-semibold"}>
          {title}
        </h2>
        {headerContent}
        <button
          onClick={onClose}
          className={cn(
            "flex size-11 shrink-0 items-center justify-center text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173c83]",
            headerContent
              ? "rounded-md hover:bg-[#f0f4fa]"
              : "rounded-full border border-foreground/20",
          )}
          aria-label="팝업 닫기"
        >
          ×
        </button>
      </div>
      <div className="p-6 sm:p-9">{children}</div>
    </dialog>
  );
}
