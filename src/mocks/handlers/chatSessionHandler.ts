import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { CHAT_API } from '@/constants/chat'
import {
  deleteMockChatMessagesBySessionId,
  deleteMockChatSession,
  getMockChatSessions,
  upsertMockChatSession,
} from '@/mocks/data/chat-storage'
import type { ChatSession, CreateChatSessionRequest } from '@/types'

// MSW에서 사용할 채팅 세션 API URL 생성
const chatSessionsApiUrl = toMswApiUrl(CHAT_API.sessions)
const chatSessionByIdApiUrl = toMswApiUrl(`${CHAT_API.sessions}/:sessionId`)

// POST: 새로운 채팅 세션 생성
export const chatSessionHandlers = [
  http.post(chatSessionsApiUrl, async ({ request }) => {
    // 생성 요청 시 짧은 지연 추가 (UX 테스트용)
    await delay(300)

    // 클라이언트에서 전달한 요청 body 파싱
    const body = (await request.json()) as CreateChatSessionRequest

    // 기존 세션 중 가장 큰 id를 기준으로 다음 id 생성
    const nextId =
      getMockChatSessions().reduce(
        (maxSessionId, session) => Math.max(maxSessionId, session.id),
        0
      ) + 1

    // 새로운 채팅 세션 객체 생성
    const now = new Date().toISOString()
    const newSession: ChatSession = {
      id: nextId,
      user: body.user ?? 1,
      question_id: body.question_id,
      title: body.title,
      using_model: body.using_model,
      created_at: now,
      updated_at: now,
    }

    // 최신 세션을 목록 맨 앞에 추가 (최신순 정렬 유지)
    upsertMockChatSession(newSession)

    // 생성된 세션을 응답으로 반환
    return HttpResponse.json(newSession)
  }),
  http.delete(chatSessionByIdApiUrl, async ({ params }) => {
    await delay(50)

    const sessionId = Number(params.sessionId)

    deleteMockChatSession(sessionId)
    deleteMockChatMessagesBySessionId(sessionId)

    return new HttpResponse(null, { status: 204 })
  }),
]
