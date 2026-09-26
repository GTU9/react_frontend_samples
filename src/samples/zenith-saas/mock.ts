export const zenith = {
  brand: {
    name: 'Zenith',
    category: '리소스 계획 서비스',
    image: '/media/zenith-saas/forest-planning.jpg',
  },
  nav: [
    { label: '제품', href: '#product' },
    { label: '일정', href: '#schedule' },
    { label: '운영', href: '#ops' },
    { label: '요금', href: '#pricing' },
  ],
  hero: {
    title: 'Zenith',
    subtitle: '사람과 프로젝트가 조화를 이루는 방식',
    body:
      '역량, 휴가, 의존성을 한 화면에 놓고 다음 분기의 일정을 현실적으로 조정합니다. 더 많이 넣는 도구가 아니라, 가능한 계획을 고르는 도구입니다.',
    primary: '계획 시작하기',
    secondary: '데모 보기',
  },
  filters: ['전체', '제품', '디자인', '엔지니어링'],
  people: [
    {
      name: '김민지',
      role: '프로덕트 리드',
      team: '제품',
      capacity: 100,
      bars: [
        { label: '모바일 앱 리디자인', start: 1, span: 3, tone: 'blue' },
        { label: '브랜드 가이드', start: 5, span: 2, tone: 'gray' },
      ],
    },
    {
      name: '이호준',
      role: '프론트엔드 개발',
      team: '엔지니어링',
      capacity: 80,
      bars: [
        { label: '웹 대시보드 고도화', start: 2, span: 4, tone: 'green' },
      ],
    },
    {
      name: '박서연',
      role: '데이터 엔지니어',
      team: '엔지니어링',
      capacity: 60,
      bars: [
        { label: '데이터 파이프라인', start: 1, span: 4, tone: 'moss' },
        { label: '분석 리포트', start: 6, span: 2, tone: 'gray' },
      ],
    },
    {
      name: '최영민',
      role: '브랜드 디자이너',
      team: '디자인',
      capacity: 50,
      bars: [
        { label: '런칭 캠페인', start: 1, span: 3, tone: 'ochre' },
        { label: '고객 인터뷰', start: 5, span: 2, tone: 'gray' },
      ],
    },
  ],
  dependencies: [
    { from: '데이터 파이프라인', to: '웹 대시보드 고도화', date: '4월 18일' },
    { from: '런칭 캠페인', to: '모바일 앱 리디자인', date: '4월 25일' },
    { from: '분석 리포트', to: '데이터 파이프라인', date: '5월 2일' },
  ],
  ops: [
    { title: '역량 기준 계획', body: '사람별 가능한 시간을 먼저 계산하고 프로젝트를 배치합니다.' },
    { title: '의존성 표시', body: '일정표 아래에서 막히는 관계를 바로 확인합니다.' },
    { title: '운영 업무 반영', body: '휴가, 온콜, 교육처럼 계획을 흔드는 일을 별도 용량으로 잡습니다.' },
  ],
  pricing: [
    { name: 'Team', price: '₩24,000', body: '팀 1개, 월간 계획, CSV 내보내기' },
    { name: 'Planning Office', price: '₩58,000', body: '여러 팀, 의존성 보기, 시나리오 복제' },
    { name: 'Enterprise', price: '맞춤', body: 'SSO, 감사 로그, 전용 온보딩' },
  ],
}
