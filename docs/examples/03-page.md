# 페이지 추가

1. feature/components에 화면을 만듭니다.
2. feature/index.ts에서 export합니다.
3. app에 페이지를 만들고 metadata와 feature를 연결합니다.
4. npm run typecheck 후 routes.ts에 경로를 추가합니다.
5. 운영 도메인이 확정되면 sitemap에 공개 경로를 추가합니다.

```tsx
import { HomePage } from "@/features/home";
export default function Page() {
  return <HomePage />;
}
```
