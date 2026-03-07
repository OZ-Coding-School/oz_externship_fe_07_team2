# Troubleshooting

개발 중 발생한 문제와 해결 방법을 기록합니다.

## 작성 목적

- 같은 문제를 반복해서 조사하지 않기 위함
- 팀원 간 해결 경험을 공유하기 위함
- 프로젝트 특이사항을 문서로 남기기 위함

## 작성 형식

### 문제

어떤 문제가 발생했는지 작성합니다.

### 원인

문제의 원인을 작성합니다.

### 해결

어떻게 해결했는지 작성합니다.

### 참고

관련 파일, 링크, 주의사항 등을 작성합니다.

---

## 예시 1

### 문제

Storybook에서 컴포넌트 import 경로를 찾지 못하는 문제가 발생함.

### 원인

Vite alias 설정과 Storybook 설정이 일치하지 않았음.

### 해결

`.storybook/main.ts`에서 alias 설정을 동일하게 맞춤.

### 참고

- `vite.config.ts`
- `.storybook/main.ts`

---

## 예시 2

### 문제

AI 채팅 중 SSE 연결이 페이지 이동 후에도 종료되지 않음.

### 원인

컴포넌트 unmount 시 SSE close 처리가 누락됨.

### 해결

`useEffect` cleanup에서 연결 종료 로직 추가.

### 참고

- `features/ai-chat/hooks/useSseStream.ts`
