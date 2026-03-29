---

## 📚 통합 교육 플랫폼(LMS) 개발 프로젝트

> 질문을 등록하고 답변을 확인하는 질의응답 서비스와  
> AI 답변 생성 및 챗봇 기능을 함께 제공하는 LMS 프론트엔드 프로젝트입니다.

---

## 📖 프로젝트 소개

> 학습은 강의를 듣는 것에서 끝나지 않습니다.
> 학습 중 생긴 궁금증을 바로 질문하고, 답변을 확인하고, 필요한 경우 대화로 이어질 수 있어야
> 더 끊기지 않는 학습 경험이 만들어집니다.
> 이 프로젝트는 강의 탐색과 학습, 질의응답, 채팅 기능을 하나로 연결한
> `통합 교육 플랫폼(LMS)`입니다.

- 프로젝트 기간: 2026.03.02 - 2026.03.31

## 🔗 배포 링크

> ### [배포 바로가기](https://oz-externship-fe-07-team2.vercel.app)

---

## 🚀 Getting Started

```yaml
- packageManager: pnpm
- react: 19
- storybook: 10.2
```

### 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 값을 추가합니다.

```env
VITE_API_BASE_URL=your_api_base_url_here
```

### 개발 서버 실행

```bash
pnpm install
pnpm dev
```

### Storybook 실행

```bash
pnpm storybook
```

---

## 🗣️ 발표 영상, 발표 문서

> ### [📺 발표 영상]()
>
> ### [📑 발표 문서]()

---

## ✨ 주요 기능

### 질의응답 목록 페이지

- 검색 기능
- 최신순 / 조회수순 정렬
- 카테고리 조회 및 필터
- 목록 페이지네이션

```md
1. 질의응답 목록 페이지
   목록 조회 기능: 최신순/조회수순 정렬, 검색어 입력, 카테고리 조회 및 필터, 페이지네이션을 지원합니다.
```

|                                                                                                                 목록 조회                                                                                                                 |                                                                                                            검색 및 필터                                                                                                             |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://lh6.googleusercontent.com/M7RxaY_ZsF5sQcqiIOafdBGHuVGqKrQ0c07hzOtLgkhxYTK-aRKWdhkMfi8DaoZxyDWLZKhdUEDKBIEpETcm2_sH5JdW69mrOXzASMQYHFEiaP0QbgCEHa5bnKzITG-v9ztn0QfbCeZtznJ8q-SDo2qoEA=s2048" alt="질의응답 목록 페이지"> | <img src="https://lh4.googleusercontent.com/iFbgPqWgK__YmSB8ha53yHTLfU_LtwJNEAf7KCDUxbraZbJhh1vQkAjTMLhaQF24HN2s3oniEsOL75mfiiMV2gRUs0exNptePw0hp0a9Q0Ko3XzfN3l4lPoWY5NP3Eif4KONMmgWQ-kKTYamb2mOiGiMlw=s2048" alt="질문 검색 기능"> |

### 질문 등록 및 수정

- 질문 등록
- 질문 수정
- 마크다운 에디터 지원
- 이미지 업로드
- 입력값 유효성 검사

```md
2. 질문 등록 및 수정
   질문 작성 기능: 로그인 사용자는 제목, 본문, 카테고리, 이미지 등을 포함해 질문을 등록할 수 있으며, 마크다운 에디터를 통해 내용을 작성할 수 있습니다.

질문 수정 기능: 기존 질문 데이터를 불러와 수정할 수 있으며, 입력값 검증을 함께 제공합니다.
```

|                                                                                                               질문 등록                                                                                                               |                                                                                                               질문 수정                                                                                                               |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://lh6.googleusercontent.com/LgLnyK4xbij_SmBQd_9b-zKL7NjFBceXLFr97o-S9z4JMw7bZaO4E9W5SbwJn_xOAVu4xCk9Se0eqShfP8YkzkaL-QilqVa6LRaQEQ5h4PHLZOgmT8ZByBV-eEIZEr9D3I1mB6qu5nhIehup3910FytnrQ=s2048" alt="질문 등록 페이지"> | <img src="https://lh3.googleusercontent.com/_WEmqGBbE04OIWsmijjjMk7eyk2jKBC9qXLFTWJjpWHfcUknRcVfOSA5Xy5QqTILk75qm4EcbgyXNM5h8dtitdmfuQ7Gg7YSR_Hb8GBffFeiEMLx6NYXVPDLA8BwHVUHrfZtHl-yATyXIiJhtdsaOMoMqA=s2048" alt="질문 수정 페이지"> |

### 질의응답 상세 페이지

- 질문 본문 조회
- 답변 목록 조회
- 답변 작성 및 수정
- 답변 채택

```md
3. 질의응답 상세 페이지
   상세 조회 기능: 질문 본문, 답변 목록, 댓글, 작성자 정보 등 상세 데이터를 확인할 수 있습니다.

답변 상호작용 기능: 답변 작성, 수정, 채택 등 질의응답 흐름을 상세 페이지에서 이어갈 수 있습니다.
```

|                                                                                                               질의응답 상세                                                                                                               |                                                                                                       답변 작성 및 수정                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://lh6.googleusercontent.com/WSSZM-N1tpBvXui0ivLMaSJv5u-Jn8oUNXik40GOW7thMqmNdMPrjfO4-halmEZ80GuBBlI5ENm8TtDovjSOMRqHE6Z5w7F5yYxdplO643k3wfhyW4wT0IUT15Rv6kk_FAnST07-50NOOeXHjRfjh6dEBA=s2048" alt="질의응답 상세 페이지"> | <img src="https://lh4.googleusercontent.com/3od9me49rKBnI9saCG7TuRqlg4RQGb9JX4z8PyXMHfpqW6jF4gLgly_fZympLUsQUzxVBfWeEDIOha2-TyV-6pV_BiIbafOb9AG6vZVAgBomqyfgr8r6I_Xilqyi-p5rTA6q8lJeVqt-en4I1jnEGoK19Q=s2048" alt="답변 작성"> |

### AI 답변 및 챗봇

- AI 답변 생성
- 추가 질문 및 AI 채팅
- 시스템 챗봇 제공

```md
4. AI 답변 및 챗봇
   AI 답변 생성 기능: 질문 상세 페이지에서 AI 답변 생성 요청을 통해 답변을 확인할 수 있습니다.

추가 질문 기능: 생성된 AI 답변을 기반으로 연속적인 질문 흐름을 이어갈 수 있습니다.

시스템 챗봇: 별도 질문 문맥 없이도 일반 문의에 대해 1회성 AI 상담을 제공합니다.
```

|                                                                                                           AI 답변 생성                                                                                                            |                                                                                                           추가 질문 및 AI 채팅                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://lh6.googleusercontent.com/uQJWChKZY7rtI-IdUgG9AxKSUfEeAUbFu3vnfrEkxDXSYHF7-e2ban3omp9Hn0yjtIh6uyQUC3DY8FXOOTLZEk5oK5t3BhD4WS6_jdJclc-L-zn8iavUnRgtLf0In1yH_C933V2MVtYE6_a40slzphM88A=s2048" alt="AI 답변 생성"> | <img src="https://lh6.googleusercontent.com/wQiDqzndpvTRfIsHy-l3_eCjPDQ0JF28pCmLrDdSFQfR0UTuJHiF_erHsz57FuHFDWbHMnmOLquWxJxqUwjeAy_JnhaOzpjdemsvAzwPQdfK6J-H6vqOj3GwrnpBMs43Gl6BhC_idUh9lVyONEgCdIHMPQ=s2048" alt="추가 질문 및 AI 채팅"> |

### 사용자 상태 기반 접근 제어

- 회원 전용 기능 접근 제어
- 비회원 접근 제한 및 UI 분기
- 인증 상태 기반 버튼 노출 분기

```md
5. 사용자 상태 기반 접근 제어
   회원 전용 기능: 질문 작성, 답변 작성, 추가 질문 등 로그인 사용자만 사용할 수 있는 기능을 분리했습니다.

UI 분기 처리: 인증 여부에 따라 버튼 노출, 액션 가능 여부, 접근 가능한 화면을 다르게 제공합니다.
```

|                                                                                                           비회원 접근 화면                                                                                                            |                                                                                                           회원 이용 화면                                                                                                            |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://lh5.googleusercontent.com/KRfPZ8P2TzvLBeHAcApzzHDn6xbkCYp8Z9sDmWSifQNwQwfC7HAjczd-KHVs5dGbKhi2AO5O3A8wd8mewcze3TKb_yM9y5-PHQVE7axz5HVdWsI1alg2-qatjn7G2c0Y6Fx786KMjoiIULFLpCoQx6HWJA=s2048" alt="비회원 접근 화면"> | <img src="https://lh5.googleusercontent.com/eTvLqwjRti-QhqDMWb2gMw692w-qmSipvVOjcXHvVIetlZiBvgbzcDakCP2Gmf-kGNx5vuZ5fm_3ExzA3_rD3ux4DaDK5xaP90LgDmK6fRYPdGdolg8dJrdh8fKT7a4H0odAYlK9t4-iLxjtsbinTnz0ow=s2048" alt="회원 이용 화면"> |

### 예외 및 상태 처리

- 로딩 상태 UI
- 에러 상태 UI
- 빈 상태 UI
- 잘못된 접근 안내 UI

```md
6. 예외 및 상태 처리
   로딩 및 에러 처리: API 요청 진행 상태와 실패 상황을 사용자에게 명확히 안내합니다.

빈 상태 UI: 검색 결과 없음, 데이터 없음, 잘못된 접근 등에 대응하는 전용 UI를 제공합니다.
```

|                                                                                                           에러 상태 안내 UI                                                                                                            |                                                                                                         빈 상태 및 접근 제어                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://lh5.googleusercontent.com/KjjwMZ-FrNzlWa0N8IS2iYAr92JgQCMbOFEwZdtScJJwzt5XY70dZII-OyvHUSbWV_7qBNCFc3pslsgcfLX9ZAM54y0F5pRrO4e2EMv8ee1K2FzzieU5ByAn9UhBqB08Fk1pHUaGvRzxGt8HhFh17fongw=s2048" alt="에러 상태 안내 UI"> | <img src="https://lh5.googleusercontent.com/KRfPZ8P2TzvLBeHAcApzzHDn6xbkCYp8Z9sDmWSifQNwQwfC7HAjczd-KHVs5dGbKhi2AO5O3A8wd8mewcze3TKb_yM9y5-PHQVE7axz5HVdWsI1alg2-qatjn7G2c0Y6Fx786KMjoiIULFLpCoQx6HWJA=s2048" alt="비회원 접근 화면"> |

---

## 🧰 사용 스택

### Frontend Architecture

<p align="center">
  <img src="./public/images/frontend-architecture.png" alt="Frontend Architecture" width="100%" />
</p>

#### Framework / Language

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=000000">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white">
</div>

#### Styling / UI

<div>
  <img src="https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/tiptap-000000?style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/lucide-18181B?style=for-the-badge&logo=lucide&logoColor=white">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
</div>

#### State Management

<div>
  <img src="https://img.shields.io/badge/zustand-4B2E2B?style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/tanstack_query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
</div>

#### Code Quality / Dev Tools

<div>
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=000000">
  <img src="https://img.shields.io/badge/husky-000000?style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">
  <img src="https://img.shields.io/badge/msw-FF6A33?style=for-the-badge&logoColor=white">
</div>

#### Deploy

<div>
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

---

## :busts_in_silhouette: 팀 동료

### FE

| <a href="https://github.com/alstmd9902"><img src="https://github.com/alstmd9902.png?size=100" width="100px"/><br/><sub><b>@alstmd9902</b></sub></a> | <a href="https://github.com/fishwwww2"><img src="https://github.com/fishwwww2.png?size=100" width="100px"/><br/><sub><b>@fishwwww2</b></sub></a> | <a href="https://github.com/SammyLee519"><img src="https://github.com/SammyLee519.png?size=100" width="100px"/><br/><sub><b>@SammyLee519</b></sub></a> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                       오승연                                                                        |                                                                      김채현                                                                      |                                                                         이샘물                                                                         |
|                                                                     팀장 (Lead)                                                                     |                                                                       팀원                                                                       |                                                                          팀원                                                                          |
|                                  챗봇, AI 답변 생성, 카테고리 필터, 질문 목록 페이지 구현,<br/>공통 컴포넌트 구현                                   |                                             질문 상세 페이지, 답변 등록/수정,<br/>공통 컴포넌트 구현                                             |                                      질문 등록/수정 페이지, Toast UI,<br/>에러/성공 상태 처리, 공통 컴포넌트 구현                                      |

## 📑 프로젝트 규칙

> 자세한 내용은 각 문서를 참고해주세요.

| 문서                                            | 설명            |
| ----------------------------------------------- | --------------- |
| [BRANCH.md](./docs/BRANCH.md)                   | 브랜치 전략     |
| [COMMIT.md](./docs/COMMIT.md)                   | 커밋 컨벤션     |
| [CONVENTION.md](./docs/CONVENTION.md)           | 코드 컨벤션     |
| [STRUCTURE.md](./docs/STRUCTURE.md)             | 프로젝트 구조   |
| [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | 트러블슈팅 기록 |
| [README.md](./docs/README.md)                   | 문서 가이드     |

## :clipboard: Documents

> [📜 API 명세서](https://docs.google.com/spreadsheets/d/1x6AFgjoFvBZPOV8gF-BhMxeUJuaNVXu9HwMqg-Pzrs8/edit?gid=0#gid=0)
>
> [📜 요구사항 정의서](https://docs.google.com/spreadsheets/d/1CGE8X8weUpm9_qwQ6y2K7XwTwmZT8ON9R7tRCC7NzDc/edit?gid=0#gid=0)
>
> [📜 화면 정의서](https://www.figma.com/design/k2hDdksMNGoRNXvjmH5Etc/%ED%99%94%EB%A9%B4%EC%A0%95%EC%9D%98%EC%84%9C-%EC%A7%88%EC%9D%98%EC%9D%91%EB%8B%B5-?node-id=0-1&p=f)
>
> [📜 플로우 차트](https://www.figma.com/board/utn8chciTh9LzUQ543M1eg/Untitled?node-id=0-1&p=f)
