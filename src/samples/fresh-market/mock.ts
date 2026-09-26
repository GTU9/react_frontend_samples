export interface Product {
  id: string
  name: string
  price: number
  unit: string
  rating: number
  reviewCount: number
  badge?: 'sale' | 'new' | 'local'
  originalPrice?: number
  category: string
  imageIndex: number
}

export interface Category {
  id: string
  label: string
  icon: string
}

export interface Deal {
  id: string
  title: string
  subtitle: string
  discount: string
  imageIndex: number
}

export const categories: Category[] = [
  { id: 'all', label: '전체', icon: 'grid' },
  { id: 'veg', label: '채소', icon: 'leaf' },
  { id: 'fruit', label: '과일', icon: 'circle' },
  { id: 'meat', label: '정육', icon: 'cut' },
  { id: 'dairy', label: '유제품', icon: 'box' },
  { id: 'seafood', label: '수산', icon: 'wave' },
  { id: 'ready', label: '간편식', icon: 'bag' },
]

export const products: Product[] = [
  { id: 'p1', name: '대추방울토마토', price: 7900, unit: '500g', rating: 4.8, reviewCount: 214, badge: 'local', category: 'veg', imageIndex: 0 },
  { id: 'p2', name: '친환경 시금치', price: 3980, unit: '200g', rating: 4.6, reviewCount: 189, category: 'veg', imageIndex: 1 },
  { id: 'p3', name: '한돈 삼겹살', price: 14800, originalPrice: 17800, unit: '600g', rating: 4.9, reviewCount: 302, badge: 'sale', category: 'meat', imageIndex: 2 },
  { id: 'p4', name: '무항생제 달걀', price: 4900, unit: '10구', rating: 4.5, reviewCount: 97, badge: 'local', category: 'dairy', imageIndex: 3 },
  { id: 'p5', name: '나주 배', price: 11900, unit: '3입', rating: 4.7, reviewCount: 441, category: 'fruit', imageIndex: 4 },
  { id: 'p6', name: '국산 두부', price: 2500, unit: '300g', rating: 4.9, reviewCount: 128, badge: 'new', category: 'ready', imageIndex: 5 },
  { id: 'p7', name: '알배기 배추', price: 3600, unit: '1통', rating: 4.6, reviewCount: 155, category: 'veg', imageIndex: 6 },
  { id: 'p8', name: '손질 고등어', price: 8900, unit: '2쪽', rating: 4.8, reviewCount: 512, category: 'seafood', imageIndex: 7 },
  { id: 'p9', name: '생막걸리', price: 3200, unit: '750ml', rating: 4.4, reviewCount: 88, category: 'ready', imageIndex: 8 },
  { id: 'p10', name: '쌀떡볶이 떡', price: 4200, unit: '500g', rating: 4.7, reviewCount: 203, category: 'ready', imageIndex: 9 },
  { id: 'p11', name: '제주 감귤', price: 9900, unit: '1kg', rating: 4.5, reviewCount: 341, badge: 'sale', originalPrice: 12500, category: 'fruit', imageIndex: 10 },
  { id: 'p12', name: '국산 콩나물', price: 1800, unit: '300g', rating: 4.8, reviewCount: 175, category: 'veg', imageIndex: 11 },
]

export const deals: Deal[] = [
  { id: 'd1', title: '오늘 저녁 볶음 세트', subtitle: '삼겹살, 시금치, 두부를 한 번에', discount: '12% 할인', imageIndex: 2 },
  { id: 'd2', title: '아침 장바구니', subtitle: '달걀, 배, 두부로 가볍게', discount: '3,000원 절약', imageIndex: 3 },
  { id: 'd3', title: '분식 준비 끝', subtitle: '떡볶이 떡과 채소 묶음', discount: '신상품', imageIndex: 9 },
]
