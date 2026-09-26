export const softdeck = {
  brand: {
    name: 'SoftDeck',
    category: '포터블 오디오 콘솔',
    image: '/media/softdeck-retro/softdeck-console.png',
  },
  nav: [
    { label: '제품', href: '#product' },
    { label: '사양', href: '#specs' },
    { label: '구성', href: '#bundles' },
    { label: '지원', href: '#contact' },
  ],
  hero: {
    title: 'SoftDeck',
    subtitle: '어디서나 좋은 사운드를 잡는 포터블 오디오 콘솔',
    body:
      '두 개의 프리앰프, 실제 VU 미터, 독립 모니터 노브를 하나의 알루미늄 바디에 담았습니다. 책상, 촬영장, 이동 녹음 모두 같은 손맛으로 다룹니다.',
    primary: '지금 구매하기',
    secondary: '기술 사양 보기',
  },
  specs: [
    { label: '입력', value: '콤보 XLR/TRS 2채널' },
    { label: '컨버터', value: '32-bit / 192 kHz' },
    { label: '전원', value: 'USB-C 또는 내장 배터리' },
    { label: '모니터링', value: '헤드폰 2계통, 라인 출력' },
    { label: '바디', value: '브러시드 알루미늄' },
    { label: '무게', value: '1.4 kg' },
  ],
  controls: [
    '대형 입력 게인 노브',
    '좌우 독립 VU 미터',
    '원터치 모노 체크',
    '무소음 모니터 감쇄',
  ],
  bundles: [
    {
      tier: 'Solo',
      price: '₩429,000',
      desc: '보컬, 팟캐스트, 1인 촬영에 적합한 기본 구성',
      features: ['SoftDeck 본체', 'USB-C 케이블', '휴대용 파우치'],
      cta: 'Solo 선택',
    },
    {
      tier: 'Field',
      price: '₩589,000',
      desc: '현장 녹음과 소규모 라이브 스트리밍을 위한 구성',
      features: ['SoftDeck 본체', '스테레오 브레이크아웃 케이블', '하드 케이스', '레드 노브 세트'],
      cta: 'Field 선택',
    },
    {
      tier: 'Studio',
      price: '₩739,000',
      desc: '고정 작업실과 이동 세트를 함께 쓰는 팀용 구성',
      features: ['Field 구성 전체', '데스크 스탠드', '예비 배터리', '2년 우선 지원'],
      cta: 'Studio 선택',
    },
  ],
  newsletter: {
    title: '출고 알림 받기',
    body: '초도 물량 입고와 펌웨어 업데이트 소식을 메일로 보내드립니다.',
    placeholder: 'studio@example.com',
    cta: '알림 신청',
  },
}
