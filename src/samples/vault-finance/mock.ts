export interface Account {
  id: string
  name: string
  bank: string
  type: '운영' | '예치' | '투자'
  balance: number
  change: number
  color: string
}

export interface Transaction {
  id: string
  date: string
  merchant: string
  memo: string
  accountId: string
  category: string
  amount: number
  balance: number
  status: '확정' | '검토' | '보류'
}

export interface Asset {
  id: string
  name: string
  institution: string
  value: number
  allocation: number
  risk: '낮음' | '보통' | '높음'
  yield: number
}

export const accounts: Account[] = [
  { id: 'kb-operating', name: '운영 계좌', bank: 'KB국민은행', type: '운영', balance: 320420000, change: 12800000, color: '#2f6f62' },
  { id: 'shinhan-payroll', name: '급여 계좌', bank: '신한은행', type: '예치', balance: 98250000, change: -5400000, color: '#5c6670' },
  { id: 'mirae-invest', name: '단기 투자', bank: '미래에셋증권', type: '투자', balance: 412310000, change: 8400000, color: '#8b6f3d' },
  { id: 'woori-tax', name: '세무 보관', bank: '우리은행', type: '예치', balance: 45540000, change: 0, color: '#38424b' },
]

export const assets: Asset[] = [
  { id: 'cash', name: '현금 및 요구불예금', institution: '4개 은행', value: 462800000, allocation: 36, risk: '낮음', yield: 2.1 },
  { id: 'bond', name: '단기 국공채', institution: '미래에셋증권', value: 232140000, allocation: 18, risk: '낮음', yield: 3.4 },
  { id: 'deposit', name: '정기 예금', institution: '신한은행', value: 268900000, allocation: 21, risk: '낮음', yield: 3.0 },
  { id: 'fund', name: 'MMF 운용', institution: 'KB증권', value: 201410000, allocation: 16, risk: '보통', yield: 3.8 },
  { id: 'reserve', name: '세금 준비금', institution: '우리은행', value: 119270000, allocation: 9, risk: '낮음', yield: 1.7 },
]

export const transactions: Transaction[] = [
  { id: 't1', date: '2026.09.27', merchant: '넥스트바이오', memo: '엔터프라이즈 계약금 입금', accountId: 'kb-operating', category: '매출', amount: 42000000, balance: 320420000, status: '확정' },
  { id: 't2', date: '2026.09.26', merchant: '클라우드넥스', memo: '연간 인프라 비용', accountId: 'kb-operating', category: 'IT시스템', amount: -8600000, balance: 278420000, status: '검토' },
  { id: 't3', date: '2026.09.25', merchant: '임직원 급여', memo: '9월 급여 이체', accountId: 'shinhan-payroll', category: '인건비', amount: -5400000, balance: 98250000, status: '확정' },
  { id: 't4', date: '2026.09.24', merchant: '미래에셋증권', memo: '단기채 만기 상환', accountId: 'mirae-invest', category: '투자수익', amount: 8400000, balance: 412310000, status: '확정' },
  { id: 't5', date: '2026.09.23', merchant: '서울오피스', memo: '임대료 및 관리비', accountId: 'kb-operating', category: '운영비', amount: -11200000, balance: 287020000, status: '확정' },
  { id: 't6', date: '2026.09.22', merchant: '세무법인 한결', memo: '부가세 예정 납부', accountId: 'woori-tax', category: '세금', amount: -7100000, balance: 45540000, status: '보류' },
  { id: 't7', date: '2026.09.21', merchant: '그린푸드', memo: '구내식당 정산', accountId: 'kb-operating', category: '복리후생', amount: -1870000, balance: 298220000, status: '확정' },
  { id: 't8', date: '2026.09.20', merchant: '고객사 A', memo: '유지보수 계약금', accountId: 'kb-operating', category: '매출', amount: 15000000, balance: 300090000, status: '확정' },
]

export const navItems = ['대시보드', '자산', '거래내역', '예산', '리포트', '설정']
