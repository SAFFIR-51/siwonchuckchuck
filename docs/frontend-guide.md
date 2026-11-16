# 시원척척병원 프론트엔드 개발 지침

## 1. 작업 전 확인

AGENTS.md, ARCHITECTURE.md, docs/TODO.md, 관련 예시를 읽고 기존 컴포넌트를 먼저 찾는다. Next API는 node_modules/next/dist/docs/에서 확인한다.

## 2. 고정 스택

Node 24, Next 16.4.6, React 19.3.0, TypeScript ^6.0.3, Tailwind 및 @tailwindcss/turbopack 4.3.3. 폼은 react-hook-form ^7.91.0, @hookform/resolvers ^7.0.5, zod ^4.6.7. 정확한 설치 결과는 package-lock.json이 기준이다. UI 키트는 사용하지 않는다.

## 3. 폴더와 import

app은 feature index, shared, content만 가져온다. feature는 자기 feature, server, shared, content를 가져온다. server는 server/shared/content만, shared와 content는 자기 층만 가져온다. ESLint boundaries가 강제한다.

## 4. 이름

파일은 kebab-case, 컴포넌트는 PascalCase, 훅은 useXxx, 이벤트는 snake_case. 브랜치는 codex/ 접두사를 쓴다.

## 5. 파일 위치

한 기능 전용 코드는 feature 안에 둔다. 두 기능에서 쓰이면 shared로 추출한다. 경로는 shared/config/routes.ts에 모으고 Route 타입으로 확인한다. 서버·비밀값은 server에 둔다.

## 6. 공통 컴포넌트

shared/ui를 먼저 확인한다. 네이티브 props와 className을 받고 cn으로 합친다. React 19의 ref prop을 사용한다. 라벨과 focus-visible을 제공한다.

## 7. Next.js 16

기본은 Server Component, 상호작용이 필요한 작은 부분에만 use client를 사용한다. page는 metadata와 feature 조립을 맡는다. Cache Components에서 쿠키·세션·요청 데이터는 Suspense 안에서 읽는다. 공용 데이터는 use cache를 검토한다. params/searchParams는 await한다. typedRoutes를 켜고 React Compiler를 사용하므로 useMemo/useCallback/memo를 직접 추가하지 않는다. 미들웨어는 proxy.ts, 서버 파일은 server-only로 보호한다. next/link, next/image, next/font를 사용한다.

## 8. 폼과 server action

react-hook-form + zodResolver를 사용한다. 같은 스키마로 서버에서 재검증하고 ActionResult를 반환한다. fieldErrors를 setError로 연결한다. useWatch를 사용한다. 제출 중 중복 입력을 막고 서버 권한·반복 제출 제한을 구현한다. 예시는 저장 기능 없는 검증 연습이다.

## 9. 전환 이벤트

shared/lib/analytics.ts의 track만 사용한다.

| 이벤트              | 시점           |
| ------------------- | -------------- |
| contact_clicked     | 문의 연결 클릭 |
| reservation_clicked | 예약 연결 클릭 |

기능 구현 시 연결한다. 속성은 header/home/footer 위치만 허용한다. 개인정보를 보내지 않는다. 이벤트 추가 시 EventName과 표를 함께 갱신한다.

## 10. 보안

Server action은 공개 진입점이다. 입력 재검증·권한 확인·반복 제출 제한을 적용한다. 비밀값은 server에서만 읽는다. dangerouslySetInnerHTML은 shared/seo의 JsonLd만 예외로 허용하고 JSON의 < 문자를 이스케이프한다. 외부 링크는 필요한 rel 속성을 지정한다.

## 11. 스타일

Tailwind 토큰과 Pretendard를 사용한다. cn으로 조건부 클래스를 합친다. 한글 keep-all, 긴 문자열 overflow-wrap, 제목 balance를 유지한다. 모바일에서 가로 넘침을 확인한다.

## 12. 콘텐츠

문구는 model/content.ts 또는 content에 둔다. 확인되지 않은 병원 운영시간·의료진·연락처·효과를 만들지 않는다. 개발용 데이터는 명시한다. 사이트명은 shared/config/site.ts를 사용한다.

## 13. 라이브러리 제안

기존 스택과 웹 표준을 먼저 사용한다. 새 패키지는 이름·버전·이유·대안·크기를 제안하고 승인 범위 안에서 설치한다. 이번 기본 세팅의 패키지는 이미 승인된 구성이다.

## 14. 화면 품질

375px과 1440px에서 읽기·넘침·키보드·제목 순서·라벨·오류 상태를 확인한다. 공개 도메인 확정 후 metadata, sitemap, canonical을 설정한다.

## 15. 완료 기준

npm run check, npm run knip, npm run build 통과. 시작 화면과 개발 오류 확인. 새 경로 등록, 구조 변경 시 문서 갱신. 기본 제공 유틸과 폼 의존성은 사용 전까지 knip에 구체적으로 제외하며 사용 시 제외를 제거한다.

## 16. 하지 말 것

lint 비활성화나 ts-ignore로 오류를 숨기지 않는다. feature끼리 직접 import하지 않는다. 요청 밖의 라이브러리·설정 변경이나 임의 지침 수정을 하지 않는다.

## 17. 작업 산출물

로그·스크린샷·실험 스크립트는 .agent-output/YYYY-MM-DD-작업명/에 둔다. Git·타입·린트·포맷 검사에서 제외한다. 비밀정보는 산출물에도 넣지 않는다.

## 18. 지침 개선

변경이 필요하면 위치 / 현재 문구 / 제안 문구 / 이유 / 근거를 보고한다. 승인된 변경에는 관련 예시도 갱신한다.

## 19. 보고

변경 내용, 재사용한 코드, 확인 결과, 남은 일과 한계, 지침 개선 제안 순으로 간단히 보고한다.
