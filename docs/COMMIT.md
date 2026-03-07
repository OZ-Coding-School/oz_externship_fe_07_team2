# Commit Convention

이 저장소는 `commitlint`와 `husky`로 커밋 메시지 형식을 검사합니다.

## 기본 형식

`type: subject`

예시

- `feat: 질문 등록 폼 구현`
- `fix: 답변 채택 버튼 노출 조건 수정`
- `refactor: qna-detail feature 구조 정리`
- `docs: 구조 문서 업데이트`

## 사용 가능한 type

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 작성 및 수정
- `style`: 기능 변경 없는 스타일 수정
- `refactor`: 기능 변경 없는 구조 개선
- `test`: 테스트 추가 및 수정
- `chore`: 설정, 패키지, 빌드 관련 작업
- `remove`: 사용하지 않는 코드나 파일 제거
- `hotfix`: 긴급 수정
- `deprecated`: 제거 예정 코드 처리
- `design`: UI/UX, 퍼블리싱 작업

## 규칙

- `type`은 소문자만 사용합니다.
- `subject`는 비워둘 수 없습니다.
- `subject` 끝에 마침표를 붙이지 않습니다.
- 이슈 번호는 괄호 포함 `(#번호)` 형식으로 작성합니다.
- 본문을 작성할 때는 제목 아래 한 줄을 비웁니다.

## 실제 검사 기준

현재 `.husky/commit-msg`에서 아래 명령어로 검사합니다.

```bash
pnpm dlx commitlint --edit $1
```

## 자주 나는 실수

- `Feat:`처럼 대문자 type 사용
- 이슈 번호 누락
- `feat add button`처럼 콜론 형식 누락
- `feat: add button.`처럼 마침표 사용
