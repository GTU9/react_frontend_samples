// Tempo Music mock data

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  year: string
  format: string
  mood: string
  artUrl: string
}

export interface Playlist {
  id: string
  name: string
  trackCount: number
  artUrl: string
  description: string
}

export interface FeaturedBanner {
  id: string
  title: string
  subtitle: string
  description: string
  artUrl: string
}

const media = '/media/tempo-music'

export const tracks: Track[] = [
  {
    id: 't1',
    title: '따뜻한 바늘',
    artist: '윤하늘',
    album: 'Room Tone',
    duration: 212,
    year: '2024',
    format: '싱글',
    mood: 'indie',
    artUrl: `${media}/turntable-close.jpg`,
  },
  {
    id: 't2',
    title: '파도는 알고 있다',
    artist: '서쪽 바다',
    album: 'Blue Hour Notes',
    duration: 184,
    year: '2024',
    format: 'EP',
    mood: 'ambient',
    artUrl: `${media}/ocean-waves.jpg`,
  },
  {
    id: 't3',
    title: '먼지 낀 오후',
    artist: '레코드 클럽',
    album: 'Bin 12',
    duration: 237,
    year: '2023',
    format: '앨범',
    mood: 'folk',
    artUrl: `${media}/vinyl-store.jpg`,
  },
  {
    id: 't4',
    title: '도시의 밤',
    artist: '카페 노이즈',
    album: 'Late Checkout',
    duration: 198,
    year: '2025',
    format: '싱글',
    mood: 'city',
    artUrl: `${media}/vintage-record-store.jpg`,
  },
  {
    id: 't5',
    title: 'LP로 만나는 오늘',
    artist: '아날로그 식당',
    album: 'Table Four',
    duration: 256,
    year: '2022',
    format: '앨범',
    mood: 'jazz',
    artUrl: `${media}/vinyl-store.jpg`,
  },
  {
    id: 't6',
    title: '작은 방의 노래',
    artist: '한결',
    album: 'Window Seat',
    duration: 204,
    year: '2024',
    format: 'EP',
    mood: 'quiet',
    artUrl: `${media}/turntable-close.jpg`,
  },
]

export const recentlyPlayed: Track[] = [tracks[0], tracks[1], tracks[4], tracks[2], tracks[5], tracks[3]]

export const madeForYou: Playlist[] = [
  {
    id: 'p1',
    name: '지금 주목할 인디',
    trackCount: 24,
    artUrl: `${media}/vinyl-store.jpg`,
    description: '새 싱글과 작은 레이블 발매작',
  },
  {
    id: 'p2',
    name: '봄에 듣기 좋은 노래',
    trackCount: 18,
    artUrl: `${media}/vintage-record-store.jpg`,
    description: '따뜻한 기타와 느린 리듬',
  },
  {
    id: 'p3',
    name: '조용한 집중을 위해',
    trackCount: 32,
    artUrl: `${media}/ocean-waves.jpg`,
    description: '작업대 옆에 둘 낮은 음량',
  },
  {
    id: 'p4',
    name: 'LP로 만나는 오늘',
    trackCount: 15,
    artUrl: `${media}/turntable-close.jpg`,
    description: '턴테이블 질감이 살아있는 선곡',
  },
]

export const libraryPlaylists = [
  { id: 'lib1', name: '찜한 음반', count: 143 },
  { id: 'lib2', name: '오늘 산 디지털', count: 41 },
  { id: 'lib3', name: '로컬 레이블', count: 28 },
  { id: 'lib4', name: '작업실 플레이', count: 33 },
  { id: 'lib5', name: '주말 아침', count: 19 },
]

export const featuredBanner: FeaturedBanner = {
  id: 'feat1',
  title: '윤하늘',
  subtitle: '새 싱글 미리듣기',
  description: '"따뜻한 바늘" — 실제 음원 없이 UI 상태만 시뮬레이션합니다.',
  artUrl: `${media}/turntable-close.jpg`,
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
