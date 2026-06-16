export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Variant {
  size: string;
  available: boolean;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  body: string;
  verified: boolean;
}

export interface RelatedProduct {
  id: number;
  title: string;
  price: number;
  accentColor: string;
  tag: string;
}

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  sku: string;
  description: string;
  colors: ColorSwatch[];
  variants: Variant[];
  thumbnailColors: string[];
  specs: Spec[];
  reviews: Review[];
  relatedProducts: RelatedProduct[];
}

export const product: Product = {
  id: 1,
  title: "BRUTAL RUNNER X9",
  subtitle: "유니섹스 고성능 스니커즈",
  price: 189,
  originalPrice: 249,
  sku: "BRX-2024-009",
  description:
    "타협 없음. 최강의 임팩트. BRUTAL RUNNER X9는 가황 처리된 로우 솔, 노출형 폼 미드솔, 그리고 절대 사과하지 않는 구조로 모든 기대를 산산이 부순다. 발로 자신의 의지를 표현하는 이들을 위해 만들어졌다.",
  colors: [
    { name: "로우 블랙", hex: "#0a0a0a" },
    { name: "애시드 화이트", hex: "#f5f5f0" },
    { name: "오렌지 킬", hex: "#ff5c00" },
    { name: "콘크리트", hex: "#8c8c84" },
  ],
  variants: [
    { size: "US 6", available: false },
    { size: "US 7", available: true },
    { size: "US 8", available: true },
    { size: "US 9", available: true },
    { size: "US 10", available: true },
    { size: "US 11", available: false },
    { size: "US 12", available: true },
    { size: "US 13", available: true },
  ],
  thumbnailColors: ["#0a0a0a", "#ff5c00", "#f5f5f0", "#8c8c84", "#1a1a2e"],
  specs: [
    { label: "어퍼", value: "로우 캔버스 + 발리스틱 메시" },
    { label: "솔", value: "가황 고무, 32mm 스택" },
    { label: "미드솔", value: "노출형 EVA 폼" },
    { label: "라이닝", value: "흡습 속건 테리" },
    { label: "클로저", value: "플랫 왁스 레이스, 토널" },
    { label: "무게", value: "340g / 11.99oz (US9)" },
    { label: "원산지", value: "포르투갈" },
    { label: "컬래버", value: "Studio BRUT × District Nine" },
  ],
  reviews: [
    {
      id: 1,
      author: "MARCUS T.",
      rating: 5,
      date: "2024-11-03",
      body: "느낌이 다르다. 쿠션도 허풍도 없음 — 오직 구조와 의도뿐. 갤러리 오프닝에 신고 갔더니 세 명이나 어디서 샀냐고 물었다. 완벽.",
      verified: true,
    },
    {
      id: 2,
      author: "YUKI N.",
      rating: 4,
      date: "2024-10-21",
      body: "폭이 약간 좁게 나온다. 발이 넓으면 반 사이즈 업 추천. 그 외에는 실루엣이 면도날처럼 날카롭다. 오렌지 컬러는 진짜 미쳤다.",
      verified: true,
    },
    {
      id: 3,
      author: "DEV M.",
      rating: 5,
      date: "2024-09-15",
      body: "12년째 하입 스니커를 신어왔다. 이 신발만큼 의도적으로 느껴지는 건 없었다. 노출형 폼 미드솔은 천재적이거나 미친 짓이거나 — 아마 둘 다일 것.",
      verified: false,
    },
    {
      id: 4,
      author: "CAMILLE R.",
      rating: 3,
      date: "2024-08-30",
      body: "디자인은 마음에 드는데 캔버스 어퍼는 길들이는 데 약 일주일 걸린다. 그 이후엔 완벽. 내구성은 두고 봐야 하지만 기대된다.",
      verified: true,
    },
  ],
  relatedProducts: [
    {
      id: 2,
      title: "SLAB MULE 01",
      price: 129,
      accentColor: "#ff5c00",
      tag: "신상",
    },
    {
      id: 3,
      title: "GRID BOOT HVY",
      price: 219,
      accentColor: "#0a0a0a",
      tag: "컬래버",
    },
    {
      id: 4,
      title: "FLAT CAP DERBY",
      price: 159,
      accentColor: "#1a1a2e",
      tag: "세일",
    },
    {
      id: 5,
      title: "CHUNK SLIDE V2",
      price: 89,
      accentColor: "#3d2b1f",
      tag: "인기",
    },
  ],
};
