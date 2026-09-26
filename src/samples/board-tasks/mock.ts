// board-tasks mock data

export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type LabelColor = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'teal'

export interface Label {
  id: string
  text: string
  color: LabelColor
}

export interface Member {
  id: string
  initials: string
  name: string
  color: string
}

export interface ChecklistItem {
  id: string
  done: boolean
  text: string
}

export interface Task {
  id: string
  title: string
  label: Label
  priority: Priority
  assignee: Member
  dueDate: string
  checklist: ChecklistItem[]
  comments: number
  attachments: number
}

export interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}

export interface Project {
  id: string
  name: string
  emoji: string
  taskCount: number
}

// ── Members ────────────────────────────────────────────────────────────────

export const members: Member[] = [
  { id: 'm1', initials: '안', name: '안지훈', color: '#111111' },
  { id: 'm2', initials: '서', name: '서리나', color: '#7b672a' },
  { id: 'm3', initials: '김', name: '김태오', color: '#236b4f' },
  { id: 'm4', initials: '박', name: '박라희', color: '#9b5144' },
  { id: 'm5', initials: '단', name: '단우석', color: '#3f6f75' },
]

// ── Projects sidebar ───────────────────────────────────────────────────────

export const projects: Project[] = [
  { id: 'p1', name: '웹사이트 리디자인', emoji: '웹', taskCount: 18 },
  { id: 'p2', name: '모바일 앱 v2', emoji: '앱', taskCount: 31 },
  { id: 'p3', name: 'API 연동', emoji: '연', taskCount: 12 },
  { id: 'p4', name: '디자인 시스템', emoji: '디', taskCount: 9 },
  { id: 'p5', name: '마케팅 스프린트', emoji: '마', taskCount: 7 },
]

// ── Kanban columns ─────────────────────────────────────────────────────────

export const initialColumns: Column[] = [
  {
    id: 'backlog',
    title: '백로그',
    color: '#94a3b8',
    tasks: [
      {
        id: 't1',
        title: '폼 컴포넌트 접근성 감사',
        label: { id: 'l1', text: '접근성', color: 'blue' },
        priority: 'medium',
        assignee: members[2],
        dueDate: '7월 10일',
        checklist: [
          { id: 'c1', done: false, text: '색상 대비 검사' },
          { id: 'c2', done: false, text: '스크린 리더 테스트' },
          { id: 'c3', done: false, text: '키보드 내비게이션 검토' },
        ],
        comments: 2,
        attachments: 0,
      },
      {
        id: 't2',
        title: '경쟁사 온보딩 흐름 조사',
        label: { id: 'l2', text: '리서치', color: 'purple' },
        priority: 'low',
        assignee: members[3],
        dueDate: '7월 15일',
        checklist: [
          { id: 'c4', done: true,  text: '상위 5개 경쟁사 선정' },
          { id: 'c5', done: false, text: 'UX 패턴 문서화' },
        ],
        comments: 0,
        attachments: 1,
      },
      {
        id: 't3',
        title: '오류 모니터링 설정 (Sentry)',
        label: { id: 'l3', text: '배포', color: 'teal' },
        priority: 'medium',
        assignee: members[4],
        dueDate: '7월 8일',
        checklist: [
          { id: 'c6', done: false, text: 'Sentry 프로젝트 생성' },
          { id: 'c7', done: false, text: 'SDK 연동' },
          { id: 'c8', done: false, text: '알림 설정' },
          { id: 'c9', done: false, text: '오류 캡처 테스트' },
        ],
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: 'todo',
    title: '할 일',
    color: '#d7a514',
    tasks: [
      {
        id: 't4',
        title: '내비게이션 헤더 리디자인',
        label: { id: 'l4', text: '디자인', color: 'purple' },
        priority: 'high',
        assignee: members[1],
        dueDate: '6월 28일',
        checklist: [
          { id: 'c10', done: true,  text: '와이어프레임' },
          { id: 'c11', done: true,  text: '하이파이 목업' },
          { id: 'c12', done: false, text: '개발자 핸드오프' },
        ],
        comments: 5,
        attachments: 3,
      },
      {
        id: 't5',
        title: '인증 모듈 단위 테스트 작성',
        label: { id: 'l5', text: '테스트', color: 'green' },
        priority: 'high',
        assignee: members[0],
        dueDate: '6월 25일',
        checklist: [
          { id: 'c13', done: false, text: '로그인 흐름 테스트' },
          { id: 'c14', done: false, text: '토큰 갱신 테스트' },
          { id: 'c15', done: false, text: '엣지 케이스 커버리지' },
        ],
        comments: 3,
        attachments: 0,
      },
      {
        id: 't6',
        title: 'API 요청 제한 문서 업데이트',
        label: { id: 'l6', text: '문서', color: 'orange' },
        priority: 'low',
        assignee: members[2],
        dueDate: '7월 2일',
        checklist: [
          { id: 'c16', done: true,  text: '기존 문서 검토' },
          { id: 'c17', done: false, text: '새 엔드포인트 예시 추가' },
        ],
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: 'inprogress',
    title: '진행 중',
    color: '#f59e0b',
    tasks: [
      {
        id: 't7',
        title: '결제 흐름 UI 개발',
        label: { id: 'l7', text: '프론트엔드', color: 'blue' },
        priority: 'urgent',
        assignee: members[0],
        dueDate: '6월 20일',
        checklist: [
          { id: 'c18', done: true,  text: '장바구니 요약 컴포넌트' },
          { id: 'c19', done: true,  text: '배송지 입력 폼' },
          { id: 'c20', done: false, text: '결제 단계' },
          { id: 'c21', done: false, text: '주문 완료 화면' },
        ],
        comments: 8,
        attachments: 2,
      },
      {
        id: 't8',
        title: '데이터베이스 PostgreSQL 16 마이그레이션',
        label: { id: 'l8', text: '백엔드', color: 'teal' },
        priority: 'high',
        assignee: members[4],
        dueDate: '6월 22일',
        checklist: [
          { id: 'c22', done: true,  text: '현재 DB 백업' },
          { id: 'c23', done: true,  text: '마이그레이션 스크립트 테스트' },
          { id: 'c24', done: false, text: '스테이징 환경 실행' },
          { id: 'c25', done: false, text: '프로덕션 전환' },
        ],
        comments: 4,
        attachments: 1,
      },
      {
        id: 't9',
        title: '온보딩 이메일 시퀀스 작성',
        label: { id: 'l9', text: '마케팅', color: 'orange' },
        priority: 'medium',
        assignee: members[3],
        dueDate: '6월 30일',
        checklist: [
          { id: 'c26', done: true,  text: '이메일 초안 작성' },
          { id: 'c27', done: false, text: '템플릿 디자인' },
        ],
        comments: 2,
        attachments: 1,
      },
    ],
  },
  {
    id: 'done',
    title: '완료',
    color: '#10b981',
    tasks: [
      {
        id: 't10',
        title: '스테이징 환경 배포',
        label: { id: 'l10', text: '배포', color: 'teal' },
        priority: 'high',
        assignee: members[4],
        dueDate: '6월 12일',
        checklist: [
          { id: 'c28', done: true, text: 'CI/CD 파이프라인 설정' },
          { id: 'c29', done: true, text: '환경 변수 설정' },
          { id: 'c30', done: true, text: '스모크 테스트 배포' },
        ],
        comments: 3,
        attachments: 0,
      },
      {
        id: 't11',
        title: '디자인 토큰 시스템 정의',
        label: { id: 'l11', text: '디자인', color: 'purple' },
        priority: 'medium',
        assignee: members[1],
        dueDate: '6월 10일',
        checklist: [
          { id: 'c31', done: true, text: '색상 팔레트' },
          { id: 'c32', done: true, text: '타이포그래피 스케일' },
          { id: 'c33', done: true, text: '간격 시스템' },
        ],
        comments: 6,
        attachments: 4,
      },
      {
        id: 't12',
        title: '사용자 인터뷰 종합 보고서',
        label: { id: 'l12', text: '리서치', color: 'purple' },
        priority: 'medium',
        assignee: members[3],
        dueDate: '6월 8일',
        checklist: [
          { id: 'c34', done: true, text: '인터뷰 8건 진행' },
          { id: 'c35', done: true, text: '친화도 맵핑' },
          { id: 'c36', done: true, text: '종합 문서 작성' },
        ],
        comments: 4,
        attachments: 2,
      },
    ],
  },
]

export const viewTabs = ['보드', '목록', '타임라인', '캘린더']
