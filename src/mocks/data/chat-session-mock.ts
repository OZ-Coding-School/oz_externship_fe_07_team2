import type { ChatSession } from '@/types'

export const mockChatSessions: ChatSession[] = [
  {
    id: 1,
    user: 1,
    title: 'AND 연산자 사용법',
    using_model: 'gemini',
    created_at: '2026-03-18T02:55:00Z',
    updated_at: '2026-03-18T02:59:00Z',
  },
  {
    id: 2,
    user: 1,
    title: '파이썬 기초 문법',
    using_model: 'gemini',
    created_at: '2026-03-18T01:40:00Z',
    updated_at: '2026-03-18T01:55:00Z',
  },
  {
    id: 3,
    user: 1,
    title: '점심 메뉴 추천',
    using_model: 'gemini',
    created_at: '2026-03-17T03:10:00Z',
    updated_at: '2026-03-17T03:10:00Z',
  },
]
