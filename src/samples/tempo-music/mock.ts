// ── Tempo Music mock data ─────────────────────────────────────────────────

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: number // seconds
  gradient: string // CSS gradient for album art
}

export interface Playlist {
  id: string
  name: string
  trackCount: number
  gradient: string
}

export interface FeaturedBanner {
  id: string
  title: string
  subtitle: string
  description: string
  gradient: string
}

// ── Tracks ────────────────────────────────────────────────────────────────

export const tracks: Track[] = [
  {
    id: 't1',
    title: 'Neon Drift',
    artist: 'Synthwave Collective',
    album: 'After Midnight',
    duration: 212,
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  },
  {
    id: 't2',
    title: 'Violet Hours',
    artist: 'Luna Sable',
    album: 'Echoes in Purple',
    duration: 184,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  },
  {
    id: 't3',
    title: 'Crystal Static',
    artist: 'Prism Audio',
    album: 'Refraction',
    duration: 237,
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
  },
  {
    id: 't4',
    title: 'Pulse & Glow',
    artist: 'Haze Drive',
    album: 'Signal Night',
    duration: 198,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  },
  {
    id: 't5',
    title: 'Starfield Echo',
    artist: 'Cosmo Lens',
    album: 'Deep Orbit',
    duration: 256,
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)',
  },
  {
    id: 't6',
    title: 'Midnight Garden',
    artist: 'Flora System',
    album: 'Bloom Circuit',
    duration: 204,
    gradient: 'linear-gradient(135deg, #a855f7 0%, #14b8a6 100%)',
  },
]

// ── Recently played ────────────────────────────────────────────────────────

export const recentlyPlayed: Track[] = [tracks[0], tracks[1], tracks[4], tracks[2], tracks[5], tracks[3]]

// ── Made for you playlists ────────────────────────────────────────────────

export const madeForYou: Playlist[] = [
  {
    id: 'p1',
    name: 'Purple Haze Mix',
    trackCount: 24,
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  },
  {
    id: 'p2',
    name: 'Late Night Drive',
    trackCount: 18,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #6366f1 100%)',
  },
  {
    id: 'p3',
    name: 'Chillwave Radio',
    trackCount: 32,
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
  },
  {
    id: 'p4',
    name: 'Synthpop Essentials',
    trackCount: 15,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
  },
]

// ── Library playlists (sidebar) ────────────────────────────────────────────

export const libraryPlaylists = [
  { id: 'lib1', name: '좋아요 표시한 곡', count: 143 },
  { id: 'lib2', name: '집중 모드', count: 41 },
  { id: 'lib3', name: '저녁 감성', count: 28 },
  { id: 'lib4', name: '운동 비트', count: 33 },
  { id: 'lib5', name: '일요일 아침', count: 19 },
]

// ── Featured banner ────────────────────────────────────────────────────────

export const featuredBanner: FeaturedBanner = {
  id: 'feat1',
  title: 'Synthwave Collective',
  subtitle: '새 앨범 발매',
  description: '"After Midnight" — 네온빛 황홀감이 넘치는 12곡',
  gradient: 'linear-gradient(135deg, #3b0764 0%, #a855f7 45%, #ec4899 100%)',
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
