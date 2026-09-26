export type ProjectKind = 'installation' | 'sensing' | 'tool'

export interface Project {
  id: string
  title: string
  kind: ProjectKind
  year: string
  place: string
  role: string
  summary: string
  details: string[]
  tools: string[]
  image: string
}

export interface Skill {
  name: string
  level: number
  category: 'code' | 'hardware' | 'process'
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
  name: 'Min Jae Ryu',
  role: '크리에이티브 테크놀로지스트',
  tagline: '코드, 센서, 빛, 물성을 엮어 관객이 만지는 경험을 설계합니다.',
  bio: '전시장과 브랜드 공간을 위한 인터랙티브 설치를 만듭니다. 손으로 조립한 프로토타입에서 시작해 센서 입력, 실시간 그래픽, 내구성 있는 운영 도구까지 하나의 작업으로 묶습니다.',
  location: '서울 / 현장 설치 가능',
  availability: '2026년 봄 커미션 상담 가능',
  portrait: '/media/nebula-folio/art-tech-workbench.jpg',
}

export const projects: Project[] = [
  {
    id: 'moving-shadow',
    title: '움직이는 그림자',
    kind: 'installation',
    year: '2025',
    place: '문화역서울284',
    role: '인터랙션 설계 / 실시간 영상 시스템',
    summary: '관객의 보행을 깊이 카메라로 읽어 벽면의 그림자 입자를 천천히 밀어내는 야간 설치.',
    details: ['Kinect depth stream을 WebSocket으로 정리', '투사면 3개를 하나의 타임라인으로 동기화', '운영 스태프용 밝기/감도 조정 패널 제작'],
    tools: ['TouchDesigner', 'TypeScript', 'WebSocket', 'Projection'],
    image: '/media/nebula-folio/code-installation.jpg',
  },
  {
    id: 'plant-rhythm',
    title: '식물의 리듬',
    kind: 'sensing',
    year: '2024',
    place: '성수동 쇼룸',
    role: '피지컬 프로토타입 / 데이터 시각화',
    summary: '화분의 수분, 조도, 진동 데이터를 사운드와 작은 LED 호흡으로 번역한 리테일 윈도 설치.',
    details: ['토양 센서 18개 캘리브레이션', '식물별 반응 곡선 설계', '매장 조도 변화에 맞춘 자동 디밍'],
    tools: ['Arduino', 'MQTT', 'p5.js', 'Ableton Link'],
    image: '/media/nebula-folio/art-tech-workbench.jpg',
  },
  {
    id: 'archive-table',
    title: '아카이브 테이블',
    kind: 'tool',
    year: '2023',
    place: '독립 큐레이터 협업',
    role: '프로덕트 설계 / 프론트엔드',
    summary: 'RFID가 부착된 오브제를 테이블에 올리면 관련 인터뷰와 스케치가 열리는 연구 아카이브.',
    details: ['오브제별 자료 권한과 전시 모드 분리', '오프라인 동작을 위한 로컬 캐시', '큐레이터가 직접 편집하는 JSON 스키마'],
    tools: ['React', 'RFID', 'IndexedDB', 'Node'],
    image: '/media/nebula-folio/art-tech-workbench.jpg',
  },
]

export const skills: Skill[] = [
  { name: '실시간 그래픽', level: 94, category: 'code' },
  { name: '인터랙션 프로토타이핑', level: 91, category: 'hardware' },
  { name: '센서 캘리브레이션', level: 84, category: 'hardware' },
  { name: '전시 운영 도구', level: 88, category: 'code' },
  { name: '공간 리허설', level: 86, category: 'process' },
  { name: '기술 문서화', level: 82, category: 'process' },
]

export const timeline: TimelineEntry[] = [
  {
    year: '2023-현재',
    role: '독립 크리에이티브 테크놀로지스트',
    company: 'Studio Nebula',
    description: '미디어아트 전시, 브랜드 쇼룸, 연구 랩을 위한 프로토타입과 현장 운영 시스템을 제작합니다.',
  },
  {
    year: '2020-2023',
    role: '인터랙티브 개발자',
    company: 'Signal Room',
    description: '센서 기반 설치와 실시간 영상 시스템을 담당하며 투어 전시에 필요한 유지보수 구조를 정리했습니다.',
  },
  {
    year: '2018-2020',
    role: '프론트엔드 엔지니어',
    company: 'Archive Lab',
    description: '문화예술 아카이브 웹 앱과 현장 키오스크를 만들며 접근성, 오프라인 캐시, 편집 도구를 다뤘습니다.',
  },
]

export const contactLinks: ContactLink[] = [
  { label: '작업 문의', href: 'mailto:hello@nebula.kr', icon: '@' },
  { label: '깃허브', href: '#', icon: 'GH' },
  { label: '노트', href: '#', icon: 'NT' },
]
