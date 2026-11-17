# 검색 공개 준비

현재는 도메인 미정 / 검색 비공개입니다.

- SITE_URL: 확정한 HTTPS 운영 도메인. 경로·쿼리·인증정보 없이 입력합니다.
- SEARCH_INDEXING_ENABLED: 공개 콘텐츠 검토 후 true로 설정하고 재빌드합니다.
- 두 설정이 갖춰져야 페이지 index와 sitemap이 활성화됩니다. Vercel preview는 항상 noindex입니다. 다른 호스팅의 미리보기 환경은 반드시 SEARCH_INDEXING_ENABLED=false를 사용합니다.
- robots.txt는 크롤링을 허용하여 검색엔진이 noindex를 읽게 합니다. 비공개 자료 보호는 인증으로 처리합니다.
- 도메인 미정이면 canonical과 도메인 기반 공유 이미지 URL을 생략합니다. localhost나 가짜 운영 도메인을 출력하지 않습니다.
- sitemap에는 홈, 소식, indexable=true인 소식만 포함합니다. FAQ 초안과 검색/필터/앵커는 제외합니다. lastmod는 실제 사이트 수정일 데이터가 없으므로 생략합니다. 공식 블로그 게시일을 사이트 수정일로 사용하지 않습니다.
- 소식 목록의 링크는 기존 팝업으로 열리고, 새 탭이나 개별 URL로 접근하면 서버 렌더링 본문을 보여줍니다. FAQ 답변은 details 본문에 유지합니다.
- MedicalClinic 정보는 병원명·주소·전화·공식 채널만 포함합니다. 확인되지 않은 의료진·운영시간·효능·평점은 넣지 않습니다.

## 출시 확인

1. 가상 의료진/임시 약력 제거, 치료 설명 및 FAQ 의료진 검토, 진료시간 확인.
2. 운영 도메인과 공개 플래그 설정, HTTPS/대표 도메인 리다이렉트, 재빌드.
3. 실제 페이지의 canonical·robots·공유 이미지와 sitemap.xml 확인.
4. Google Search Console, 네이버 서치어드바이저 소유 확인 및 sitemap.xml 제출.
5. 공식 플레이스·블로그·SNS의 홈페이지 링크/주소/전화 일치 확인.
6. 검색 노출·유입과 예약/지도 전환을 확인. AI 인용이나 검색 순위를 보장하지 않습니다.

## 참고

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://searchadvisor.naver.com/guide/request-feed
- https://schema.org/MedicalClinic
