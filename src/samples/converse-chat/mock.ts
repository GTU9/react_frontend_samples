// converse-chat mock data

export interface Participant {
  id: string
  name: string
  avatar: string        // initials
  avatarColor: string
  online: boolean
  role?: string
}

export interface Message {
  id: string
  senderId: string      // matches Participant.id; 'me' = current user
  text: string
  timestamp: string     // display string
  dateMs: number        // for ordering
}

export interface Conversation {
  id: string
  participant: Participant
  messages: Message[]
  unreadCount: number
}

// ── Participants ──────────────────────────────────────────────────────────────

const ME: Participant = {
  id: 'me',
  name: 'You',
  avatar: 'ME',
  avatarColor: '#3b82f6',
  online: true,
}

const ALICE: Participant = {
  id: 'alice',
  name: 'Alice Park',
  avatar: 'AP',
  avatarColor: '#8b5cf6',
  online: true,
  role: 'Product Designer',
}

const BOB: Participant = {
  id: 'bob',
  name: 'Bob Chen',
  avatar: 'BC',
  avatarColor: '#10b981',
  online: false,
  role: 'Frontend Engineer',
}

const CAROL: Participant = {
  id: 'carol',
  name: 'Carol White',
  avatar: 'CW',
  avatarColor: '#f59e0b',
  online: true,
  role: 'Engineering Manager',
}

const DAN: Participant = {
  id: 'dan',
  name: 'Dan Miller',
  avatar: 'DM',
  avatarColor: '#ef4444',
  online: false,
  role: 'Backend Engineer',
}

const EVE: Participant = {
  id: 'eve',
  name: 'Eve Johnson',
  avatar: 'EJ',
  avatarColor: '#06b6d4',
  online: true,
  role: 'QA Engineer',
}

// ── Conversations ─────────────────────────────────────────────────────────────

export const conversations: Conversation[] = [
  {
    id: 'c1',
    participant: ALICE,
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'alice', text: '안녕! 새 디자인 스펙 봤어?', timestamp: 'Mon 9:10 AM', dateMs: 1 },
      { id: 'm2', senderId: 'me',    text: '방금 열어봤는데 — 새 내비 레이아웃 너무 좋다!', timestamp: 'Mon 9:12 AM', dateMs: 2 },
      { id: 'm3', senderId: 'alice', text: '그치? 모바일 버전이 좀 까다로웠어. 세 가지 방식을 다 시도해봤거든.', timestamp: 'Mon 9:13 AM', dateMs: 3 },
      { id: 'm4', senderId: 'me',    text: '하단 탭 방식이 모바일에서 확실히 더 자연스럽게 느껴지더라.', timestamp: 'Mon 9:15 AM', dateMs: 4 },
      { id: 'm5', senderId: 'alice', text: '맞아. 그리고 탭 전환할 때 햅틱 피드백 추가하는 건 어떻게 생각해?', timestamp: 'Mon 9:16 AM', dateMs: 5 },
      { id: 'm6', senderId: 'me',    text: 'MVP에는 과한 것 같고, v2에서 검토해보자.', timestamp: 'Mon 9:17 AM', dateMs: 6 },
      { id: 'm7', senderId: 'alice', text: '좋아. Figma에 메모해 놓을게.', timestamp: 'Mon 9:18 AM', dateMs: 7 },
      { id: 'm8', senderId: 'alice', text: '내일 아침에 컴포넌트 라이브러리 업데이트 같이 검토할 수 있을까?', timestamp: 'Today 10:24 AM', dateMs: 100 },
      { id: 'm9', senderId: 'alice', text: '다크 모드 색상 체계도 의견 좀 줘 🎨', timestamp: 'Today 10:25 AM', dateMs: 101 },
    ],
  },
  {
    id: 'c2',
    participant: BOB,
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'bob',  text: 'CI 빌드가 실패하고 있어. 인증 모듈에서 TS 오류가 나.', timestamp: 'Yesterday 3:45 PM', dateMs: 1 },
      { id: 'm2', senderId: 'me',   text: '최신 코드 받았어? 오늘 아침에 수정 푸시했거든.', timestamp: 'Yesterday 3:47 PM', dateMs: 2 },
      { id: 'm3', senderId: 'bob',  text: '아 — 해결됐다. 잘 찾았네!', timestamp: 'Yesterday 3:50 PM', dateMs: 3 },
      { id: 'm4', senderId: 'me',   text: '토큰 갱신 경로에서 null 체크가 빠져 있었어.', timestamp: 'Yesterday 3:52 PM', dateMs: 4 },
      { id: 'm5', senderId: 'bob',  text: '그렇구나. 그 케이스에 대한 테스트 추가해볼게.', timestamp: 'Yesterday 4:00 PM', dateMs: 5 },
      { id: 'm6', senderId: 'me',   text: '좋아, 도움 될 것 같아. mock 설정하다가 막히면 알려줘.', timestamp: 'Yesterday 4:02 PM', dateMs: 6 },
      { id: 'm7', senderId: 'bob',  text: '그럴게. 빠르게 처리해줘서 고마워 🙏', timestamp: 'Yesterday 4:05 PM', dateMs: 7 },
    ],
  },
  {
    id: 'c3',
    participant: CAROL,
    unreadCount: 1,
    messages: [
      { id: 'm1', senderId: 'carol', text: '참고로 — Q3 기획 회의가 목요일로 변경됐어요.', timestamp: 'Mon 2:00 PM', dateMs: 1 },
      { id: 'm2', senderId: 'me',    text: '알겠어요, 캘린더에 업데이트할게요.', timestamp: 'Mon 2:05 PM', dateMs: 2 },
      { id: 'm3', senderId: 'carol', text: '그리고 현재 스프린트 속도를 간단하게 정리해줄 수 있어요?', timestamp: 'Mon 2:06 PM', dateMs: 3 },
      { id: 'm4', senderId: 'me',    text: '네, 수요일 퇴근 전까지 정리해 드릴게요.', timestamp: 'Mon 2:10 PM', dateMs: 4 },
      { id: 'm5', senderId: 'carol', text: '좋아요, 고마워요! 한 가지 더 — 새 OKR 템플릿 확인해봤어요?', timestamp: 'Today 11:00 AM', dateMs: 100 },
    ],
  },
  {
    id: 'c4',
    participant: DAN,
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'me',  text: '안녕 Dan, 검색 API 현재 요청 제한이 어떻게 돼?', timestamp: 'Fri 11:30 AM', dateMs: 1 },
      { id: 'm2', senderId: 'dan', text: '사용자당 분당 100건, 전체적으로 분당 500건이야.', timestamp: 'Fri 11:33 AM', dateMs: 2 },
      { id: 'm3', senderId: 'me',  text: '지금은 충분할 것 같아. 스케일 업할 때 다시 검토하자.', timestamp: 'Fri 11:35 AM', dateMs: 3 },
      { id: 'm4', senderId: 'dan', text: '맞아. 서버 쪽에 캐싱도 좀 추가해뒀어.', timestamp: 'Fri 11:38 AM', dateMs: 4 },
      { id: 'm5', senderId: 'dan', text: '반복 쿼리 응답 시간이 ~280ms에서 ~45ms로 줄었어.', timestamp: 'Fri 11:39 AM', dateMs: 5 },
      { id: 'm6', senderId: 'me',  text: '엄청난 개선이네! 잘했어.', timestamp: 'Fri 11:41 AM', dateMs: 6 },
    ],
  },
  {
    id: 'c5',
    participant: EVE,
    unreadCount: 3,
    messages: [
      { id: 'm1', senderId: 'eve', text: 'Safari에서 결제 흐름에 리그레션이 발생했어요.', timestamp: 'Today 8:30 AM', dateMs: 1 },
      { id: 'm2', senderId: 'me',  text: '어머 — 어느 부분이 깨지나요?', timestamp: 'Today 8:32 AM', dateMs: 2 },
      { id: 'm3', senderId: 'eve', text: '프로모 코드 입력창에서 첫 글자 입력 후 포커스가 풀려요.', timestamp: 'Today 8:34 AM', dateMs: 3 },
      { id: 'm4', senderId: 'me',  text: 'autofocus 충돌 같네요. 확인해볼게요.', timestamp: 'Today 8:36 AM', dateMs: 4 },
      { id: 'm5', senderId: 'eve', text: 'Safari 17 이상에서만 발생하고, Chrome이랑 Firefox에서는 정상이에요.', timestamp: 'Today 9:00 AM', dateMs: 5 },
      { id: 'm6', senderId: 'eve', text: '재현 단계 포함해서 버그 리포트 올려뒀어요.', timestamp: 'Today 9:01 AM', dateMs: 6 },
      { id: 'm7', senderId: 'eve', text: '추적하려면 Bug #BUG-482 확인해봐요.', timestamp: 'Today 9:02 AM', dateMs: 7 },
    ],
  },
]

export type { Participant as ParticipantType }
export { ME }
