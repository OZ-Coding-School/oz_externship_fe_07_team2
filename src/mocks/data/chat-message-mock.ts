import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

export const mockInitialChatMessages: ChatMessagePreview[] = [
  {
    id: 1,
    role: 'assistant',
    message: '안녕하세요. 무엇을 도와드릴까요?',
  },
]

export const mockChatMessagesByRoomId: Record<number, ChatMessagePreview[]> = {
  1: [
    {
      id: 1,
      role: 'assistant',
      message: '안녕하세요. 무엇을 도와드릴까요?',
    },
    {
      id: 2,
      role: 'user',
      message: 'AND 연산자 사용법이 헷갈려요.',
    },
    {
      id: 3,
      role: 'assistant',
      message:
        'AND는 모든 조건이 참일 때만 true가 됩니다. 예를 들어 A && B는 A와 B가 둘 다 참이어야 실행돼요.',
    },
  ],
  2: [
    {
      id: 1,
      role: 'assistant',
      message: '안녕하세요. 무엇을 도와드릴까요?',
    },
    {
      id: 2,
      role: 'user',
      message: '파이썬 기초 문법을 다시 정리하고 싶어요.',
    },
    {
      id: 3,
      role: 'assistant',
      message:
        '변수, 조건문, 반복문, 함수 문법부터 다시 보는 게 좋습니다. 특히 들여쓰기와 리스트/딕셔너리 문법을 같이 정리해보세요.',
    },
  ],
  3: [
    {
      id: 1,
      role: 'assistant',
      message: '안녕하세요. 무엇을 도와드릴까요?',
    },
    {
      id: 2,
      role: 'user',
      message: '점심 메뉴 뭐 먹을지 추천해 줄 수 있니?',
    },
    {
      id: 3,
      role: 'assistant',
      message:
        '차돌짬뽕처럼 얼큰하고 든든한 메뉴, 연어포케처럼 가볍고 기분 좋은 메뉴 둘 다 좋아. 빨리 먹고 싶다면 김밥+우동 조합도 무난하고 속 편해. 조금 특별하게 먹고 싶으면 돈카츠 카레도 딱 좋아. 너 지금 당기는 스타일에 맞춰 하나 골라봐!',
    },
  ],
}
