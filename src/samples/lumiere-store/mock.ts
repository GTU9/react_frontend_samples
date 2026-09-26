export const navLinks = [
  { label: '신상품', href: '#arrivals' },
  { label: '에디토리얼', href: '#editorial' },
  { label: '서비스', href: '#service' },
]

export const heroData = {
  headline: 'LUMIERE 초봄 컬렉션',
  subline: '울 블레이저, 니트, 테일러드 코트처럼 지금 바로 고를 수 있는 신상품을 먼저 보여드립니다.',
  cta: '신상품 보기',
}

export interface Product {
  id: string
  name: string
  price: number
  category: string
  imageIndex: number
  colors: string[]
}

export const newArrivals: Product[] = [
  {
    id: 'olive-blazer',
    name: '울 블렌드 블레이저',
    price: 398000,
    category: '아우터',
    imageIndex: 0,
    colors: ['#5d5a43', '#111111'],
  },
  {
    id: 'rib-knit',
    name: '리브 니트 스웨터',
    price: 228000,
    category: '니트웨어',
    imageIndex: 1,
    colors: ['#eee9df', '#111111'],
  },
  {
    id: 'black-coat',
    name: '롱 테일러드 코트',
    price: 612000,
    category: '코트',
    imageIndex: 2,
    colors: ['#111111'],
  },
  {
    id: 'wide-trouser',
    name: '와이드 울 트라우저',
    price: 259000,
    category: '팬츠',
    imageIndex: 3,
    colors: ['#5d5a43', '#111111'],
  },
  {
    id: 'olive-bag',
    name: '레더 숄더백',
    price: 318000,
    category: '가방',
    imageIndex: 4,
    colors: ['#343728', '#111111'],
  },
  {
    id: 'silk-scarf',
    name: '실크 스카프',
    price: 148000,
    category: '액세서리',
    imageIndex: 5,
    colors: ['#f0eadf'],
  },
]

export const edits = [
  {
    title: '한 벌의 외투가 한 계절의 태도를 정합니다.',
    body: '라펠의 각도, 어깨선의 여유, 빛을 머금는 표면감까지. Lumiere는 사진보다 실제 착용 시간을 먼저 생각합니다.',
  },
  {
    title: '장식보다 원단, 유행보다 비율.',
    body: '모든 상품은 모델 컷과 단품 컷을 함께 보여주고, 색상 선택은 실제 소재감이 보이는 순서로 정리했습니다.',
  },
]

export const serviceLinks = ['무료 교환 1회', '수선 상담', '예약 피팅', '소량 입고 알림']
