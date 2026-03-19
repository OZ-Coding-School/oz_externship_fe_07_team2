import { CHAT_API } from '@/constants/chat'
import type {
  ChatMessageListResponse,
  ChatSession,
  ChatSessionListResponse,
  CreateChatSessionRequest,
  CreateSupportSessionRequest,
  GetChatCompletionsParams,
  GetChatSessionsParams,
  SendMessageRequest,
} from '@/types'

import { api } from './api'

type SessionId = number | string

// 새 채팅 세션을 생성
export const createChatSession = async (
  data: CreateChatSessionRequest
): Promise<ChatSession> => {
  const res = await api.post<ChatSession>(CHAT_API.sessions, data)
  return res.data
}

// support 전용 채팅 세션을 생성
export const createSupportSession = async (
  data: CreateSupportSessionRequest
): Promise<ChatSession> => {
  const res = await api.post<ChatSession>(CHAT_API.support, data)
  return res.data
}

// cursor 기반으로 채팅 세션 목록을 조회
export const getChatSessions = async (
  params?: GetChatSessionsParams
): Promise<ChatSessionListResponse> => {
  const res = await api.get<ChatSessionListResponse>(CHAT_API.sessions, {
    params,
  })
  return res.data
}

// sessionId로 특정 채팅 세션 정보를 조회
export const getChatSession = async (
  sessionId: SessionId
): Promise<ChatSession> => {
  const res = await api.get<ChatSession>(CHAT_API.sessionById(sessionId))
  return res.data
}

// 특정 채팅 세션을 삭제
export const deleteChatSession = async (
  sessionId: SessionId
): Promise<void> => {
  await api.delete(CHAT_API.sessionById(sessionId))
}

// 채팅 메시지 목록을 cursor 기반으로 조회
export const getChatCompletions = async (
  sessionId: SessionId,
  params?: GetChatCompletionsParams
): Promise<ChatMessageListResponse> => {
  const res = await api.get<ChatMessageListResponse>(
    CHAT_API.completions(sessionId),
    {
      params,
    }
  )
  return res.data
}

// 특정 세션에 사용자 메시지를 전송
// 명세서상 응답 예시가 일반 JSON 1회 응답이 아니라
// `data: { "content": "..." }` 형태로 여러 번 내려오는 스트리밍(SSE)
// 그래서 현재는 ChatMessage 객체가 아니라 raw text 응답으로 받음
export const createChatCompletion = async (
  sessionId: SessionId,
  data: SendMessageRequest
): Promise<string> => {
  const res = await api.post<string>(CHAT_API.completions(sessionId), data, {
    // SSE 응답 본문을 그대로 받기 위해 text로 처리
    responseType: 'text',
    headers: {
      // 서버에 스트리밍 응답을 기대한다는 뜻
      Accept: 'text/event-stream',
    },
  })
  return res.data
}

// 특정 세션의 대화내역을 모두 초기화
export const clearChatCompletions = async (
  sessionId: SessionId
): Promise<void> => {
  await api.delete(CHAT_API.completions(sessionId))
}
