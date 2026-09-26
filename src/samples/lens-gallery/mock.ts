export type PhotoCategory = '전체' | '사람' | '도시' | '풍경' | '필름'

export interface Photo {
  id: number
  title: string
  location: string
  category: Exclude<PhotoCategory, '전체'>
  aspect: 'portrait' | 'landscape' | 'square'
  src: string
}

export const photos: Photo[] = [
  {
    id: 1,
    title: '횡단보도',
    location: '뉴욕, 미국',
    category: '도시',
    aspect: 'square',
    src: '/media/lens-gallery/crosswalk.jpg',
  },
  {
    id: 2,
    title: '열차 창가',
    location: '오슬로 근교',
    category: '사람',
    aspect: 'portrait',
    src: '/media/lens-gallery/train-window.jpg',
  },
  {
    id: 3,
    title: '긴 그림자',
    location: '시카고, 미국',
    category: '도시',
    aspect: 'landscape',
    src: '/media/lens-gallery/city-shadow.jpg',
  },
  {
    id: 4,
    title: '재팬 롤 17',
    location: '도쿄, 일본',
    category: '필름',
    aspect: 'square',
    src: '/media/lens-gallery/contact-sheet.jpg',
  },
  {
    id: 5,
    title: '플랫폼 사이',
    location: '교토, 일본',
    category: '사람',
    aspect: 'landscape',
    src: '/media/lens-gallery/contact-sheet.jpg',
  },
  {
    id: 6,
    title: '비 오는 골목',
    location: '맨체스터, 영국',
    category: '도시',
    aspect: 'portrait',
    src: '/media/lens-gallery/city-shadow.jpg',
  },
  {
    id: 7,
    title: '강변의 등',
    location: '한강, 서울',
    category: '풍경',
    aspect: 'landscape',
    src: '/media/lens-gallery/train-window.jpg',
  },
  {
    id: 8,
    title: '콘택트 프린트',
    location: '암실',
    category: '필름',
    aspect: 'square',
    src: '/media/lens-gallery/contact-sheet.jpg',
  },
]

export const categories: PhotoCategory[] = ['전체', '사람', '도시', '풍경', '필름']

export const photographer = {
  name: 'Lens / Hyeon Park',
  tagline: '보는 것이, 기억이 된다.',
  bio: '도시의 표면과 사람의 침묵을 흑백 필름으로 기록합니다. 연락지에서 시작해 한 장의 프린트가 될 때까지, 선택의 흔적을 숨기지 않습니다.',
  email: 'contact@lens.kr',
  instagram: '@hyeon.lens',
}
