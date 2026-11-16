# 시원척척병원 프론트 구조

```text
src/
  app/             라우팅·레이아웃·메타데이터
  features/home/   components·model·api·index.ts
  features/news/   소식 분류·검색·상세 팝업
  server/          서버 전용 데이터 접근
  shared/          config·ui·lib·layout·seo
  content/         여러 기능이 공유하는 콘텐츠
```

app → feature의 index / shared / content
feature → 자기 feature / server / shared / content
server → server / shared / content
shared → shared, content → content

ESLint가 의존 방향을 검사합니다. app에서 server를 직접 가져오거나 feature 내부를 가져올 수 없습니다.
서버 파일은 `import "server-only"`로 보호합니다. 필요한 기능이 생길 때 구현합니다.
경로는 `shared/config/routes.ts`, 화면 문구는 feature의 `model/content.ts`에 둡니다.
Cache Components, partialPrefetching, typedRoutes, React Compiler를 사용합니다.
공개 도메인 미정이므로 sitemap·canonical은 출시 준비 시 추가합니다. 현재 metadata는 noindex입니다.
