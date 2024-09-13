# Outclass Market

## [주요 기능 명세서]

### A. Authentication

### 1. 회원가입 / 계정삭제

- 유효성 검사

### 2. 로그인 / 로그아웃

- 유효성 검사
- Social Login : Github
- SMS로그인 일부 구현

### B. Product

- 상품 등록 / 수정 / 삭제
- 상품 좋아요
- 상품 등록자와 채팅 / 채팅방 개수 표시
- 무한스크롤

### C. Post

- 포스트 등록 / 수정 / 삭제
- 포스트 조회수 표시
- 포스트 좋아요
- 포스트 댓글 등록 / 수정 / 삭제
- 무한스크롤

### D. Chat

- 실시간 채팅

### E. User Profile

- 프로필(유저 이름, 사진) 수정
- 내가 등록한 상품 리스트 보기
- 좋아요 표시한 상품 리스트 보기

### 총괄

- 유효성 검사 : Zod를 활용한 유효성 검사
- Cloudflare Images 활용한 이미지 호스팅
- IntersectionObserver API를 활용한 무한스크롤
- 캐싱
- Vercel을 이용한 풀스택 배포
