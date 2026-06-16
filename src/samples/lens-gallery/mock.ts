export interface Photo {
  id: number
  title: string
  location: string
  aspect: 'portrait' | 'landscape' | 'square'
  gradient: string
}

export const photos: Photo[] = [
  {
    id: 1,
    title: '황금빛 시간',
    location: '산토리니, 그리스',
    aspect: 'landscape',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 30%, #fbbf24 60%, #fcd34d 100%)',
  },
  {
    id: 2,
    title: '한밤의 숲',
    location: '슈바르츠발트, 독일',
    aspect: 'portrait',
    gradient: 'linear-gradient(160deg, #064e3b 0%, #065f46 35%, #0f766e 70%, #134e4a 100%)',
  },
  {
    id: 3,
    title: '알프스의 안개',
    location: '라우터브루넨, 스위스',
    aspect: 'square',
    gradient: 'linear-gradient(120deg, #e0f2fe 0%, #bae6fd 40%, #7dd3fc 70%, #38bdf8 100%)',
  },
  {
    id: 4,
    title: '사막의 황혼',
    location: '와디럼, 요르단',
    aspect: 'landscape',
    gradient: 'linear-gradient(150deg, #7c2d12 0%, #b45309 30%, #d97706 55%, #c2410c 85%, #9a1c1f 100%)',
  },
  {
    id: 5,
    title: '네온 도쿄',
    location: '신주쿠, 일본',
    aspect: 'portrait',
    gradient: 'linear-gradient(170deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #6d28d9 75%, #7c3aed 100%)',
  },
  {
    id: 6,
    title: '바다 유리',
    location: '친퀘테레, 이탈리아',
    aspect: 'landscape',
    gradient: 'linear-gradient(130deg, #0c4a6e 0%, #0369a1 30%, #0ea5e9 60%, #38bdf8 85%, #7dd3fc 100%)',
  },
  {
    id: 7,
    title: '벚꽃의 계절',
    location: '교토, 일본',
    aspect: 'portrait',
    gradient: 'linear-gradient(155deg, #fdf2f8 0%, #fce7f3 25%, #fbcfe8 55%, #f9a8d4 80%, #f472b6 100%)',
  },
  {
    id: 8,
    title: '흑요석 해안',
    location: '레이캬비크, 아이슬란드',
    aspect: 'square',
    gradient: 'linear-gradient(140deg, #18181b 0%, #27272a 30%, #3f3f46 55%, #52525b 80%, #71717a 100%)',
  },
  {
    id: 9,
    title: '구리빛 협곡',
    location: '치와와, 멕시코',
    aspect: 'landscape',
    gradient: 'linear-gradient(125deg, #431407 0%, #7c2d12 25%, #b45309 50%, #d97706 75%, #92400e 100%)',
  },
  {
    id: 10,
    title: '오로라',
    location: '트롬쇠, 노르웨이',
    aspect: 'portrait',
    gradient: 'linear-gradient(160deg, #020617 0%, #0c1445 20%, #064e3b 45%, #065f46 65%, #0f766e 85%, #0ea5e9 100%)',
  },
  {
    id: 11,
    title: '라벤더 들판',
    location: '프로방스, 프랑스',
    aspect: 'landscape',
    gradient: 'linear-gradient(140deg, #2e1065 0%, #4c1d95 25%, #6d28d9 50%, #8b5cf6 75%, #a78bfa 100%)',
  },
  {
    id: 12,
    title: '소금 사막',
    location: '살라르 데 우유니, 볼리비아',
    aspect: 'square',
    gradient: 'linear-gradient(110deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 55%, #bfdbfe 80%, #dbeafe 100%)',
  },
]

export const photographer = {
  name: 'Elena Vasquez',
  tagline: '빛. 그림자. 고요.',
  bio: '숨과 숨 사이의 고요한 순간을 쫓습니다 — 빛이 기억이 되기 직전, 그 찰나에 머무는 곳. 마드리드와 다음 프레임이 기다리는 어딘가를 오가며 작업합니다.',
  email: 'elena@vasquez.photo',
  instagram: '@elenavasquez',
}
