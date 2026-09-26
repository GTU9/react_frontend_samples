# Operations Samples Redesign

## 공통 방향

- 대상 샘플: `pulse-dashboard`, `vault-finance`, `flow-crm`.
- ImageGen 대표 콘셉트: `C:\Users\admin\.codex\generated_images\01a0df4a-8d5f-7b02-915e-1e04d4b458b1\call_s07FwHh4PL1ldQ43BvsW3HbF.png`.
- 운영 도구는 마케팅 랜딩이 아니라 반복 사용 화면이므로 실제 작업 밀도, 표, 필터, 선택 상태를 우선했다.
- 공통 금지 요소인 보라 그라데이션, 글로우, 유리 패널, 의미 없는 3카드 섹션, 가짜 로고/후기를 사용하지 않았다.
- 세 샘플 모두 로컬 mock 데이터와 코드 네이티브 차트/테이블 UI로 구성했다. 이미지가 핵심 정보 전달에 필요한 도메인이 아니므로 원격 이미지 또는 장식용 비트맵을 추가하지 않았다.

## 참고 리서치

- Mixpanel Product Analytics: https://mixpanel.com/platform/product-analytics/
  - 실제 제품 분석 화면은 세그먼트, 퍼널, 리텐션, 전환율 같은 구체적 분석 단위가 중심이다.
  - `pulse-dashboard`는 KPI만 나열하지 않고 기간 필터, 전환 퍼널, 페이지별 드릴다운, 이벤트 변화량을 함께 둔다.
- QuickBooks bank transaction categorization: https://quickbooks.intuit.com/learn-support/en-us/help-article/banking/categorize-match-online-bank-transactions-online/L1bTafTz3_US_en_US
  - 금융 운영 화면은 거래 검토, 분류, 계좌별 잔액, 상태 확인이 핵심이다.
  - `vault-finance`는 암호화폐 시세판 대신 기업 계좌 장부, 상태 필터, 선택 자산 비중과 위험도를 보여준다.
- HubSpot updated board view: https://knowledge.hubspot.com/records/use-the-updated-board-view?facet1=pdf
  - CRM 보드는 단계별 레코드 열, 필터, 보드/리스트 관점, 선택 레코드 관리가 핵심이다.
  - `flow-crm`은 단계별 거래 카드, 담당자/단계/검색 필터, 선택 거래 편집, 신규 거래 추가를 유지한다.
- HubSpot sales tracking: https://www.hubspot.com/products/sales/sales-tracking?slug=abstract
  - 영업 추적은 활동, 단계, 담당자, 매출 예측을 한 화면에서 읽을 수 있어야 한다.
  - `flow-crm`은 다음 액션과 마감일을 카드 표면에 노출해 “예쁜 보드”보다 영업 운영성을 우선했다.

## 샘플별 결정

### Pulse Dashboard

- 팔레트: 따뜻한 흰 배경, 잉크 텍스트, teal 차트.
- 주요 변경: 기간 탭, 검색, KPI, 세션/전환 SVG 차트, 퍼널, 정렬 가능한 페이지 테이블, 선택 페이지 드릴다운.
- 상호작용: 기간 전환, 페이지 검색, 정렬 기준 전환, 모바일 사이드바.
- 권장 registry 설명: “기간 필터와 페이지 드릴다운이 있는 제품 분석 워크스페이스”.
- 권장 style label: “Warm analytics workspace”.

### Vault Finance

- 팔레트: 그래파이트 사이드바, 흰 장부 표면, 절제된 녹색/적색 상태.
- 주요 변경: 기업 계좌 잔액 패널, 계좌 선택, 자산 선택/비중 링, 거래 상태 필터, 계좌별 거래 테이블.
- 상호작용: 계좌 전환, 자산 선택, 거래 상태 필터, 모바일 사이드바.
- 권장 registry 설명: “기업 계좌, 자산 비중, 거래 검토를 결합한 금융 장부 화면”.
- 권장 style label: “Graphite ledger”.

### Flow CRM

- 팔레트: 중립 회색/흰색, indigo는 선택/주요 명령에 제한.
- 주요 변경: 실제 회사명 기반 파이프라인, 담당자/단계/검색 필터, 선택 거래 상세, 자동 저장 편집, 신규 거래 추가, 다음 액션 목록.
- 상호작용: 필터링, 카드 선택, 필드 편집, 신규 거래 추가, 모바일 사이드바.
- 권장 registry 설명: “필터, 다음 액션, 거래 편집이 작동하는 실무형 영업 파이프라인”.
- 권장 style label: “Practical sales pipeline”.
