# 프론트엔드 디자인 샘플 갤러리

Vite + React 18 + TypeScript로 만든 **18종의 프론트엔드 디자인 샘플**과, 이를 웹 목적별 6개 카테고리로 분류해 둘러보는 **쇼케이스 갤러리**입니다. 각 샘플은 화면 종류(랜딩·대시보드·이커머스·포트폴리오·블로그·미디어·뉴스·웹앱)와 비주얼 스타일이 모두 다르게 구성되어 있으며, 전 UI가 한국어이고 목업 데이터로 자기완결적으로 동작합니다.

## 특징

- **18개 독립 샘플** — 각각 화면 종류 × 비주얼 스타일이 구별되는 React 페이지
- **카테고리 갤러리** — 6개 웹 목적 카테고리, 스티키 퀵네비, 썸네일 카드 → 클릭 시 라우팅
- **반응형** — 데스크톱/모바일(375·768·1440px) 대응
- **모던 애니메이션** — 워드 스플릿 리빌, 마그네틱 버튼, 3D 틸트, `@property` 그라데이션, 숫자 카운트업, SVG path draw-on, layout FLIP, Ken Burns 등 (transform/opacity 기반, `prefers-reduced-motion` 존중)
- **목업 데이터만** — 백엔드/API 없음, 외부 데이터 요청 없음
- **3중 검증** — 빌드(타입), jsdom 렌더 테스트, 실 브라우저 비주얼 QA

## 샘플 목록 (6 카테고리 × 3)

| 카테고리 | 샘플 | 스타일 |
|---|---|---|
| **마케팅 · 랜딩** | Aurora · Softdeck · Zenith | 글래스모피즘 · 레트로+뉴모피즘 · 그라데이션 |
| **대시보드 · 관리자** | Pulse · Vault · Flow | 미니멀 · 다크 핀테크 · 칸반 CRM |
| **이커머스 · 리테일** | Slab · Lumière · Fresh | 브루탈리즘 · 럭셔리 · 친근 마켓 |
| **포트폴리오 · 퍼스널** | Nebula · Atelier · Lens | 네온/사이버 · 스위스 에디토리얼 · 사진 메이슨리 |
| **콘텐츠 · 미디어** | Quill · Stream · Daily | 에디토리얼 매거진 · 시네마틱 스트리밍 · 뉴스 포털 |
| **웹앱 · 툴** | Converse · Tempo · Board | 채팅 · 뮤직 플레이어 · 칸반 태스크 |

대시보드/차트(Pulse·Vault), 칸반(Flow·Board), 라이트박스(Lens), 채팅 전송(Converse), 재생 토글(Tempo) 등 인터랙션은 모두 클라이언트 상태로 실제 동작합니다.

## 기술 스택

- **React 18** + **TypeScript**
- **Vite 5** (빌드/dev 서버)
- **react-router-dom v6** (라우팅, 샘플 코드 스플리팅)
- **Tailwind CSS v4** (`@tailwindcss/vite`, CSS-first) + 샘플별 스코프 CSS
- **framer-motion** (애니메이션)
- **Vitest + Testing Library + jsdom** (테스트), **Playwright** (비주얼 QA)

## 시작하기

```bash
npm install      # 의존성 설치

npm run dev      # 개발 서버 → http://localhost:5173 (포트 사용 중이면 자동 증가)
npm run build    # 타입체크(tsc -b) + 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기 → http://localhost:4173
npm test         # 렌더 스모크 테스트 (Vitest)
```

> `npm start` 스크립트는 없습니다. 로컬 실행은 `npm run dev`를 사용하세요.

### 비주얼 QA (선택)

```bash
npx playwright install chromium      # 최초 1회
npm run preview                      # 프리뷰 서버 먼저 기동
node scripts/visual-qa.mjs http://localhost:4173
```

19개 화면을 데스크톱/모바일로 캡처하고 페이지별 콘솔 에러를 수집해 `.omc/visual-qa/`에 저장합니다.

## 아키텍처

`src/samples/registry.ts`가 **단일 진실원천**입니다. 갤러리와 라우터 모두 이 레지스트리에서 파생됩니다.

```
src/
├─ main.tsx                    # BrowserRouter 부트스트랩
├─ App.tsx                     # 라우트: "/" → Gallery, "/sample/:id" → SampleFrame, 그 외 → "/" 리다이렉트
├─ index.css                   # Tailwind 진입 + 유일하게 전역(:root/body) 허용
├─ samples/
│  ├─ registry.ts              # Sample[] + 타입 유니온 + 카테고리/라벨 맵 (백본)
│  └─ <slug>/                  # 샘플 18개
│     ├─ index.tsx             #   default export, 루트 className `.sample-<slug>`
│     ├─ mock.ts               #   샘플 자체 목업 데이터
│     └─ <slug>.css            #   `.sample-<slug>` 하위로만 스코프된 스타일
├─ showcase/
│  ├─ Gallery.tsx              # 카테고리별 그룹 + 퀵네비 + 카드 그리드
│  └─ SampleFrame.tsx          # 뒤로가기 + ErrorBoundary + Suspense(lazy 샘플)
├─ components/ErrorBoundary.tsx
└─ test/                       # vitest 설정 + 렌더 스모크 테스트
```

**샘플 추가**: `src/samples/<slug>/`(index.tsx + mock.ts + `<slug>.css`)를 만들고 `registry.ts`에 한 줄 추가하면 갤러리·라우트에 자동 반영됩니다.

### 통합 규약 (깨지면 안 됨)

- 각 샘플 `index.tsx`는 **default export**, 루트 엘리먼트 className은 **`.sample-<slug>`**.
- 커스텀 CSS는 반드시 **`.sample-<slug>` 하위로 스코프**. 샘플 CSS에서 `:root`/`body`/`html`/맨몸 셀렉터 **금지** — 갤러리가 여러 스타일을 한 페이지에 렌더하므로 전역 셀렉터는 전체로 누출됩니다.
- 샘플끼리 import 금지, `registry.ts`/`App.tsx`/`Gallery.tsx`/`SampleFrame.tsx`는 샘플 내부에서 건드리지 않음.

### 애니메이션·접근성

- transform/opacity/filter/box-shadow(및 SVG `pathLength`)만 애니메이션 — 레이아웃 속성(width/height/top/left) 애니메이션 지양.
- 모든 애니메이션은 `useReducedMotion()` + CSS `@media (prefers-reduced-motion: reduce)` 폴백으로 모션 저감을 존중.
- 라우터 레벨 `AnimatePresence`는 사용하지 않음(콘솔 에러 방지).

## 검증

| 게이트 | 명령 | 확인 내용 |
|---|---|---|
| 타입 + 빌드 | `npm run build` | 타입 오류 0, 18개 lazy 청크 |
| 런타임 렌더 | `npm test` | 18개 샘플 + 갤러리 jsdom 마운트, `console.error` 0 |
| 실 브라우저 | `node scripts/visual-qa.mjs` | 38페이지 스크린샷, 콘솔 에러 0 |

## 라이선스

비공개 샘플 프로젝트.
