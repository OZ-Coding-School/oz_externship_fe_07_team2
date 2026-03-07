# Branch Strategy

## 기본 브랜치

- `main`: 배포 가능한 안정 브랜치
- `develop`: 개발 통합 브랜치

## 브랜치 생성 규칙

브랜치는 작업 목적이 보이도록 작성합니다.

형식

- `feat/이슈번호-기능명`
- `fix/이슈번호-이슈명`
- `refactor/이슈번호-대상`

예시
-feat/24-qna-list
-refactor/31-question-create
-fix/45-answer-accept-button

## 작업 원칙

- 하나의 브랜치에서는 하나의 목적만 다룹니다.
- 기능 개발 중 구조 정리가 필요하면 별도 `refactor` 브랜치로 분리합니다.
- 작업 완료 후 PR을 통해 병합합니다.
- 직접 `main`에 push 하지 않습니다.
