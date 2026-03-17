// 공통 타입
export type ChatRole = 'user' | 'assistant'

export type ChatModel = 'gemini' | 'gemini-2.5-flash' | string // 확장 대비

// 세션 (Session)
export type ChatSession = {
  id: number
  user: number
  question_id?: number
  title: string
  using_model: ChatModel
  created_at: string
  updated_at?: string
}

// 세션 생성 요청
export type CreateChatSessionRequest = {
  user?: number
  question_id?: number
  title: string
  using_model: ChatModel
}

// 세션 목록 조회 (Cursor Pagination)
export type ChatSessionListResponse = {
  next: string | null
  previous: string | null
  results: ChatSession[]
}

// 메시지 (채팅)
export type ChatMessage = {
  id: number
  message: string
  role: ChatRole
  created_at: string
}

// 메시지 목록 조회

export type ChatMessageListResponse = {
  next: string | null
  previous: string | null
  results: ChatMessage[]
}

// 채팅방 리스트 UI에서 사용하는 미리보기 데이터
export type ChatRoomPreview = {
  id: number
  title: string
  unreadCount: number
  timeLabel: string
}

export type ChatMessagePreview = {
  id: number
  message: string
  role: ChatRole
}

// 메시지 생성 요청 (질문)

export type SendMessageRequest = {
  message: string
}

// 스트리밍 응답 (SSE)

export type ChatStreamChunk = {
  content: string
}

// 마지막 완료 신호
export type ChatStreamDone = '[DONE]'

// 에러 응답
export type ApiError = {
  error_detail?: string
  message?: string
}
