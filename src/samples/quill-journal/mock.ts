// Mock data for Quill Journal — editorial/magazine sample

export interface Masthead {
  publication: string
  tagline: string
  issueDate: string
  issueNumber: string
}

export interface Author {
  name: string
  title: string
}

export interface Article {
  id: string
  slug: string
  category: string
  title: string
  subtitle: string
  excerpt: string
  lede: string
  author: Author
  date: string
  readTime: string
  featured: boolean
  imageAlt: string
  imagePlaceholder: string // CSS gradient or color for placeholder
}

export interface Category {
  id: string
  label: string
  active?: boolean
}

export interface MostReadItem {
  rank: number
  id: string
  title: string
  category: string
  date: string
}

export interface Newsletter {
  headline: string
  body: string
  placeholder: string
  cta: string
}

// ——— Masthead ———
export const masthead: Masthead = {
  publication: 'The Quill',
  tagline: '문학 · 사상 · 문화',
  issueDate: '2026년 6월 15일',
  issueNumber: 'Vol. XLII, No. 24',
}

// ——— Categories ———
export const categories: Category[] = [
  { id: 'all', label: '전체', active: true },
  { id: 'essays', label: '에세이' },
  { id: 'fiction', label: '소설' },
  { id: 'politics', label: '정치' },
  { id: 'science', label: '과학' },
  { id: 'arts', label: '예술 & 문화' },
  { id: 'books', label: '책' },
]

// ——— Articles ———
export const articles: Article[] = [
  {
    id: '1',
    slug: 'the-cartography-of-forgetting',
    category: '에세이',
    title: '망각의 지도학',
    subtitle: '기억이 우리가 살아간다고 믿는 풍경을 어떻게 빚어내는가',
    excerpt:
      '우리는 어린 시절 그려진 지도로 삶을 헤쳐나가고, 슬픔으로 그 지도를 고치며, 엄청난 대가를 치르고서야 오류를 바로잡는다. 그런데 영토가 지도보다 빠르게 변할 때 무슨 일이 벌어지는가?',
    lede:
      '모든 지도책은 고백이다. 지도 제작자는 해안선과 고도뿐 아니라 한 시대의 집착, 제국의 불안, 세상을 온전히 알 수 있다고 믿고 싶었던 어느 정신의 특별한 갈망을 드러낸다.',
    author: { name: 'Helena Marsh', title: '수석 에세이스트' },
    date: '2026년 6월 14일',
    readTime: '12분',
    featured: true,
    imageAlt: '손으로 그린 해안선이 있는 고지도',
    imagePlaceholder: 'linear-gradient(135deg, #c9b99a 0%, #8b7355 100%)',
  },
  {
    id: '2',
    slug: 'republic-of-noise',
    category: '정치',
    title: '소음의 공화국',
    subtitle: '민주주의 투쟁의 새로운 전선, 주의(注意)',
    excerpt:
      '모든 플랫폼이 분노를 최적화할 때, 침묵은 가장 희귀한 정치적 저항 형태가 된다. 주의력 경제의 최전선에서 보낸 편지.',
    lede:
      '너무 많이 해서가 아니라, 너무 많이, 너무 빠르게, 너무 다양한 방향으로 느끼도록 강요당해서 찾아오는 특별한 종류의 피로가 있다.',
    author: { name: 'James Okafor', title: '정치 특파원' },
    date: '2026년 6월 13일',
    readTime: '8분',
    featured: false,
    imageAlt: '황혼녘의 붐비는 광장',
    imagePlaceholder: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
  },
  {
    id: '3',
    slug: 'the-last-instruments',
    category: '예술 & 문화',
    title: '마지막 악기들',
    subtitle: '이탈리아 북부에서 사라져가는 장인 정신을 지키는 세 명의 루티에',
    excerpt:
      '크레모나의 한 작업실에서, 가문비나무 대팻밥과 아교 냄새 아래, 일흔 대의 여인이 단풍나무 조각을 대패질하며 혼자 노래를 흥얼거린다. 그녀는 자신이 하는 일을 할 수 있는 살아있는 사람 중 겨우 사십 명 안에 드는 장인이다.',
    lede:
      '듣는 법을 안다면 나무가 말을 한다. 그것이 Giulia Ferretti가 내가 그녀의 작업실에서 보낸 첫날 아침 커피가 준비되기 전에, 빛이 작업대에 채 닿기도 전에 내게 한 말이었다.',
    author: { name: 'Priya Sundaram', title: '예술 & 문화 에디터' },
    date: '2026년 6월 12일',
    readTime: '10분',
    featured: false,
    imageAlt: '루티에 작업대 위에 놓인 미완성 바이올린',
    imagePlaceholder: 'linear-gradient(135deg, #c8956c 0%, #8b4513 100%)',
  },
  {
    id: '4',
    slug: 'cold-equations-of-care',
    category: '과학',
    title: '돌봄의 냉혹한 방정식',
    subtitle: '중증도 분류 알고리즘이 드러내는, 우리가 중요하다고 결정하는 사람',
    excerpt:
      '이제 머신러닝 시스템이 누가 집중치료를 받고 누가 받지 못하는지 결정하는 데 관여한다. 이를 만든 엔지니어들은 모델이 중립적이라고 주장한다. 이를 연구하는 윤리학자들은 동의하지 않는다.',
    lede:
      '스프레드시트는 자신이 결정하고 있다는 것을 모른다. 그것이 아마도 현대 의학에서 가장 불안한 문장일 것이다.',
    author: { name: 'Dr. Anika Reyes', title: '과학 특파원' },
    date: '2026년 6월 11일',
    readTime: '14분',
    featured: false,
    imageAlt: '네트워크를 흐르는 데이터의 추상적 시각화',
    imagePlaceholder: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: '5',
    slug: 'the-slow-library',
    category: '에세이',
    title: '느린 도서관을 예찬하며',
    subtitle: '서가 탐색, 우연한 발견, 그리고 검색의 횡포에 대하여',
    excerpt:
      '검색창은 우리를 효율적으로 만들었고 동시에 완전히 빈곤하게 만들었다. 원하던 것을 정확히 찾으면서, 필요한지도 몰랐던 것을 발견하는 기쁨을 잃어버렸다.',
    lede:
      '내가 보르헤스를 발견한 것은 어느 목록 담당자의 실수인지 영감인지 모를 이유로, 『미로』가 읽을 생각도 없었던 아르헨티나 축구에 관한 책 옆에 꽂혀 있었기 때문이었다.',
    author: { name: 'Tom Whitfield', title: '책 에디터' },
    date: '2026년 6월 10일',
    readTime: '6분',
    featured: false,
    imageAlt: '어두운 열람실의 낡은 책들이 꽂힌 서가',
    imagePlaceholder: 'linear-gradient(135deg, #a8935a 0%, #5c4a2a 100%)',
  },
  {
    id: '6',
    slug: 'fugue-states',
    category: '소설',
    title: '푸가 상태',
    subtitle: '세 악장으로 구성된 이야기',
    excerpt:
      '그녀는 또다시 부엌에서 눈을 떴다. 두 손은 아직 따뜻했고, 자정과 지금 사이의 한 시간을 설명할 수 없었다. 주전자는 차가웠다. 창문은 열려 있었다. 무언가가 결정되어 있었다.',
    lede:
      '처음 일어났을 때 그녀는 아무에게도 말하지 않았다. 두 번째 일어났을 때 그녀는 언니에게 말했고, 언니는 피곤한 것이라고 했다. 세 번째 일어났을 때 그녀는 적기 시작했다.',
    author: { name: 'Claire Nakamura', title: '소설 에디터' },
    date: '2026년 6월 9일',
    readTime: '18분',
    featured: false,
    imageAlt: '밤에 열린 창문, 산들바람에 흔들리는 커튼',
    imagePlaceholder: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
]

export const featuredArticle: Article = articles[0]

export const gridArticles: Article[] = articles.slice(1)

// ——— Most Read ———
export const mostRead: MostReadItem[] = [
  { rank: 1, id: '4', title: '돌봄의 냉혹한 방정식', category: '과학', date: '6월 11일' },
  { rank: 2, id: '3', title: '마지막 악기들', category: '예술 & 문화', date: '6월 12일' },
  { rank: 3, id: '2', title: '소음의 공화국', category: '정치', date: '6월 13일' },
  { rank: 4, id: '6', title: '푸가 상태', category: '소설', date: '6월 9일' },
  { rank: 5, id: '5', title: '느린 도서관을 예찬하며', category: '에세이', date: '6월 10일' },
]

// ——— Newsletter ———
export const newsletter: Newsletter = {
  headline: '주간 레터',
  body: '매주 일요일, 편집진이 한 편의 에세이, 한 가지 추천, 그리고 한 번쯤 곱씹을 만한 질문을 엄선합니다. 소음도, 급박함도 없이. 오직 좋은 읽을거리만.',
  placeholder: '이메일 주소',
  cta: '구독하기',
}
