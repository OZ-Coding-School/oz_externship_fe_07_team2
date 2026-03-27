import { API_BASE_URL } from '@/constants/apiPath'
import { CHAT_API } from '@/constants/chat'
import { QNA_API } from '@/constants/qna'
import type {
  ChatMessageListResponse,
  ChatSession,
  ChatStreamChunk,
  CreateChatSessionRequest,
  GetChatCompletionsParams,
  QnaAiAnswer,
  SendMessageRequest,
} from '@/types'

import { api } from './api'

type SessionId = number | string
type StreamChatCompletionOptions = {
  onChunk?: (chunk: string, accumulated: string) => void
  signal?: AbortSignal
}

function getApiBaseUrl() {
  return API_BASE_URL
}

function getChatCompletionUrl(sessionId: SessionId) {
  return `${getApiBaseUrl()}${CHAT_API.completions(sessionId)}`
}

function parseStreamEvent(eventBlock: string) {
  const dataLines = eventBlock
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.replace(/^data:\s*/, ''))

  let content = ''
  let isDone = false

  for (const dataLine of dataLines) {
    if (dataLine === '[DONE]') {
      isDone = true
      continue
    }

    try {
      const parsed = JSON.parse(dataLine) as ChatStreamChunk
      content += parsed.content ?? ''
    } catch {
      content += dataLine
    }
  }

  return {
    content,
    isDone,
  }
}

// 새 채팅 세션을 생성
export const createChatSession = async (
  data: CreateChatSessionRequest
): Promise<ChatSession> => {
  const res = await api.post<ChatSession>(CHAT_API.sessions, data)
  return res.data
}

// support 전용 채팅 세션을 생성
export const createSupportCompletion = async (
  data: SendMessageRequest,
  options?: StreamChatCompletionOptions
): Promise<string> => {
  const token = import.meta.env.VITE_TEST_TOKEN

  const response = await fetch(`${API_BASE_URL}${CHAT_API.support}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    signal: options?.signal,
  })

  if (!response.ok) {
    throw new Error(`Support completion failed: ${response.status}`)
  }

  if (!response.body) {
    return ''
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let accumulated = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done && !value) {
      break
    }

    if (value) {
      buffer += decoder.decode(value, { stream: !done })
    }

    const eventBlocks = buffer.split('\n\n')
    buffer = eventBlocks.pop() ?? ''

    for (const eventBlock of eventBlocks) {
      const { content, isDone } = parseStreamEvent(eventBlock)

      if (content) {
        accumulated += content
        options?.onChunk?.(content, accumulated)
      }

      if (isDone) {
        return accumulated.trim()
      }
    }

    if (done) {
      break
    }
  }

  if (buffer.trim()) {
    const { content } = parseStreamEvent(buffer)

    if (content) {
      accumulated += content
      options?.onChunk?.(content, accumulated)
    }
  }

  return accumulated.trim()
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
  data: SendMessageRequest,
  options?: StreamChatCompletionOptions
): Promise<string> => {
  const token = import.meta.env.VITE_TEST_TOKEN

  const response = await fetch(getChatCompletionUrl(sessionId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
    signal: options?.signal,
  })

  if (!response.ok) {
    throw new Error(`Chat completion failed: ${response.status}`)
  }

  if (!response.body) {
    return ''
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let accumulated = ''

  while (true) {
    const { done, value } = await reader.read()

    // done 상태에서 value가 없으면 바로 종료 (undefined decode 방지)
    if (done && !value) {
      break
    }

    if (value) {
      buffer += decoder.decode(value, { stream: !done })
    }

    const eventBlocks = buffer.split('\n\n')
    buffer = eventBlocks.pop() ?? ''

    for (const eventBlock of eventBlocks) {
      const { content, isDone } = parseStreamEvent(eventBlock)

      if (content) {
        accumulated += content
        options?.onChunk?.(content, accumulated)
      }

      if (isDone) {
        return accumulated.trim()
      }
    }

    // 스트림이 정상적으로 종료된 경우
    if (done) {
      break
    }
  }

  if (buffer.trim()) {
    const { content } = parseStreamEvent(buffer)

    if (content) {
      accumulated += content
      options?.onChunk?.(content, accumulated)
    }
  }

  return accumulated.trim()
}

// AI 답변 생성
export const getAiAnswer = async (questionId: number): Promise<QnaAiAnswer> => {
  const res = await api.get<QnaAiAnswer>(
    `${QNA_API.questions}${questionId}/ai-answer`
  )
  return res.data
}
