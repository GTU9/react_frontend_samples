export const aurora = {
  nav: [
    { label: '제품', href: '#product' },
    { label: '릴리스 플랜', href: '#plan' },
    { label: '운영 방식', href: '#workflow' },
    { label: '요금', href: '#pricing' },
  ],
  hero: {
    title: 'Aurora',
    category: '릴리스 협업 워크스페이스',
    copy:
      '기획, 디자인, 개발, QA가 하나의 출시 계획 위에서 같은 결정을 보게 합니다. 회의록보다 실행 항목이 먼저 남는 협업 제품입니다.',
    primary: '릴리스 플랜 열기',
    secondary: '데모 보기',
  },
  releaseRows: [
    {
      id: 'r1',
      task: '결제 API 인증 이슈',
      owner: '김서연',
      team: 'Backend',
      due: '4월 26일',
      status: '차단',
      detail:
        '외부 결제 승인 콜백이 스테이징에서 간헐적으로 실패합니다. 보안 검토 전까지 배포 잠금.',
    },
    {
      id: 'r2',
      task: '모바일 온보딩 개선',
      owner: '이준호',
      team: 'Product',
      due: '5월 3일',
      status: '진행 중',
      detail:
        '가입 후 첫 프로젝트 생성까지의 빈 화면을 줄이고, 기존 고객 데이터로 체크리스트를 구성합니다.',
    },
    {
      id: 'r3',
      task: '릴리스 노트 초안',
      owner: '박다은',
      team: 'Marketing',
      due: '5월 10일',
      status: '검토',
      detail:
        'Q2 고객군별 메시지를 정리했습니다. 제품 스크린샷 교체와 법무 문구 확인이 남았습니다.',
    },
    {
      id: 'r4',
      task: '관리자 권한 로그',
      owner: '최민재',
      team: 'Security',
      due: '5월 17일',
      status: '계획됨',
      detail:
        '릴리스 후 감사 대응을 위해 권한 변경 이력을 별도 스트림으로 노출합니다.',
    },
  ],
  comments: [
    { author: '김서연', time: '오늘 10:24', body: '결제사 응답 예외를 재현했습니다. 오후에 패치 후보를 올립니다.' },
    { author: '이준호', time: '오늘 11:03', body: '온보딩 문구는 확정. 디자인 QA만 끝나면 병합 가능합니다.' },
  ],
  workflow: [
    {
      title: '결정이 묻히지 않게',
      body: '회의에서 정한 범위, 담당자, 마감일을 릴리스 행에 바로 연결합니다.',
    },
    {
      title: '막힌 항목을 먼저',
      body: '차단 상태와 의존성을 상단에 올려 다음 회의 전에 해결 경로를 만듭니다.',
    },
    {
      title: '출시 문맥 유지',
      body: '릴리스 노트, QA 체크, 고객 안내 문구가 같은 계획 안에서 이어집니다.',
    },
  ],
  pricing: [
    { name: 'Pilot', price: '무료', body: '릴리스 2개, 팀원 8명, 기본 코멘트 기록' },
    { name: 'Team', price: '₩18,000', body: '릴리스 무제한, 의존성 보기, 승인 흐름' },
    { name: 'Studio', price: '맞춤', body: 'SSO, 감사 로그, 보안 검토 워크플로' },
  ],
}
