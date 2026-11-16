# 시원척척병원 웹

사피어 홈과 같은 Next.js 16.4.6 · React 19.3 · TypeScript 6 · Tailwind CSS 4 기반 프로젝트입니다.

## 실행

Node.js 24 사용 (`nvm use` 또는 Node.js 24 설치).

```sh
npm ci
npm run dev
```

기본 주소: http://localhost:3000 (사용 중이면 Next가 다른 포트를 안내).

## 명령

- `npm run check`: 타입·ESLint·포맷 검사
- `npm run build`: 운영 빌드
- `npm run knip`: 미사용 항목 검사
- `npm run format`: 포맷 정리
- `npm run lint:fix`: 자동 수정

커밋 시 lint-staged와 commitlint가 실행됩니다. 메시지는 `feat: 설명` 형식입니다.

## 개발 문서

- [개발 지침](docs/frontend-guide.md)
- [폴더 구조](ARCHITECTURE.md)
- [작업 목록](docs/TODO.md)
- [예시](docs/examples/01-shared-component.md)
- [같은 환경 재생성](docs/new-project-stack-prompt.md)

폰트: Pretendard, 라이선스는 `src/app/fonts/Pretendard-LICENSE.txt` 참고.
현재는 개발용 시작 화면입니다. 실제 의료정보, 예약, 운영 도메인, 배포 연결은 아직 구성하지 않았습니다.
