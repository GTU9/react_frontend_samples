export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  year: string
  link?: string
}

export interface Skill {
  name: string
  level: number // 0–100
  category: 'language' | 'framework' | 'tool' | 'other'
}

export interface TimelineEntry {
  year: string
  role: string
  company: string
  description: string
}

export interface ContactLink {
  label: string
  href: string
  icon: string
}

export const profile = {
  name: 'KAI NAKAMURA',
  role: '풀스택 엔지니어 & 디지털 아키텍트',
  tagline: '가능성의 경계에서 시스템을 만듭니다.',
  bio: '고성능 웹 시스템, 인터랙티브 경험, AI 기반 도구를 만듭니다. 깔끔한 아키텍처, 픽셀 퍼펙트 UI, 그리고 실제 프로덕션에서 작동하는 것을 출시하는 데 집착합니다.',
  location: '도쿄 — 원격',
  availability: '계약직 구직 중',
}

export const projects: Project[] = [
  {
    id: 'proj-01',
    title: 'SYNAPSE AI',
    description:
      '분산 AI 에이전트 클러스터를 모니터링하는 실시간 신경 인터페이스 대시보드. WebGL 가속 데이터 시각화로 10ms 미만의 렌더링 지연을 실현했습니다.',
    tags: ['React', 'WebGL', 'WebSocket', 'TypeScript'],
    year: '2025',
  },
  {
    id: 'proj-02',
    title: 'CIPHER VAULT',
    description:
      '종단 간 암호화, 데드맨 스위치, 터미널 스타일 UI를 갖춘 제로 지식 암호화 문서 저장소. 보안에 민감한 전문가를 위해 설계했습니다.',
    tags: ['Rust', 'WASM', 'AES-256', 'IndexedDB'],
    year: '2025',
  },
  {
    id: 'proj-03',
    title: 'NEON GRID',
    description:
      '다크 모드 우선 애플리케이션을 위한 오픈소스 CSS 디자인 시스템. 60개 이상의 컴포넌트, 완전한 토큰 시스템, 디자이너를 위한 Figma 플러그인을 제공합니다.',
    tags: ['CSS', 'Figma API', 'Storybook', 'npm'],
    year: '2024',
  },
  {
    id: 'proj-04',
    title: 'DRIFT PROTOCOL',
    description:
      'WebRTC를 활용한 P2P 파일 전송 애플리케이션. 자동 릴레이 폴백, 청크 스트리밍을 지원하며 서버 측 저장소가 없습니다.',
    tags: ['WebRTC', 'Node.js', 'React', 'P2P'],
    year: '2024',
  },
  {
    id: 'proj-05',
    title: 'HELIX OS',
    description:
      '가상 파일 시스템, 셸 인터프리터, 패키지 매니저를 갖춘 브라우저 기반 Unix 유사 운영체제 시뮬레이션. Worker 내에서 완전히 실행됩니다.',
    tags: ['TypeScript', 'Web Workers', 'POSIX', 'Canvas'],
    year: '2023',
  },
  {
    id: 'proj-06',
    title: 'GHOST TRACE',
    description:
      '자동 스팬 상관 분석, 이상 탐지, 초고속 쿼리 엔진을 갖춘 마이크로서비스용 분산 추적 플랫폼.',
    tags: ['Go', 'ClickHouse', 'gRPC', 'React'],
    year: '2023',
  },
]

export const skills: Skill[] = [
  { name: 'TypeScript', level: 96, category: 'language' },
  { name: 'Rust', level: 78, category: 'language' },
  { name: 'Go', level: 72, category: 'language' },
  { name: 'Python', level: 85, category: 'language' },
  { name: 'React', level: 95, category: 'framework' },
  { name: 'Next.js', level: 90, category: 'framework' },
  { name: 'Node.js', level: 88, category: 'framework' },
  { name: 'Framer Motion', level: 82, category: 'framework' },
  { name: 'Docker', level: 80, category: 'tool' },
  { name: 'Kubernetes', level: 68, category: 'tool' },
  { name: 'PostgreSQL', level: 84, category: 'tool' },
  { name: 'Redis', level: 76, category: 'tool' },
]

export const timeline: TimelineEntry[] = [
  {
    year: '2024–현재',
    role: '시니어 엔지니어',
    company: 'NEXUS SYSTEMS',
    description:
      '일일 활성 사용자 20만 명 이상의 실시간 트레이딩 플랫폼의 프론트엔드 아키텍처를 리드했습니다. 번들 크기 40% 감소, P99 렌더 지연을 16ms 이하로 개선했습니다.',
  },
  {
    year: '2022–2024',
    role: '풀스택 엔지니어',
    company: 'QUANTUM IO',
    description:
      '데이터베이스 스키마부터 픽셀 퍼펙트 UI까지 6개의 프로덕트 기능을 엔드투엔드로 구축하고 출시했습니다. 타입 기반 API 계약을 도입해 런타임 오류를 70% 줄였습니다.',
  },
  {
    year: '2020–2022',
    role: '프론트엔드 엔지니어',
    company: 'VOID LABS',
    description:
      '엔터프라이즈 분석 제품을 위한 인터랙티브 데이터 시각화를 설계하고 개발했습니다. 대표 차트 라이브러리를 구동하는 WebGL 렌더링 엔진 개발에 기여했습니다.',
  },
  {
    year: '2018–2020',
    role: '주니어 개발자',
    company: 'PIXEL FORGE',
    description:
      '마케팅 사이트와 내부 도구를 개발하는 UI 개발자로 시작했습니다. 컴포넌트 라이브러리를 CSS Modules에서 토큰 기반 시스템으로 마이그레이션하는 작업을 이끌었습니다.',
  },
]

export const contactLinks: ContactLink[] = [
  { label: '깃허브', href: '#', icon: 'GH' },
  { label: '링크드인', href: '#', icon: 'LI' },
  { label: '트위터', href: '#', icon: 'TW' },
  { label: '이메일', href: 'mailto:kai@nexus.dev', icon: '@' },
]
