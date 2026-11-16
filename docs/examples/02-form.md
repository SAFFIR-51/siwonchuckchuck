# 폼과 서버 검증 예시

아래 코드는 TypeScript·ESLint·Prettier 검사를 통과한 예시입니다. 실제 페이지에 노출되지 않으며, 데이터 저장·예약 기능은 없습니다. 실제 접수 기능에서는 권한·반복 제출 제한과 저장 연동을 추가해야 합니다.

## model/schema.ts

```ts
import { z } from "zod";
export const exampleSchema = z.object({
  topic: z.string().trim().min(1, "항목을 입력해 주세요.").max(30),
});
export type ExampleInput = z.infer<typeof exampleSchema>;
```

## api/validate-example.ts

```ts
"use server";
import { exampleSchema } from "../model/schema";
import type { ActionResult } from "@/shared/lib/action-result";
export async function validateExample(input: unknown): Promise<ActionResult<string>> {
  const result = exampleSchema.safeParse(input);
  if (!result.success)
    return {
      ok: false,
      error: "입력을 확인해 주세요.",
      fieldErrors: { topic: result.error.issues.map((issue) => issue.message) },
    };
  return { ok: true, data: "검증 완료 — 저장하거나 예약하지 않았습니다." };
}
```

## components/example-form.tsx

```tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exampleSchema, type ExampleInput } from "../model/schema";
import { validateExample } from "../api/validate-example";
export function ExampleForm() {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ExampleInput>({ resolver: zodResolver(exampleSchema), defaultValues: { topic: "" } });
  async function onSubmit(values: ExampleInput) {
    const result = await validateExample(values);
    if (!result.ok) {
      const message = result.fieldErrors?.topic?.[0];
      if (message) setError("topic", { message });
      setStatus(result.error);
      return;
    }
    setStatus(result.data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="example-topic">검증할 항목 (개인정보 입력 금지)</label>
      <input
        id="example-topic"
        {...register("topic")}
        aria-invalid={!!errors.topic}
        aria-describedby={errors.topic ? "example-error" : undefined}
      />
      {errors.topic && <p id="example-error">{errors.topic.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        입력 검증
      </button>
      <p role="status">{status}</p>
    </form>
  );
}
```

## 전환 이벤트

실제 예약 버튼을 구현할 때 클릭 핸들러에서 `track("reservation_clicked", { source: "home" })`을 호출합니다. 검증 예시에는 실제 예약 이벤트를 보내지 않습니다. 서버 저장 성공을 예약 확정으로 취급하지 말고 연동 서비스의 결과로 확인합니다.
