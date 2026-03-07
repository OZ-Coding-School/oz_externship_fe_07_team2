# Project Structure

현재 프로젝트는 Vite 기반 React + TypeScript 구조입니다.

## 기본 원칙

- `pages`는 라우트 진입점만 담당합니다.
- `features`는 기능 단위로 분리합니다.
- `features`끼리는 직접 참조하지 않습니다.
- 공통 UI는 `components/common`에 둡니다.
- 전역에서 재사용되는 타입, 유틸, 상수만 공통 폴더로 분리합니다.

## 루트 구조

```text
.
├── docs
├── public
├── src
├── .storybook
├── .husky
├── commitlint.config.js
├── eslint.config.js
├── package.json
└── vite.config.ts
```

## src 구조

```text
src
├── api
├── assets
├── components
│   └── common
├── hooks
├── lib
├── mocks
├── pages
├── store
├── types
└── utils
```

## 폴더 설명

- `src/api`: API 호출 및 서버 통신 관련 코드
- `src/assets`: 이미지, 폰트 등 정적 리소스
- `src/components`: 재사용 가능한 UI 컴포넌트
- `src/hooks`: 커스텀 훅
- `src/lib`: 외부 라이브러리 연동 또는 공통 설정
- `src/mocks`: MSW 기반 목 데이터와 핸들러
- `src/pages`: 페이지 단위 컴포넌트
- `src/store`: 전역 상태 관리
- `src/types`: 공통 타입 정의
- `src/utils`: 유틸 함수

## 컴포넌트 구성 예시

공통 컴포넌트는 아래 형태를 권장합니다.

```text
src/components/common/button/
├── Button.tsx
└── Button.stories.tsx
```

## 구조 운영 원칙

- 여러 곳에서 재사용하면 `components/common`으로 올립니다.
- 특정 화면에서만 쓰면 해당 페이지 근처에 둡니다.
- 전역으로 공유되는 타입과 유틸만 각각 `types`, `utils`에 둡니다.
- 파일이 비대해지면 역할 기준으로 분리합니다.
