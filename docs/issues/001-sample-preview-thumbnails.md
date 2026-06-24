# 이슈: 갤러리 카드에 실제 샘플 화면 미리보기 표시

## 배경

기존 갤러리 카드는 샘플별 accent 색상을 활용한 추상 그라데이션 포스터를 보여줬다. 카드 자체는 깔끔하지만, 사용자가 클릭하기 전에 각 샘플의 실제 화면 구성을 파악하기 어렵다.

## 목표

갤러리 카드의 썸네일 영역에 각 샘플 페이지의 실제 첫 화면 일부를 표시해, 24개 샘플을 더 빠르게 비교하고 탐색할 수 있게 한다.

## 작업 범위

- `public/thumbnails/<sample-id>.png`에 샘플별 정적 미리보기 이미지 저장
- `Gallery` 카드가 썸네일 이미지가 있으면 우선 표시
- 이미지가 없거나 로드 실패 시 기존 그라데이션 포스터로 폴백
- Playwright 기반 썸네일 생성 스크립트 추가
- README에 썸네일 생성 방법과 구조 설명 추가

## 완료 기준

- 갤러리 첫 화면에서 24개 카드 모두 실제 샘플 캡처 이미지를 표시한다.
- `/thumbnails/<sample-id>.png`가 없을 때도 카드 UI가 깨지지 않는다.
- `npm run thumbnails -- http://localhost:5173` 명령으로 24개 썸네일을 재생성할 수 있다.
- 타입체크, 렌더 스모크 테스트, 프로덕션 빌드가 통과한다.

## 구현 결과

- `src/showcase/Gallery.tsx`
  - 카드 포스터에 `/thumbnails/${sample.id}.png` 이미지 렌더링 추가
  - `onError` 발생 시 기존 추상 포스터로 fallback
- `scripts/generate-thumbnails.mjs`
  - 레지스트리에서 sample id를 읽어 각 `/sample/<id>` route를 캡처
  - `public/thumbnails/*.png`로 저장
- `package.json`
  - `npm run thumbnails` 스크립트 추가
- `public/thumbnails/`
  - 24개 샘플 PNG 생성
- `README.md`
  - 기능 설명, 생성 명령, 아키텍처, 검증 표 업데이트

## 검증

```bash
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run thumbnails -- http://localhost:5173
```

브라우저 로드 확인:

- 갤러리 이미지 수: 24
- 정상 로드 이미지 수: 24

## 관련 커밋

- `a739c0f Add sample preview thumbnails`
