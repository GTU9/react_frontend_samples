/* ── Pulse Stream — Mock Data ───────────────────────────────── */

export interface Movie {
  id: string
  title: string
  year: number
  genre: string[]
  rating: string
  score: number
  duration: string
  synopsis: string
  /* gradient stops used as the "poster art" */
  posterGradient: string
  /* larger hero-style gradient */
  heroGradient: string
  top10Rank?: number
}

export interface ContentRow {
  id: string
  label: string
  movies: Movie[]
}

/* ── Featured hero ──────────────────────────────────────────── */
export const featured: Movie = {
  id: 'featured-1',
  title: '크림슨 호라이즌',
  year: 2025,
  genre: ['SF', '스릴러'],
  rating: 'PG-13',
  score: 9.2,
  duration: '2시간 18분',
  synopsis:
    '태양 폭풍으로 황폐해진 근미래 지구. 10년간의 심우주 탐사를 마치고 귀환한 고독한 우주비행사는 인류가 벼랑 끝에 서 있음을 발견한다. 시간과의 싸움 속에서 그녀는 지구의 모든 생명을 구하거나 멸망시킬 수도 있는 신호를 해독해야 한다.',
  posterGradient: 'linear-gradient(135deg, #1a0010 0%, #5c0a2e 40%, #e11d48 80%, #ff6b9d 100%)',
  heroGradient:
    'linear-gradient(to right, #0a0010 0%, #1a0020 30%, #3d0020 60%, #e11d4820 100%)',
}

/* ── Content rows ────────────────────────────────────────────── */
const trendingMovies: Movie[] = [
  {
    id: 't1',
    title: '네온 레퀴엠',
    year: 2025,
    genre: ['액션', '사이버펑크'],
    rating: 'R',
    score: 8.7,
    duration: '2시간 4분',
    synopsis: '잠들지 않는 도시에서 사이버펑크 청부 살인마가 마지막 계약을 수행한다.',
    posterGradient: 'linear-gradient(160deg, #0f0f23 0%, #1a1a4e 50%, #6366f1 100%)',
    heroGradient: 'linear-gradient(135deg, #0f0f23, #6366f1)',
  },
  {
    id: 't2',
    title: '소금과 그림자',
    year: 2024,
    genre: ['드라마', '미스터리'],
    rating: 'PG-13',
    score: 8.3,
    duration: '1시간 52분',
    synopsis: '두 낯선 사람이 같은 반복되는 꿈을 꾸며, 같은 적을 공유하고 있음을 발견한다.',
    posterGradient: 'linear-gradient(160deg, #101820 0%, #2c4a3e 50%, #38bdf8 100%)',
    heroGradient: 'linear-gradient(135deg, #101820, #38bdf8)',
  },
  {
    id: 't3',
    title: '벨벳 프로토콜',
    year: 2025,
    genre: ['스파이', '스릴러'],
    rating: 'PG-13',
    score: 8.9,
    duration: '2시간 11분',
    synopsis: '은퇴를 앞둔 스파이가 최고위층에서 벌어지는 음모를 발견한다.',
    posterGradient: 'linear-gradient(160deg, #1a0a00 0%, #7c2d12 50%, #f97316 100%)',
    heroGradient: 'linear-gradient(135deg, #1a0a00, #f97316)',
  },
  {
    id: 't4',
    title: '부서진 빛',
    year: 2025,
    genre: ['SF', '드라마'],
    rating: 'PG',
    score: 7.9,
    duration: '1시간 48분',
    synopsis: '한 물리학자가 깨진 유리를 통해 평행 시간선을 볼 수 있는 방법을 발견한다.',
    posterGradient: 'linear-gradient(160deg, #0a1628 0%, #1e3a5f 50%, #a78bfa 100%)',
    heroGradient: 'linear-gradient(135deg, #0a1628, #a78bfa)',
  },
  {
    id: 't5',
    title: '에코 챔버',
    year: 2024,
    genre: ['공포', '심리'],
    rating: 'R',
    score: 8.1,
    duration: '1시간 59분',
    synopsis: '음향 엔지니어가 자신의 녹음을 통해 낯선 이들의 생각을 듣기 시작한다.',
    posterGradient: 'linear-gradient(160deg, #0d0d0d 0%, #1f1f2e 50%, #4c1d95 100%)',
    heroGradient: 'linear-gradient(135deg, #0d0d0d, #4c1d95)',
  },
  {
    id: 't6',
    title: '라스트 메리디안',
    year: 2025,
    genre: ['어드벤처', '대서사'],
    rating: 'PG-13',
    score: 9.0,
    duration: '2시간 34분',
    synopsis: '아무도 믿지 않는 전설을 좇아 미지의 바다를 가로지르는 장대한 항해.',
    posterGradient: 'linear-gradient(160deg, #001a0f 0%, #064e3b 50%, #10b981 100%)',
    heroGradient: 'linear-gradient(135deg, #001a0f, #10b981)',
  },
]

const newReleasesMovies: Movie[] = [
  {
    id: 'n1',
    title: '오빗 제로',
    year: 2025,
    genre: ['SF', '액션'],
    rating: 'PG-13',
    score: 8.4,
    duration: '2시간 2분',
    synopsis: '궤도에 고립된 우주비행사들이 대기권 재진입 전 죽어가는 위성의 경로를 변경해야 한다.',
    posterGradient: 'linear-gradient(160deg, #020617 0%, #0c1445 50%, #3b82f6 100%)',
    heroGradient: 'linear-gradient(135deg, #020617, #3b82f6)',
  },
  {
    id: 'n2',
    title: '유리 늑대들',
    year: 2025,
    genre: ['범죄', '드라마'],
    rating: 'R',
    score: 8.6,
    duration: '1시간 57분',
    synopsis: '두 범죄 가문 사이의 위태로운 평화가 단 하나의 배신으로 산산조각 난다.',
    posterGradient: 'linear-gradient(160deg, #0a0a0a 0%, #2d2d2d 50%, #6b7280 100%)',
    heroGradient: 'linear-gradient(135deg, #0a0a0a, #6b7280)',
  },
  {
    id: 'n3',
    title: '인디고 레인',
    year: 2025,
    genre: ['로맨스', '드라마'],
    rating: 'PG',
    score: 7.8,
    duration: '1시간 44분',
    synopsis: '몬순을 피해 같은 곳에 피신한 두 낯선 사람이 예상치 못한 연결을 발견한다.',
    posterGradient: 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #818cf8 100%)',
    heroGradient: 'linear-gradient(135deg, #0f0c29, #818cf8)',
  },
  {
    id: 'n4',
    title: '타이탄폴',
    year: 2025,
    genre: ['액션', '메카'],
    rating: 'PG-13',
    score: 8.2,
    duration: '2시간 15분',
    synopsis: '테라포밍된 화성의 폐허에서 거대 메카들이 격돌한다.',
    posterGradient: 'linear-gradient(160deg, #1a0800 0%, #7c3a00 50%, #fb923c 100%)',
    heroGradient: 'linear-gradient(135deg, #1a0800, #fb923c)',
  },
  {
    id: 'n5',
    title: '위스퍼 네트워크',
    year: 2025,
    genre: ['스릴러', '테크'],
    rating: 'PG-13',
    score: 8.0,
    duration: '1시간 51분',
    synopsis: '익명의 내부 고발자가 감시 국가의 내부에서 실체를 폭로한다.',
    posterGradient: 'linear-gradient(160deg, #001a1a 0%, #0f4c4c 50%, #22d3ee 100%)',
    heroGradient: 'linear-gradient(135deg, #001a1a, #22d3ee)',
  },
  {
    id: 'n6',
    title: '불타는 아카이브',
    year: 2025,
    genre: ['역사', '전쟁'],
    rating: 'R',
    score: 9.1,
    duration: '2시간 41분',
    synopsis: '전시 점령기에 한 사서가 금지된 기록물을 지키기 위해 모든 것을 건다.',
    posterGradient: 'linear-gradient(160deg, #1a0500 0%, #92400e 50%, #fbbf24 100%)',
    heroGradient: 'linear-gradient(135deg, #1a0500, #fbbf24)',
  },
]

const top10Movies: Movie[] = [
  { ...trendingMovies[5], id: 'top1', top10Rank: 1 },
  { ...newReleasesMovies[5], id: 'top2', top10Rank: 2 },
  { ...trendingMovies[2], id: 'top3', top10Rank: 3 },
  { ...featured, id: 'top4', top10Rank: 4 },
  { ...trendingMovies[0], id: 'top5', top10Rank: 5 },
  { ...newReleasesMovies[0], id: 'top6', top10Rank: 6 },
  { ...trendingMovies[4], id: 'top7', top10Rank: 7 },
  { ...newReleasesMovies[3], id: 'top8', top10Rank: 8 },
  { ...trendingMovies[3], id: 'top9', top10Rank: 9 },
  { ...newReleasesMovies[2], id: 'top10', top10Rank: 10 },
]

const continueWatchingMovies: Movie[] = [
  {
    id: 'cw1',
    title: '네온 레퀴엠',
    year: 2025,
    genre: ['액션', '사이버펑크'],
    rating: 'R',
    score: 8.7,
    duration: '2시간 4분',
    synopsis: '잠들지 않는 도시에서 사이버펑크 청부 살인마가 마지막 계약을 수행한다.',
    posterGradient: 'linear-gradient(160deg, #0f0f23 0%, #1a1a4e 50%, #6366f1 100%)',
    heroGradient: 'linear-gradient(135deg, #0f0f23, #6366f1)',
  },
  {
    id: 'cw2',
    title: '크림슨 호라이즌',
    year: 2025,
    genre: ['SF', '스릴러'],
    rating: 'PG-13',
    score: 9.2,
    duration: '2시간 18분',
    synopsis: '우주비행사가 귀환하여 인류가 벼랑 끝에 서 있음을 발견한다.',
    posterGradient: 'linear-gradient(135deg, #1a0010 0%, #5c0a2e 40%, #e11d48 80%, #ff6b9d 100%)',
    heroGradient: 'linear-gradient(to right, #0a0010, #e11d4820)',
  },
  {
    id: 'cw3',
    title: '라스트 메리디안',
    year: 2025,
    genre: ['어드벤처', '대서사'],
    rating: 'PG-13',
    score: 9.0,
    duration: '2시간 34분',
    synopsis: '미지의 바다를 가로지르는 장대한 항해.',
    posterGradient: 'linear-gradient(160deg, #001a0f 0%, #064e3b 50%, #10b981 100%)',
    heroGradient: 'linear-gradient(135deg, #001a0f, #10b981)',
  },
  {
    id: 'cw4',
    title: '위스퍼 네트워크',
    year: 2025,
    genre: ['스릴러', '테크'],
    rating: 'PG-13',
    score: 8.0,
    duration: '1시간 51분',
    synopsis: '익명의 내부 고발자가 감시 국가의 실체를 폭로한다.',
    posterGradient: 'linear-gradient(160deg, #001a1a 0%, #0f4c4c 50%, #22d3ee 100%)',
    heroGradient: 'linear-gradient(135deg, #001a1a, #22d3ee)',
  },
]

export const continueWatchingProgress: Record<string, number> = {
  cw1: 62,
  cw2: 28,
  cw3: 81,
  cw4: 45,
}

export const contentRows: ContentRow[] = [
  { id: 'trending', label: '지금 뜨는 콘텐츠', movies: trendingMovies },
  { id: 'new-releases', label: '신작', movies: newReleasesMovies },
  { id: 'top10', label: '오늘 PulseStream TOP 10', movies: top10Movies },
  { id: 'continue', label: '이어보기', movies: continueWatchingMovies },
]

export const navItems = ['홈', '영화', '시리즈', '내 리스트'] as const

export const footerLinks = [
  { label: '자주 묻는 질문', href: '#' },
  { label: '고객센터', href: '#' },
  { label: '이용약관', href: '#' },
  { label: '개인정보처리방침', href: '#' },
  { label: '쿠키 설정', href: '#' },
  { label: '회사 정보', href: '#' },
] as const
