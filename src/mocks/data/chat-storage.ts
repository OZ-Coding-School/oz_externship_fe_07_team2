import type { ChatMessage, ChatSession } from '@/types'

//개발용 mock 상태 저장 파일 api 붙을시 삭제 예정
let chatSessionsCache: ChatSession[] = []
let chatMessagesCache: Record<number, ChatMessage[]> = {}

export function getMockChatSessions() {
  return chatSessionsCache
}

export function setMockChatSessions(nextSessions: ChatSession[]) {
  chatSessionsCache = nextSessions
}

export function getMockChatSessionById(sessionId: number) {
  return chatSessionsCache.find((session) => session.id === sessionId)
}

export function getMockChatMessages() {
  return chatMessagesCache
}

export function getMockChatMessagesBySessionId(sessionId: number) {
  return chatMessagesCache[sessionId] ?? []
}

export function setMockChatMessagesBySessionId(
  sessionId: number,
  nextMessages: ChatMessage[]
) {
  chatMessagesCache = {
    ...chatMessagesCache,
    [sessionId]: nextMessages,
  }
}

export function upsertMockChatSession(nextSession: ChatSession) {
  const nextSessions = chatSessionsCache.filter(
    (session) => session.id !== nextSession.id
  )

  chatSessionsCache = [nextSession, ...nextSessions]
}

export function touchMockChatSession(
  sessionId: number,
  updates: Partial<Pick<ChatSession, 'title' | 'updated_at'>>
) {
  const currentSession = getMockChatSessionById(sessionId)

  if (!currentSession) {
    return
  }

  upsertMockChatSession({
    ...currentSession,
    ...updates,
  })
}

export function deleteMockChatSession(sessionId: number) {
  chatSessionsCache = chatSessionsCache.filter(
    (session) => session.id !== sessionId
  )
}

export function deleteMockChatMessagesBySessionId(sessionId: number) {
  const { [sessionId]: _deletedMessages, ...nextChatMessages } =
    chatMessagesCache

  chatMessagesCache = nextChatMessages
}
