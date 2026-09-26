// Converse Chat mock data

export interface Participant {
  id: string
  name: string
  avatar: string
  avatarColor: string
  online: boolean
  role?: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  dateMs: number
}

export interface Conversation {
  id: string
  participant: Participant
  messages: Message[]
  unreadCount: number
}

const ME: Participant = {
  id: 'me',
  name: '나',
  avatar: '나',
  avatarColor: '#245b8f',
  online: true,
}

const CHANNEL_ALL: Participant = {
  id: 'all',
  name: '# 전체',
  avatar: '#',
  avatarColor: '#2f6f9f',
  online: true,
  role: '운영팀 채널',
}

const CHANNEL_PRODUCT: Participant = {
  id: 'product',
  name: '# 제품',
  avatar: '#',
  avatarColor: '#487fa9',
  online: true,
  role: '기획과 디자인',
}

const THREAD_SUPPORT: Participant = {
  id: 'support',
  name: '고객지원 스레드',
  avatar: 'T',
  avatarColor: '#6e8fa8',
  online: true,
  role: '답변 검토',
}

const KIM: Participant = {
  id: 'kim',
  name: '김서연',
  avatar: '김',
  avatarColor: '#1f5f8d',
  online: true,
  role: '제품 디자이너',
}

const LEE: Participant = {
  id: 'lee',
  name: '이준호',
  avatar: '이',
  avatarColor: '#6b7d8d',
  online: true,
  role: '프론트엔드 엔지니어',
}

const PARK: Participant = {
  id: 'park',
  name: '박민지',
  avatar: '박',
  avatarColor: '#b0703d',
  online: false,
  role: 'QA 엔지니어',
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    participant: CHANNEL_ALL,
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'all', text: '이번 주 금요일 사용자 인터뷰 준비 상황 공유드립니다.', timestamp: 'Today 10:14 AM', dateMs: 100 },
      { id: 'm2', senderId: 'me', text: '대상자 5명 확정했고 인터뷰 가이드 초안 작성 완료했습니다.', timestamp: 'Today 10:16 AM', dateMs: 101 },
      { id: 'm3', senderId: 'all', text: '녹화 장비 대여 신청도 완료됐나요?', timestamp: 'Today 10:18 AM', dateMs: 102 },
      { id: 'm4', senderId: 'me', text: '네, 회의실 B와 장비 모두 예약했습니다.', timestamp: 'Today 10:20 AM', dateMs: 103 },
      { id: 'm5', senderId: 'all', text: '추가로 확인할 내용 있으면 오늘 4시 전까지 남겨주세요.', timestamp: 'Today 10:24 AM', dateMs: 104 },
    ],
  },
  {
    id: 'c2',
    participant: CHANNEL_PRODUCT,
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'product', text: '온보딩 문구에서 “빠르게 시작” 대신 “처음 설정하기”가 더 명확해 보여요.', timestamp: 'Yesterday 3:45 PM', dateMs: 1 },
      { id: 'm2', senderId: 'me', text: '동의해요. 첫 단계가 계정 설정이라 행동이 더 정확히 드러납니다.', timestamp: 'Yesterday 3:47 PM', dateMs: 2 },
      { id: 'm3', senderId: 'product', text: '그럼 버튼과 도움말 문구 같이 바꿔서 공유할게요.', timestamp: 'Yesterday 3:50 PM', dateMs: 3 },
      { id: 'm4', senderId: 'me', text: '좋아요. QA가 볼 수 있게 변경 요약도 붙여주세요.', timestamp: 'Yesterday 3:52 PM', dateMs: 4 },
    ],
  },
  {
    id: 'c3',
    participant: THREAD_SUPPORT,
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'support', text: '엔터프라이즈 고객이 CSV 내보내기 실패를 신고했습니다.', timestamp: 'Today 8:30 AM', dateMs: 1 },
      { id: 'm2', senderId: 'me', text: '재현 조건이 특정 브라우저인가요?', timestamp: 'Today 8:32 AM', dateMs: 2 },
      { id: 'm3', senderId: 'support', text: 'Safari 17 이상에서만 발생하고, 파일명에 한글이 포함될 때 실패합니다.', timestamp: 'Today 8:34 AM', dateMs: 3 },
      { id: 'm4', senderId: 'me', text: '인코딩 처리 확인해볼게요. 버그 번호 붙여주세요.', timestamp: 'Today 8:36 AM', dateMs: 4 },
      { id: 'm5', senderId: 'support', text: 'BUG-482로 등록했습니다.', timestamp: 'Today 9:02 AM', dateMs: 5 },
    ],
  },
  {
    id: 'c4',
    participant: KIM,
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'kim', text: '컴포넌트 라이브러리 색상 토큰 정리해서 올렸어요.', timestamp: 'Mon 9:10 AM', dateMs: 1 },
      { id: 'm2', senderId: 'me', text: '확인했습니다. 포커스 색상만 접근성 대비를 다시 볼게요.', timestamp: 'Mon 9:12 AM', dateMs: 2 },
      { id: 'm3', senderId: 'kim', text: '좋아요. 모바일 탭 상태도 같이 봐주세요.', timestamp: 'Mon 9:13 AM', dateMs: 3 },
    ],
  },
  {
    id: 'c5',
    participant: LEE,
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'lee', text: '검색 API 캐시 적용 후 응답 시간이 평균 45ms까지 줄었습니다.', timestamp: 'Fri 11:33 AM', dateMs: 1 },
      { id: 'm2', senderId: 'me', text: '좋네요. 대시보드에 전후 비교를 한 줄로 남겨주세요.', timestamp: 'Fri 11:35 AM', dateMs: 2 },
      { id: 'm3', senderId: 'lee', text: '오늘 배포 노트에 포함하겠습니다.', timestamp: 'Fri 11:38 AM', dateMs: 3 },
    ],
  },
  {
    id: 'c6',
    participant: PARK,
    unreadCount: 3,
    messages: [
      { id: 'm1', senderId: 'park', text: '결제 흐름 회귀 테스트 결과를 정리했습니다.', timestamp: 'Today 11:03 AM', dateMs: 1 },
      { id: 'm2', senderId: 'me', text: '차단 이슈가 있나요?', timestamp: 'Today 11:04 AM', dateMs: 2 },
      { id: 'm3', senderId: 'park', text: '프로모 코드 입력창 포커스 이탈만 남았습니다.', timestamp: 'Today 11:05 AM', dateMs: 3 },
      { id: 'm4', senderId: 'park', text: '재현 단계와 브라우저 정보를 스레드에 붙여뒀어요.', timestamp: 'Today 11:06 AM', dateMs: 4 },
    ],
  },
]

export type { Participant as ParticipantType }
export { ME }
