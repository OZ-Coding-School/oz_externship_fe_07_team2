// - 채팅 세션, 메시지, 스트리밍, 에러 응답까지 포함

// 채팅 메시지 작성 주체
// - user: 사용자
// - assistant: AI 응답
export type ChatRole = 'user' | 'assistant'

// AI 모델 타입
// - 기본 gemini 모델 사용
// - 문자열 확장 가능
export type ChatModel = 'gemini' | 'gemini-2.5-flash' | string

// 채팅 세션(채팅방) 정보
// - 하나의 대화 단위
// - question_id: 특정 질문에서 시작된 채팅일 경우 연결
export type ChatSession = {
  id: number
  user: number
  question_id?: number
  title: string
  using_model: ChatModel
  created_at: string
  updated_at?: string
}

// 채팅 세션 생성 요청 타입
// - 새로운 채팅방 생성 시 사용
export type CreateChatSessionRequest = {
  user?: number
  question_id?: number
  title: string
  using_model: ChatModel
}

// 추가질문하기 클릭시
export type CreateSupportSessionRequest = {
  title: string
  using_model: ChatModel
}

// 채팅 메시지 데이터
// - role에 따라 사용자/AI 구분
export type ChatMessage = {
  id: number
  message: string
  role: ChatRole
  created_at: string
}

// 채팅 메시지 목록 조회 파라미터
// - cursor 기반 페이지네이션
export type GetChatCompletionsParams = {
  cursor?: string
  page_size?: number
}

// 채팅 메시지 목록 응답
// - cursor 기반 페이지네이션 구조
export type ChatMessageListResponse = {
  next: string | null
  previous: string | null
  results: ChatMessage[]
}

// 메시지 전송 요청 타입
//- 사용자가 입력한 메시지
export type SendMessageRequest = {
  message: string
}

// 스트리밍 응답 chunk (부분 메시지)
// - 실시간으로 이어서 전달되는 데이터
export type ChatStreamChunk = {
  content: string
}

// 스트리밍 종료 신호
export type ChatStreamDone = '[DONE]'

// API 에러 응답 타입
export type ApiError = {
  error_detail?: string
  message?: string
}
