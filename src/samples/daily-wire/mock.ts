// Daily Wire — mock data for news portal

export interface Article {
  id: string;
  category: string;
  headline: string;
  excerpt: string;
  byline: string;
  timestamp: string;
  readTime: string;
  imageColor: string; // CSS gradient for placeholder image
}

export interface OpinionPiece {
  id: string;
  author: string;
  title: string;
  bio: string;
  avatarColor: string;
}

export interface MarketEntry {
  symbol: string;
  name: string;
  value: string;
  change: string;
  up: boolean;
}

export interface SportScore {
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  status: string;
}

export const tickerItems: string[] = [
  "속보: 연방준비제도, 인플레이션 우려 속에 기준금리 동결 결정",
  "유엔 안전보장이사회, 중동 휴전 논의 위해 긴급 회의 소집",
  "AI 구조조정 가속화로 대형 테크 기업 1만 2천 명 감원 발표",
  "걸프 해안을 위협하는 폭풍 시스템 — 해안 지역 주민 대피령 발령",
  "올림픽위원회, 최종 투표로 2032년 올림픽 개최 도시 확정",
  "미 상원, 초당적 지지로 역대급 인프라 법안 통과",
];

export const heroArticle: Article = {
  id: "hero-1",
  category: "국제",
  headline: "세계 정상들, 제네바에 모여 역사적 기후 협약 서명",
  excerpt:
    "147개국 대표단이 월요일 팔레 데 나시옹에 모여 2045년까지 탄소 중립을 목표로 — 기존 목표보다 10년 앞당긴 — 주요 경제국에 구속력 있는 탄소 감축 이정표를 부여하는 포괄적 기후 협약에 서명했다.",
  byline: "Eleanor Marsh, 제네바 특파원",
  timestamp: "오늘 오전 9:42",
  readTime: "6분 소요",
  imageColor: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #0ea5e9 100%)",
};

export const secondaryArticles: Article[] = [
  {
    id: "sec-1",
    category: "경제",
    headline: "고용 지표 예상 대폭 상회, 증시 일제히 상승",
    excerpt:
      "노동부가 5월 신규 일자리 31만 2천 개를 발표하며 전문가 예측을 크게 뛰어넘자 금요일 주가가 사상 최고치로 급등했다.",
    byline: "Marcus Chen",
    timestamp: "오늘 오전 8:15",
    readTime: "4분 소요",
    imageColor: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
  },
  {
    id: "sec-2",
    category: "테크",
    headline: "수년간 표류하던 AI 규제 법안, 상원 위원회 통과",
    excerpt:
      "AI 생성 콘텐츠 투명성 공개를 의무화하는 초당파 법안이 14대 3으로 위원회를 통과했다.",
    byline: "Priya Nair",
    timestamp: "오늘 오전 7:30",
    readTime: "3분 소요",
    imageColor: "linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)",
  },
  {
    id: "sec-3",
    category: "정치",
    headline: "주지사, 대규모 주택 개혁법에 서명",
    excerpt:
      "이 법안은 서민 주택 개발 허가를 신속 처리하고 주 지정 구역에 대한 지방 정부의 거부권을 제한한다.",
    byline: "Dana Okafor",
    timestamp: "어제 오후 11:55",
    readTime: "5분 소요",
    imageColor: "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
  },
];

export const gridArticles: Article[] = [
  {
    id: "grid-1",
    category: "국제",
    headline: "마감 시한 임박, 휴전 협상 중대 국면 진입",
    excerpt: "중재자들은 협상이 '실질적 진전'을 이뤘다고 밝혔으나 핵심 쟁점들은 여전히 미해결 상태다.",
    byline: "James Hollis",
    timestamp: "2시간 전",
    readTime: "5분",
    imageColor: "linear-gradient(135deg, #374151 0%, #6b7280 100%)",
  },
  {
    id: "grid-2",
    category: "경제",
    headline: "유통 대기업, 이커머스 전략 전환으로 매장 200곳 폐점",
    excerpt: "체인 CEO는 이번 전환이 팬데믹 이후 '소비자 행동의 영구적 변화'를 반영한다고 밝혔다.",
    byline: "Sofia Reyes",
    timestamp: "3시간 전",
    readTime: "4분",
    imageColor: "linear-gradient(135deg, #1c1917 0%, #78716c 100%)",
  },
  {
    id: "grid-3",
    category: "테크",
    headline: "양자 컴퓨팅 돌파구, 암호화 표준 뒤흔들 수도",
    excerpt: "연구진이 수십 년 걸리던 문제를 수 분 안에 해결하는 1,000큐비트 프로세서를 시연했다.",
    byline: "Lena Vogel",
    timestamp: "4시간 전",
    readTime: "6분",
    imageColor: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
  },
  {
    id: "grid-4",
    category: "건강",
    headline: "임상시험에서 알츠하이머 진행 35% 억제하는 신약 등장",
    excerpt: "FDA 신속 심사 대상 후보 약물이 다양한 4,800명 환자 코호트에서 일관된 결과를 보였다.",
    byline: "Dr. Amara Singh",
    timestamp: "5시간 전",
    readTime: "7분",
    imageColor: "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
  },
  {
    id: "grid-5",
    category: "문화",
    headline: "칸 영화제 심사위원단, 케냐 감독 데뷔작에 황금종려상 수여",
    excerpt: "만장일치 결정은 영화계를 놀라게 했으며, 30만 달러짜리 작품이 대형 스튜디오 출품작들을 제쳤다.",
    byline: "Céline Dupont",
    timestamp: "6시간 전",
    readTime: "3분",
    imageColor: "linear-gradient(135deg, #4a044e 0%, #a21caf 100%)",
  },
  {
    id: "grid-6",
    category: "스포츠",
    headline: "극적인 역전극으로 챔피언십 시리즈 7차전까지 돌입",
    excerpt: "3연패로 벼랑 끝에 몰렸던 원정팀이 3연승을 거두며 토요일 최종 결전을 이끌어냈다.",
    byline: "Ray Tanner",
    timestamp: "8시간 전",
    readTime: "4분",
    imageColor: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
  },
];

export const mostRead: { rank: number; headline: string; category: string }[] = [
  { rank: 1, headline: "다음 10년을 지배할 10대 경제 대국", category: "경제" },
  { rank: 2, headline: "의사들이 콜레스테롤 지침을 다시 검토하는 이유", category: "건강" },
  { rank: 3, headline: "새로운 민간 우주 경쟁 시대의 내막", category: "테크" },
  { rank: 4, headline: "작은 도시가 전국적 논쟁의 중심이 된 사연", category: "정치" },
  { rank: 5, headline: "패스트패션 친환경 주장 뒤에 숨겨진 비용", category: "문화" },
];

export const opinions: OpinionPiece[] = [
  {
    id: "op-1",
    author: "Victoria Lane",
    title: "서방의 신뢰 격차는 벌어지고 있다 — 그리고 경쟁국들은 지켜보고 있다",
    bio: "외교정책연구소 선임 연구원",
    avatarColor: "#1d4ed8",
  },
  {
    id: "op-2",
    author: "Prof. Kwame Asante",
    title: "탄소세만으로는 우리를 구할 수 없다. 진짜 해법은 이것이다.",
    bio: "MIT 환경경제학 교수",
    avatarColor: "#0891b2",
  },
  {
    id: "op-3",
    author: "Rachel Kim",
    title: "AI 불안을 도덕적 결함으로 취급하는 것을 멈춰라",
    bio: "테크 특파원",
    avatarColor: "#7c3aed",
  },
];

export const markets: MarketEntry[] = [
  { symbol: "DJIA", name: "Dow Jones", value: "42,317", change: "+1.24%", up: true },
  { symbol: "S&P", name: "S&P 500", value: "5,876", change: "+0.87%", up: true },
  { symbol: "NASDAQ", name: "Nasdaq", value: "18,940", change: "+1.53%", up: true },
  { symbol: "FTSE", name: "FTSE 100", value: "8,112", change: "-0.31%", up: false },
  { symbol: "BTC", name: "Bitcoin", value: "$67,420", change: "+3.12%", up: true },
  { symbol: "OIL", name: "Crude Oil", value: "$82.14", change: "-0.68%", up: false },
];

export const scores: SportScore[] = [
  { homeTeam: "CHI", awayTeam: "LAL", homeScore: "108", awayScore: "114", status: "FINAL" },
  { homeTeam: "NYY", awayTeam: "BOS", homeScore: "4", awayScore: "2", status: "7th Inn." },
  { homeTeam: "MAN", awayTeam: "ARS", homeScore: "2", awayScore: "2", status: "84'" },
];

export const weatherData = {
  city: "뉴욕",
  temp: "71°F",
  condition: "구름 조금",
  icon: "⛅",
};

export const navSections = ["국제", "경제", "테크", "스포츠", "문화", "건강", "정치", "오피니언"];
