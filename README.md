# 프론트엔드 디자인 샘플 갤러리

Vite + React 18 + TypeScript로 만든 **24종의 프론트엔드 디자인 샘플**과, 이를 웹 목적별 6개 카테고리로 분류해 둘러보는 **쇼케이스 갤러리**입니다. 각 샘플은 화면 종류(랜딩·대시보드·이커머스·포트폴리오·블로그·미디어·뉴스·웹앱)와 비주얼 스타일이 모두 다르게 구성되어 있으며, 전 UI가 한국어이고 목업 데이터로 자기완결적으로 동작합니다.

## 특징

- **24개 독립 샘플** — 각각 화면 종류 × 비주얼 스타일이 구별되는 React 페이지
- **검색 가능한 아카이브** — 6개 웹 목적 카테고리, 이름·분야 검색, 실제 샘플 화면 썸네일 → 클릭 시 라우팅
- **샘플 미리보기 이미지** — Playwright로 각 샘플 첫 화면을 캡처해 `public/thumbnails/`에 저장
- **반응형** — 모바일 390px / 데스크톱 1440px 실 브라우저 검증
- **분야별 아트 디렉션** — 운영 도구의 표와 필터, 쇼핑몰의 상품 사진, 매체의 편집 위계, 포트폴리오의 작업물 중심 구성
- **절제된 모션** — 선택·전환·피드백에 필요한 애니메이션과 `prefers-reduced-motion` 지원
- **목업 데이터만** — 백엔드/API 없음, 외부 데이터 요청 없음
- **3중 검증** — 빌드(타입), jsdom 렌더 테스트, 실 브라우저 비주얼 QA

## 샘플 목록 (24종)

| 카테고리 | 샘플 | 스타일 |
|---|---|---|
| **마케팅 · 랜딩** | Aurora · Softdeck · Zenith | 출시 협업 · 오디오 하드웨어 · 리소스 플래닝 |
| **대시보드 · 관리자** | Pulse · Vault · Flow | 제품 분석 · 기업 금융 장부 · 영업 파이프라인 |
| **이커머스 · 리테일** | Slab · Lumière · Fresh | 생활 도구 편집숍 · 패션 카탈로그 · 동네 식료품 마켓 |
| **포트폴리오 · 퍼스널** | Nebula · Atelier · Lens | 크리에이티브 테크 · 건축/그래픽 스튜디오 · 사진 콘택트 시트 |
| **콘텐츠 · 미디어** | Quill · Frame · 데일리 서울 | 문화 저널 · 독립영화 큐레이션 · 지역 신문 |
| **블로그 (작성 + 조회)** | Inkwell · Prism · Mono · Press · Velvet · Halo | 문학 노트 · 시각문화 · 개발 기록 · 시민 오피니언 · 여행 · 음악 진 |
| **웹앱 · 툴** | Converse · Tempo · Board | 업무용 메신저 · 음반 라이브러리 · 작업 보드 |

대시보드/차트(Pulse·Vault), 칸반(Flow·Board), 라이트박스(Lens), 채팅 전송(Converse), 재생 토글(Tempo) 등 인터랙션은 모두 클라이언트 상태로 실제 동작합니다. 블로그 6종은 **글작성(라이브 프리뷰)·발행·목록 조회·글 읽기**를 모두 클라이언트 상태로 처리합니다(블로그는 모두 `콘텐츠 · 미디어` 카테고리에 속합니다).

Frame은 작품 소개·검색·보관함을 제공하며 실제 영상을 스트리밍하지 않습니다. Tempo의 재생 UI는 오디오 없는 미리듣기 시뮬레이션입니다. 주문·구독·게시물은 로컬 데모이며 실제 결제, 발송, 서버 저장으로 연결되지 않습니다.

리디자인의 조사 출처, 샘플별 결정과 이미지 출처는 [리디자인 문서](docs/redesign/README.md)에 정리했습니다. 기존 24개 URL은 유지됩니다.

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
npm test         # 렌더 + 검색/보관함 + 블로그 발행 테스트 (Vitest)
```

> `npm start` 스크립트는 없습니다. 로컬 실행은 `npm run dev`를 사용하세요.

### 썸네일 생성 (선택)

갤러리 카드는 `public/thumbnails/<sample-id>.png`가 있으면 실제 샘플 화면 캡처를 보여주고, 이미지가 없거나 로드에 실패하면 단색 바탕에 샘플 이름을 표시합니다.

```bash
npx playwright install chromium      # 최초 1회
npm run dev                          # 또는 npm run preview
npm run thumbnails -- http://localhost:5173
```

샘플 UI를 크게 바꾼 뒤에는 위 명령으로 썸네일을 다시 생성하세요.

### 비주얼 QA (선택)

```bash
npx playwright install chromium      # 최초 1회
npm run preview                      # 프리뷰 서버 먼저 기동
node scripts/visual-qa.mjs http://localhost:4173
```

25개 화면을 데스크톱/모바일로 캡처하고 콘솔 에러, 이미지 로딩 실패, 가로 넘침, 빈 화면을 점검해 `.omc/visual-qa/`에 저장합니다. 실패가 있으면 종료 코드 1을 반환합니다. 세 번째 인수로 `quill-journal,pulse-stream`처럼 경로 ID를 지정하면 해당 샘플만 점검합니다.

`VISUAL_QA_OUT` 환경 변수로 출력 폴더를 바꿀 수 있습니다. 일부 화면만 재검증할 때 전체 검사 결과를 보존하는 용도로 사용합니다.

## 아키텍처

`src/samples/registry.ts`가 **단일 진실원천**입니다. 갤러리와 라우터 모두 이 레지스트리에서 파생됩니다.

```
.
├─ public/
│  ├─ media/                   # 로컬 사진과 생성 제품 이미지
│  └─ thumbnails/              # 갤러리 카드용 실제 샘플 화면 캡처
├─ scripts/
│  ├─ generate-thumbnails.mjs  # 샘플 route 캡처 → public/thumbnails/*.png
│  └─ visual-qa.mjs            # 실 브라우저 스크린샷 + 콘솔 에러 수집
└─ src/
   ├─ main.tsx                 # BrowserRouter 부트스트랩
   ├─ App.tsx                  # 라우트: "/" → Gallery, "/sample/:id" → SampleFrame, 그 외 → "/" 리다이렉트
   ├─ index.css                # Tailwind 진입 + 유일하게 전역(:root/body) 허용
   ├─ samples/
   │  ├─ registry.ts           # Sample[] + 타입 유니온 + 카테고리/라벨 맵 (백본)
   │  └─ <slug>/               # 샘플 24개
   │     ├─ index.tsx          #   default export, 루트 className `.sample-<slug>`
   │     ├─ mock.ts            #   샘플 자체 목업 데이터
   │     └─ <slug>.css         #   `.sample-<slug>` 하위로만 스코프된 스타일
   ├─ showcase/
   │  ├─ Gallery.tsx           # 검색 + 카테고리 필터 + 이미지 인덱스
   │  └─ SampleFrame.tsx       # 뒤로가기 + ErrorBoundary + Suspense(lazy 샘플)
   ├─ components/ErrorBoundary.tsx
   └─ test/                    # vitest 설정 + 렌더 스모크 테스트
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
| 타입 + 빌드 | `npm run build` | 타입 오류 0, 24개 lazy 청크 |
| 렌더 + 상호작용 | `npm test` | 36개 테스트: 렌더 26개, 검색/보관함 4개, 블로그 발행 6개 |
| 썸네일 생성 | `npm run thumbnails -- http://localhost:5173` | 24개 샘플 미리보기 PNG 생성 |
| 실 브라우저 | `node scripts/visual-qa.mjs` | 50페이지 스크린샷, 콘솔 에러 0 |

## 라이선스

비공개 샘플 프로젝트.
