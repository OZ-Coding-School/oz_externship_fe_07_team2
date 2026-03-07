# Development Convention

## 목적

프로젝트 전반의 코드 스타일, 파일 배치 방식, 협업 규칙을 통일하여 유지보수성과 협업 효율을 높이기 위함입니다.

## 기본 원칙

- 기능은 `features` 단위로 분리합니다.
- `pages`는 라우트 진입점만 담당합니다.
- 공통 UI는 `components/common`에 둡니다.
- 레이아웃 컴포넌트는 `components/layout`에 둡니다.
- `features`끼리는 직접 참조하지 않습니다.
- 여러 곳에서 재사용되는 로직만 전역 폴더로 분리합니다.

## 네이밍 규칙

- 컴포넌트: `PascalCase.tsx`
- 훅: `use*.ts`
- 스토리북 파일: `*.stories.tsx`
- 전역 상태: `*.store.ts`
- 유틸 함수: `camelCase.ts`
- API 파일: 소문자 파일명 사용
- 배럴 파일: `index.ts`
- 폴더명: `kebab-case`

예시

- `qna-list`
- `answer-comment`
- `tab-button`

## 폴더별 작성 규칙

### `components/common`

- 도메인 지식이 없는 공통 UI만 작성합니다.
- 개별 컴포넌트 스토리는 해당 폴더 내부에 함께 작성합니다.

### `components/layout`

- 페이지 구조를 담당하는 레이아웃 컴포넌트를 작성합니다.

### `features`

- 요구사항 기준으로 기능을 분리합니다.
- 한 feature 내부에는 `components`, `hooks`, `types`, `utils`를 둘 수 있습니다.
- 다른 feature를 직접 import 하지 않습니다.

### `pages`

- URL 기준 페이지 컴포넌트만 둡니다.
- 비즈니스 로직을 직접 작성하기보다 `features`를 조립합니다.

### `hooks`

- 특정 도메인에 속하지 않는 전역 훅만 둡니다.

### `utils`

- 여러 곳에서 공통으로 사용하는 함수만 둡니다.

### `types`

- 여러 feature에서 공통 사용하는 타입만 둡니다.
- feature 내부에서만 쓰는 타입은 해당 feature 내부에 둡니다.

### `stores`

- 여러 화면에서 함께 사용하는 전역 상태만 둡니다.

## 작성 규칙

- 하나의 컴포넌트는 하나의 책임만 가지도록 작성합니다.
- 재사용 가능한 UI는 먼저 공통 컴포넌트 분리 가능성을 검토합니다.
- props 이름은 의미가 분명해야 합니다.
- 훅 이름은 반드시 `use`로 시작합니다.
- 공통으로 필요해진 로직은 `components`, `hooks`, `utils`, `types`, `constants`로 승격합니다.
- import 경로는 프로젝트 alias 규칙이 있다면 일관되게 유지합니다.
- 서버 데이터와 전역 UI 상태는 역할에 맞는 방식으로 분리합니다.

## 스타일 및 스토리북 규칙

- 공통 스타일은 재사용 가능한 형태로 작성합니다.
- 페이지 전용 스타일은 해당 페이지 또는 feature 내부에서 관리합니다.
- `.storybook`은 전역 설정만 관리합니다.
- 스토리 파일은 각 컴포넌트 폴더에 `*.stories.tsx` 형식으로 작성합니다.

## 커밋 전 체크

- 불필요한 콘솔 로그 제거
- 사용하지 않는 import 제거
- 네이밍 규칙 준수 여부 확인
- 공통 컴포넌트 분리 필요 여부 확인
- feature 경계 위반 여부 확인
