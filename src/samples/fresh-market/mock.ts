// ── Mock data for Fresh Market grocery marketplace ─────────────────────────

export interface Product {
  id: string
  name: string
  emoji: string
  price: number
  unit: string
  rating: number
  reviewCount: number
  badge?: 'sale' | 'new' | 'organic'
  originalPrice?: number
  category: string
}

export interface Category {
  id: string
  label: string
  emoji: string
}

export interface Deal {
  id: string
  title: string
  subtitle: string
  discount: string
  emoji: string
  bg: string
}

export const categories: Category[] = [
  { id: 'all',     label: '전체',    emoji: '🛒' },
  { id: 'fruit',   label: '과일',    emoji: '🍎' },
  { id: 'veg',     label: '채소',    emoji: '🥦' },
  { id: 'dairy',   label: '유제품',  emoji: '🥛' },
  { id: 'bakery',  label: '베이커리', emoji: '🍞' },
  { id: 'snacks',  label: '스낵',    emoji: '🥨' },
  { id: 'drinks',  label: '음료',    emoji: '🧃' },
  { id: 'frozen',  label: '냉동식품', emoji: '❄️'  },
]

export const products: Product[] = [
  {
    id: 'p1',
    name: '로얄 갈라 사과',
    emoji: '🍎',
    price: 2.99,
    unit: '1kg당',
    rating: 4.8,
    reviewCount: 214,
    badge: 'organic',
    category: 'fruit',
  },
  {
    id: 'p2',
    name: '캐번디시 바나나',
    emoji: '🍌',
    price: 1.49,
    unit: '한 송이',
    rating: 4.6,
    reviewCount: 189,
    category: 'fruit',
  },
  {
    id: 'p3',
    name: '딸기',
    emoji: '🍓',
    price: 3.49,
    unit: '400g 팩',
    rating: 4.9,
    reviewCount: 302,
    badge: 'sale',
    originalPrice: 4.99,
    category: 'fruit',
  },
  {
    id: 'p4',
    name: '브로콜리',
    emoji: '🥦',
    price: 1.99,
    unit: '1개',
    rating: 4.5,
    reviewCount: 97,
    badge: 'organic',
    category: 'veg',
  },
  {
    id: 'p5',
    name: '전유',
    emoji: '🥛',
    price: 2.29,
    unit: '2L',
    rating: 4.7,
    reviewCount: 441,
    category: 'dairy',
  },
  {
    id: 'p6',
    name: '사워도우 식빵',
    emoji: '🍞',
    price: 4.50,
    unit: '800g',
    rating: 4.9,
    reviewCount: 128,
    badge: 'new',
    category: 'bakery',
  },
  {
    id: 'p7',
    name: '방울토마토',
    emoji: '🍅',
    price: 2.79,
    unit: '250g',
    rating: 4.6,
    reviewCount: 155,
    category: 'veg',
  },
  {
    id: 'p8',
    name: '자유 방목 달걀',
    emoji: '🥚',
    price: 3.99,
    unit: '12개입',
    rating: 4.8,
    reviewCount: 512,
    category: 'dairy',
  },
  {
    id: 'p9',
    name: '오렌지 주스',
    emoji: '🧃',
    price: 3.20,
    unit: '1L',
    rating: 4.4,
    reviewCount: 88,
    badge: 'sale',
    originalPrice: 3.99,
    category: 'drinks',
  },
  {
    id: 'p10',
    name: '그릭 요거트',
    emoji: '🍶',
    price: 2.80,
    unit: '500g',
    rating: 4.7,
    reviewCount: 203,
    category: 'dairy',
  },
  {
    id: 'p11',
    name: '아보카도',
    emoji: '🥑',
    price: 1.20,
    unit: '1개',
    rating: 4.5,
    reviewCount: 341,
    badge: 'organic',
    category: 'fruit',
  },
  {
    id: 'p12',
    name: '크루아상',
    emoji: '🥐',
    price: 3.60,
    unit: '4개입',
    rating: 4.8,
    reviewCount: 175,
    badge: 'new',
    category: 'bakery',
  },
]

export const deals: Deal[] = [
  {
    id: 'd1',
    title: '유기농 농산물 묶음',
    subtitle: '지역 농장에서 바로 온 신선함',
    discount: '20% 할인',
    emoji: '🌿',
    bg: '#dcfce7',
  },
  {
    id: 'd2',
    title: '베이커리 모닝 세트',
    subtitle: '식빵 + 크루아상 + 오렌지주스',
    discount: '$3.50 절약',
    emoji: '☀️',
    bg: '#fef9c3',
  },
  {
    id: 'd3',
    title: '유제품 필수 세트',
    subtitle: '우유, 달걀 & 요거트',
    discount: '15% 할인',
    emoji: '🥛',
    bg: '#e0f2fe',
  },
]
