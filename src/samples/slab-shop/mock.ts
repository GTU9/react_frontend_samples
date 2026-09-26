export interface ColorSwatch {
  name: string
  hex: string
}

export interface Variant {
  size: string
  available: boolean
}

export interface Spec {
  label: string
  value: string
}

export interface Review {
  id: number
  author: string
  rating: number
  date: string
  body: string
  verified: boolean
}

export interface CatalogItem {
  id: string
  title: string
  subtitle: string
  price: number
  imageIndex: number
  tag: string
}

export interface Product {
  id: string
  title: string
  subtitle: string
  price: number
  originalPrice: number
  sku: string
  description: string
  colors: ColorSwatch[]
  variants: Variant[]
  specs: Spec[]
  reviews: Review[]
  relatedProducts: CatalogItem[]
}

export const product: Product = {
  id: 'slab-stool-01',
  title: '모듈 스툴 01',
  subtitle: '실내외 겸용 폴리프로필렌 오브제 스툴',
  price: 149000,
  originalPrice: 178000,
  sku: 'SLAB-OBJ-ST01-RD',
  description:
    '가벼운 구조, 넓은 다리 간격, 물청소 가능한 표면. 현관, 작업실, 베란다를 오가며 오래 쓰도록 만든 SLAB의 기본 오브제입니다.',
  colors: [
    { name: '시그널 레드', hex: '#d71920' },
    { name: '매트 블랙', hex: '#111111' },
    { name: '웜 화이트', hex: '#f5f3ef' },
    { name: '스틸 그레이', hex: '#8d8d86' },
  ],
  variants: [
    { size: 'H45', available: true },
    { size: 'H50', available: true },
    { size: 'H65', available: false },
    { size: '2개 세트', available: true },
    { size: '4개 세트', available: true },
  ],
  specs: [
    { label: '소재', value: '재활용 폴리프로필렌 70%, 유리섬유 보강' },
    { label: '치수', value: 'W390 x D390 x H450mm' },
    { label: '하중', value: '정적 하중 130kg 테스트 완료' },
    { label: '마감', value: '무광 질감, 미끄럼 방지 풋캡' },
    { label: '관리', value: '중성세제와 젖은 천으로 세척' },
    { label: '제조', value: '경기 김포 소량 사출 공장' },
  ],
  reviews: [
    {
      id: 1,
      author: '정우',
      rating: 5,
      date: '2026.08.18',
      body: '작업실 샘플 테이블 옆에 두었는데 가볍고 단단합니다. 빨간색이 공간을 살려줘요.',
      verified: true,
    },
    {
      id: 2,
      author: '하린',
      rating: 4,
      date: '2026.07.30',
      body: '베란다 식물 받침으로 쓰다가 손님 오면 의자로 씁니다. 모서리 마감이 깔끔합니다.',
      verified: true,
    },
    {
      id: 3,
      author: '민규',
      rating: 5,
      date: '2026.07.11',
      body: '가구보다 공구에 가까운 태도라 마음에 듭니다. 2개 세트 추천합니다.',
      verified: false,
    },
  ],
  relatedProducts: [
    {
      id: 'shelf',
      title: '스틸 셸프 3단',
      subtitle: '볼트 조립식 크롬 보관대',
      price: 329000,
      imageIndex: 1,
      tag: '공간',
    },
    {
      id: 'lamp',
      title: '테스크 램프 B2',
      subtitle: '스프링 암 작업등',
      price: 189000,
      imageIndex: 2,
      tag: '조명',
    },
    {
      id: 'crate',
      title: '월 크레이트',
      subtitle: '타공 벽걸이 수납함',
      price: 76000,
      imageIndex: 3,
      tag: '수납',
    },
    {
      id: 'table',
      title: '플랫팩 사이드',
      subtitle: '자작나무 조립 테이블',
      price: 214000,
      imageIndex: 5,
      tag: '가구',
    },
  ],
}
