export const studioName = 'Atelier Grid'

export const navLinks = [
  { label: '프로젝트', href: '#work' },
  { label: '스튜디오', href: '#studio' },
  { label: '방법', href: '#method' },
  { label: '연락', href: '#contact' },
]

export const heroStatement = {
  line1: '좋은 공간은',
  line2: '좋은 편집에서',
  line3: '시작된다.',
  sub: '건축, 그래픽, 사이니지를 하나의 질서로 묶는 서울 기반 디자인 스튜디오.',
}

export interface Work {
  index: string
  project: string
  client: string
  year: string
  discipline: string
  location: string
  image: string
  brief: string
  scope: string[]
}

export const works: Work[] = [
  {
    index: '01',
    project: '서촌 커뮤니티 센터',
    client: 'Jongno Civic Lab',
    year: '2025',
    discipline: '건축 그래픽 / 웨이파인딩',
    location: 'Seoul',
    image: '/media/atelier-studio/red-model-studio.jpg',
    brief: '오래된 동네의 생활 반경을 해치지 않는 공공 프로그램과 내부 길찾기 체계.',
    scope: ['현장 리서치', '환경 그래픽', '프로젝트 북'],
  },
  {
    index: '02',
    project: '브랜드 아카이브 룸',
    client: 'More Human Spaces',
    year: '2024',
    discipline: '아이덴티티 / 전시',
    location: 'Basel',
    image: '/media/atelier-studio/model-assembly.jpg',
    brief: '건축 모형, 종이 사양서, 디지털 기록을 하나의 열람 경험으로 엮은 쇼룸.',
    scope: ['브랜드 시스템', '전시 동선', '인쇄물'],
  },
  {
    index: '03',
    project: '북엔드 도서관',
    client: 'Page Foundation',
    year: '2023',
    discipline: '공간 / 편집 디자인',
    location: 'Incheon',
    image: '/media/atelier-studio/red-model-studio.jpg',
    brief: '작은 도서관의 서가 번호, 포스터, 회원 카드를 모두 같은 그리드로 재정렬.',
    scope: ['사인 시스템', '편집 템플릿', '운영 매뉴얼'],
  },
]

export const services = [
  { number: '01', title: '공간 아이덴티티', desc: '건물의 사용 방식에서 출발한 로고, 색, 재료, 사인 규칙.' },
  { number: '02', title: '프로젝트 북', desc: '건축가와 클라이언트가 같은 문장으로 말할 수 있는 인쇄 편집.' },
  { number: '03', title: '전시 그래픽', desc: '모형, 도면, 사진, 텍스트가 한 호흡으로 읽히는 현장 구성.' },
  { number: '04', title: '디지털 아카이브', desc: '프로젝트 기록을 검색하고 다시 배치할 수 있는 웹 기반 도구.' },
]

export const manifesto = {
  label: '스튜디오 노트',
  headline: '우리는 장식보다 질서를 먼저 설계합니다.',
  body: [
    '처음 며칠은 도면보다 사용자의 이동을 봅니다. 어디서 멈추고, 어느 벽을 다시 읽고, 어떤 종이를 오래 들고 있는지 기록합니다.',
    '빨강은 장식색이 아니라 편집 부호입니다. 동선을 끊고, 중요한 문장을 다시 보게 하고, 흰 여백 위에 필요한 긴장을 만듭니다.',
    '작업의 끝은 납품 파일이 아니라 운영자가 스스로 고칠 수 있는 규칙입니다.',
  ],
  founded: '2014년 설립 / 서울 / 바젤 협업 네트워크',
}

export const contact = {
  email: 'studio@ateliergrid.kr',
  address: '서울 종로구 필운대로 12',
  instagram: '@atelier.grid',
}
