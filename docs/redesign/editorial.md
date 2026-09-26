# 콘텐츠 매체 리디자인

## 참조

- [It's Nice That](https://www.itsnicethat.com/): 사진과 제목이 주도하는 문화 기사, 주제별 탐색.
- [The Guardian](https://www.theguardian.com/international): 기사 중요도에 따른 지면 구분.
- [MUBI](https://mubi.com/en/films): 작품과 감독 중심의 영화 탐색.

참조 사이트의 기사, 영화, 브랜드를 복제하지 않았다. 한국어 기사와 영화 설명은 이 샘플을 위한 창작 데이터다.

## 구현 결정

- Quill: 흰 지면, 큰 세리프 제호, 붉은 사진과 구분선, 비대칭 기사 목록. 기사 읽기, 보관함, 카테고리, 구독 폼의 로컬 확인 상태.
- Frame (기존 pulse-stream 경로 유지): 중성 차콜, 영화 사진, 제한적인 황록색 명령 버튼. 장르/검색, 보관함, 키보드로 닫을 수 있는 작품 소개 대화상자. 실제 영상이 없으므로 가짜 재생 버튼은 제공하지 않는다.
- 데일리 서울 (기존 daily-wire 경로 유지): 버건디 제호, 3단 편집, 기사와 편집부 추천을 구분하는 선. 기사 검색, 분야별 보기, 본문 읽기, 보관함. 실제 속보나 시세처럼 보이는 가상의 수치는 제거했다.
- Gallery: 아카이브 인덱스, 검색/분야 필터, 이미지 중심 프로젝트 목록. 그라데이션/구체 폴백 대신 단색 바탕의 이름 표시.

## 콘셉트

내장 ImageGen으로 각 매체의 전체 첫 화면 콘셉트를 만들었다. 구현은 지면의 비율, 팔레트, 탐색 구조를 기준으로 하되, 생성 이미지 속 사진 대신 아래의 로컬 사진을 사용했다. 구현에 없는 로그인/유료 구독 기능과 가상의 실시간 정보는 제외했다.

프롬프트 핵심:
- Quill: white editorial Korean journal, black serif masthead, red architecture lead photograph, asymmetric index, thin rules; no cards/gradients.
- Frame: charcoal independent cinema library, real rainy urban photography, restrained yellow actions, genre tabs and film detail.
- Daily Seoul: burgundy local newspaper masthead, three unequal columns, news search and saved reads, concrete city photographs.

## 로컬 이미지 출처

Unsplash 이미지 엔드포인트에서 내려받은 사진이며 외부 URL을 런타임에 요청하지 않는다.

| 파일 | 원본 |
| --- | --- |
| quill-journal/architecture.jpg | https://images.unsplash.com/photo-1668878189153-3d07b9678c45 |
| quill-journal/coast.jpg | https://images.unsplash.com/photo-1518837695005-2083093ee35b |
| quill-journal/library.jpg | https://images.unsplash.com/photo-1507842217343-583bb7270b66 |
| daily-wire/seoul.jpg | https://images.unsplash.com/photo-1517154421773-0529f29ea451 |
| daily-wire/forest.jpg | https://images.unsplash.com/photo-1441974231531-c6227db76b6e |
| daily-wire/street.jpg | https://images.unsplash.com/photo-1449824913935-59a10b8d2000 |
| pulse-stream/night.jpg | https://images.unsplash.com/photo-1717604138400-bf68fc35e7b7 |
| pulse-stream/mountain.jpg | https://images.unsplash.com/photo-1464822759023-fed622ff2c3b |
| pulse-stream/forest.jpg | https://images.unsplash.com/photo-1473448912268-2022ce9509d8 |

파일 위치는 모두 `public/media/` 아래다. 뉴스 사진은 현장 보도 사진이 아닌 자료 이미지이며, 영화 사진도 실제 영화 스틸이 아니다.
