import { cn } from "@/shared/lib/cn";
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-10", className)} {...props} />;
}
