# 공통 컴포넌트

실제 사용되는 Container 예시입니다. 네이티브 props를 전달하고 cn으로 className을 합칩니다.

```tsx
import { cn } from "@/shared/lib/cn";
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-10", className)} {...props} />;
}
```
