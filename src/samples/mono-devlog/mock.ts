export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'code'; lang: string; filename: string; code: string }

export interface Post {
  id: string
  title: string
  excerpt: string
  tags: string[]
  date: string
  readTime: string
  body: Block[]
}

export const seedPosts: Post[] = [
  {
    id: 'react-rendering-opt',
    title: 'React 렌더링 최적화: useMemo와 useCallback의 올바른 사용법',
    excerpt:
      'React 컴포넌트가 불필요하게 다시 렌더링되는 원인을 분석하고, useMemo·useCallback을 언제 써야 하는지 실제 예제로 살펴봅니다.',
    tags: ['React', 'Performance', '최적화'],
    date: '2026-06-10',
    readTime: '8분',
    body: [
      {
        kind: 'p',
        text: 'React 앱이 커질수록 불필요한 리렌더링이 성능 병목이 됩니다. 많은 개발자들이 useMemo와 useCallback을 만능 해결책으로 남용하는데, 오히려 메모이제이션 비용이 더 클 수도 있습니다.',
      },
      {
        kind: 'p',
        text: '핵심 원칙은 간단합니다. 연산 비용이 비싸거나, 자식 컴포넌트가 React.memo로 감싸져 있고 해당 함수·값을 props로 전달할 때만 써야 합니다.',
      },
      {
        kind: 'code',
        lang: 'tsx',
        filename: 'ExpensiveList.tsx',
        code: `// 잘못된 예: 단순 원시값 메모이제이션 — 의미 없음
const doubled = useMemo(() => count * 2, [count])

// 올바른 예: 무거운 연산이거나 memo 자식에 전달할 때만
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.score - b.score),
  [items]
)

const handleSelect = useCallback(
  (id: string) => dispatch({ type: 'SELECT', id }),
  [dispatch]
)`,
      },
      {
        kind: 'p',
        text: 'React DevTools Profiler를 먼저 켜서 실제로 느린 부분을 측정한 뒤 최적화를 적용하세요. 추측으로 최적화하면 코드만 복잡해집니다.',
      },
    ],
  },
  {
    id: 'ts-generics-deep',
    title: 'TypeScript 제네릭 심화: 조건부 타입과 infer 키워드',
    excerpt:
      '제네릭의 기본을 넘어 조건부 타입과 infer로 복잡한 타입 변환을 우아하게 처리하는 방법을 소개합니다.',
    tags: ['TypeScript', '타입시스템', '제네릭'],
    date: '2026-05-28',
    readTime: '10분',
    body: [
      {
        kind: 'p',
        text: 'TypeScript의 조건부 타입(Conditional Types)은 타입 레벨에서 if-else를 구현합니다. `T extends U ? X : Y` 형태로 작성하며, 유틸리티 타입 대부분이 이 패턴으로 만들어졌습니다.',
      },
      {
        kind: 'code',
        lang: 'ts',
        filename: 'types.ts',
        code: `// Promise를 벗겨내는 유틸리티 타입
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T

// 함수 반환 타입 추출
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// 사용 예
type ApiResponse = Awaited<ReturnType<typeof fetchUser>>
// => { id: string; name: string; email: string }`,
      },
      {
        kind: 'p',
        text: 'infer 키워드는 extends 절 내에서만 사용할 수 있으며, 패턴 매칭 시 타입을 "캡처"합니다. 배열 요소 타입, 튜플 첫 번째 요소, 함수 파라미터 등을 추출할 때 강력합니다.',
      },
      {
        kind: 'code',
        lang: 'ts',
        filename: 'infer-examples.ts',
        code: `// 배열 요소 타입 추출
type ElementOf<T> = T extends (infer E)[] ? E : never

// 튜플 첫 번째 요소
type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never

// 예시
type Nums = ElementOf<number[]>   // number
type First = Head<[string, number, boolean]>  // string`,
      },
    ],
  },
  {
    id: 'css-layout-modern',
    title: 'CSS 레이아웃 완전 정복: Grid와 Flexbox 언제 무엇을 쓸까',
    excerpt:
      'Flexbox와 Grid는 서로 경쟁하는 기술이 아닙니다. 각각의 강점을 이해하고 함께 사용하는 전략을 정리했습니다.',
    tags: ['CSS', 'Layout', 'Grid', 'Flexbox'],
    date: '2026-05-14',
    readTime: '7분',
    body: [
      {
        kind: 'p',
        text: 'Flexbox는 1차원(한 방향) 레이아웃에 적합합니다. 네비게이션 바 아이템 정렬, 버튼 그룹, 카드 내부 구조처럼 "이 줄 안에서 어떻게 배치할까"를 결정할 때 씁니다.',
      },
      {
        kind: 'p',
        text: 'Grid는 2차원(행과 열) 레이아웃에 강합니다. 전체 페이지 구조, 카드 그리드, 대시보드처럼 "전체 공간을 어떻게 나눌까"를 설계할 때 씁니다.',
      },
      {
        kind: 'code',
        lang: 'css',
        filename: 'layout.css',
        code: `/* 페이지 골격: Grid */
.page-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;
}

/* 카드 내부: Flexbox */
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

/* 반응형: 모바일에서 단일 컬럼 */
@media (max-width: 768px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}`,
      },
    ],
  },
  {
    id: 'algorithm-sliding-window',
    title: '슬라이딩 윈도우 알고리즘: O(n²)을 O(n)으로 줄이는 방법',
    excerpt:
      '연속된 부분 배열·부분 문자열 문제에서 자주 등장하는 슬라이딩 윈도우 기법을 직관적으로 설명합니다.',
    tags: ['알고리즘', 'JavaScript', '자료구조'],
    date: '2026-04-30',
    readTime: '9분',
    body: [
      {
        kind: 'p',
        text: '배열에서 "길이 k인 연속 부분 배열의 최대 합"을 구한다면? 순진하게 이중 반복문을 쓰면 O(n²)이지만, 슬라이딩 윈도우를 쓰면 O(n)에 해결됩니다.',
      },
      {
        kind: 'code',
        lang: 'ts',
        filename: 'slidingWindow.ts',
        code: `function maxSubarraySum(arr: number[], k: number): number {
  if (arr.length < k) return -Infinity

  // 첫 윈도우 합산
  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0)
  let maxSum = windowSum

  for (let i = k; i < arr.length; i++) {
    // 새 요소를 더하고 오래된 요소를 빼기
    windowSum += arr[i] - arr[i - k]
    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}

// [2, 1, 5, 1, 3, 2], k=3 → 9 (5+1+3)
console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3))`,
      },
      {
        kind: 'p',
        text: '핵심은 윈도우가 이동할 때 전체를 다시 계산하지 않고, 추가되는 요소와 제거되는 요소만 처리한다는 것입니다. 가변 크기 윈도우(two-pointer)로 확장하면 더 복잡한 문제도 풀 수 있습니다.',
      },
    ],
  },
  {
    id: 'vite-build-config',
    title: 'Vite 빌드 설정 최적화: 번들 크기를 40% 줄인 방법',
    excerpt:
      '프로덕션 빌드에서 번들 크기를 분석하고, 코드 스플리팅·트리 셰이킹·압축 설정으로 실제 크기를 줄인 경험을 공유합니다.',
    tags: ['Vite', '빌드최적화', 'Frontend'],
    date: '2026-04-15',
    readTime: '6분',
    body: [
      {
        kind: 'p',
        text: '빌드 크기 최적화의 첫 단계는 현재 상태를 측정하는 것입니다. rollup-plugin-visualizer를 사용하면 각 모듈이 번들에서 차지하는 비율을 시각적으로 볼 수 있습니다.',
      },
      {
        kind: 'code',
        lang: 'ts',
        filename: 'vite.config.ts',
        code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        // 벤더 라이브러리 분리
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
        },
      },
    },
    // 청크 크기 경고 기준 조정
    chunkSizeWarningLimit: 600,
  },
})`,
      },
      {
        kind: 'p',
        text: '분석 결과 가장 큰 원인은 moment.js였습니다. day.js로 교체하고 동적 import로 무거운 차트 라이브러리를 지연 로딩하자 초기 번들이 1.2MB에서 720KB로 줄었습니다.',
      },
    ],
  },
  {
    id: 'git-rebase-workflow',
    title: 'Git rebase 실전 가이드: 깔끔한 커밋 히스토리 만들기',
    excerpt:
      '팀 코드 리뷰에서 "커밋 정리해 주세요"라는 말을 들어 봤다면, git rebase -i로 히스토리를 다듬는 방법을 알아봅니다.',
    tags: ['Git', 'Workflow', '협업'],
    date: '2026-03-22',
    readTime: '5분',
    body: [
      {
        kind: 'p',
        text: '작업 중 만든 "WIP", "fix typo", "진짜 마지막" 같은 커밋들을 PR 전에 정리하면 리뷰어가 코드 변경 의도를 훨씬 빠르게 파악할 수 있습니다.',
      },
      {
        kind: 'code',
        lang: 'bash',
        filename: 'terminal',
        code: `# 최근 5개 커밋을 대화형으로 편집
git rebase -i HEAD~5

# 에디터에서 pick → squash(s)로 변경해 합치거나
# pick → reword(r)로 메시지를 수정할 수 있습니다
#
# pick a1b2c3 feat: 로그인 페이지 추가
# s    d4e5f6 WIP
# s    g7h8i9 fix typo
# r    j0k1l2 feat: 폼 유효성 검사`,
      },
      {
        kind: 'p',
        text: '이미 push한 브랜치라면 force push가 필요합니다. 혼자 작업하는 feature 브랜치라면 문제없지만, 공유 브랜치에서는 팀과 반드시 합의 후 진행하세요.',
      },
    ],
  },
]
