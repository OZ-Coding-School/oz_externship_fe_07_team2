import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import {
  getMockChatMessagesBySessionId,
  getMockChatSessionById,
  setMockChatMessagesBySessionId,
  touchMockChatSession,
} from '@/mocks/data/chat-storage'
import type {
  ChatMessage,
  ChatMessageListResponse,
  SendMessageRequest,
} from '@/types'

// 채팅 메시지 API URL 생성
// 특정 세션(sessionId)에 대한 메시지 조회/생성 요청을 가로채기 위한 경로
const chatMessageApiUrl = toMswApiUrl(
  '/chatbot/sessions/:sessionId/completions'
)

const DEFAULT_GREETING_MESSAGE = '안녕하세요. 무엇을 도와드릴까요?'
const STREAM_CHUNK_PATTERN = [2, 3, 4, 3]
const STREAM_BASE_DELAY = 36
const STREAM_PUNCTUATION_DELAY = 90

function createMockAssistantMessage(userMessage: string) {
  const trimmedMessage = userMessage.trim()

  if (!trimmedMessage) {
    return '질문을 조금 더 자세히 알려주시면 핵심부터 정리해드릴게요.'
  }

  if (trimmedMessage.length <= 8) {
    return `${trimmedMessage}에 대해 먼저 핵심 개념부터 간단히 정리해드릴게요. 필요한 경우 예시도 이어서 설명할 수 있어요.`
  }

  return [
    `"${trimmedMessage}" 질문을 기준으로 답변을 정리해드릴게요.`,
    '먼저 핵심 개념을 짚고, 필요한 경우 예시와 함께 순서대로 설명해드릴 수 있어요.',
  ].join(' ')
}

function splitIntoStreamChunks(message: string) {
  const chunks: string[] = []
  let index = 0
  let patternIndex = 0

  while (index < message.length) {
    const nextSize = STREAM_CHUNK_PATTERN[patternIndex]
    chunks.push(message.slice(index, index + nextSize))
    index += nextSize
    patternIndex = (patternIndex + 1) % STREAM_CHUNK_PATTERN.length
  }

  return chunks
}

function getStreamChunkDelay(chunk: string) {
  const trimmedChunk = chunk.trim()

  if (!trimmedChunk) {
    return STREAM_BASE_DELAY
  }

  const lastCharacter = trimmedChunk[trimmedChunk.length - 1]
  const punctuationDelay = /[.,!?)]/.test(lastCharacter)
    ? STREAM_PUNCTUATION_DELAY
    : 0

  return STREAM_BASE_DELAY + punctuationDelay
}

// 채팅 메시지 관련 MSW 핸들러
// GET: 특정 세션 메시지 목록 조회
// POST: 메시지 전송 및 AI 응답 생성
export const chatMessageHandlers = [
  http.get(chatMessageApiUrl, async ({ params }) => {
    // 네트워크 지연 시뮬레이션 (로딩 상태 테스트용)
    await delay(500)

    // URL 파라미터에서 sessionId 추출 및 숫자로 변환
    const sessionId = Number(params.sessionId)

    // 해당 세션의 메시지 목록 반환 (없으면 빈 배열)
    return HttpResponse.json({
      next: null,
      previous: null,
      results: getMockChatMessagesBySessionId(sessionId),
    } satisfies ChatMessageListResponse)
  }),
  http.post(chatMessageApiUrl, async ({ params, request }) => {
    await delay(200)

    // sessionId 추출
    const sessionId = Number(params.sessionId)
    const currentSession = getMockChatSessionById(sessionId)
    // 클라이언트에서 보낸 메시지 body 파싱
    const body = (await request.json()) as SendMessageRequest
    // 기존 메시지 목록 가져오기 (없으면 빈 배열)
    const sessionMessages = getMockChatMessagesBySessionId(sessionId)
    // 기존 메시지 중 가장 큰 id를 기준으로 다음 메시지 id 계산
    const nextMessageId =
      sessionMessages.reduce(
        (maxMessageId, message) => Math.max(maxMessageId, message.id),
        0
      ) + 1
    // 현재 시간 (메시지 생성 시간)
    const now = new Date().toISOString()
    // 첫 메시지일 경우 보여줄 기본 안내 메시지 (assistant)
    const initialGreeting: ChatMessage = {
      id: nextMessageId,
      role: 'assistant',
      message: DEFAULT_GREETING_MESSAGE,
      created_at: now,
    }

    // 유저가 입력한 메시지
    // 첫 메시지일 경우 id 충돌 방지를 위해 +1 처리
    const userMessage: ChatMessage = {
      id: sessionMessages.length === 0 ? nextMessageId + 1 : nextMessageId,
      role: 'user',
      message: body.message,
      created_at: now,
    }
    // 간단한 mock AI 응답 메시지 생성
    const assistantMessage: ChatMessage = {
      id: userMessage.id + 1,
      role: 'assistant',
      message: createMockAssistantMessage(body.message),
      created_at: now,
    }

    // user 메시지만 먼저 저장하고 assistant는 스트림 종료 후 반영
    const baseSessionMessages = [
      ...sessionMessages,
      ...(sessionMessages.length === 0 && currentSession?.question_id == null
        ? [initialGreeting]
        : []),
      userMessage,
    ]
    setMockChatMessagesBySessionId(sessionId, baseSessionMessages)
    touchMockChatSession(sessionId, {
      updated_at: now,
    })

    const encoder = new TextEncoder()
    const contentChunks = splitIntoStreamChunks(assistantMessage.message)
    const stream = new ReadableStream({
      async start(controller) {
        for (const contentChunk of contentChunks) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ content: contentChunk })}\n\n`
            )
          )
          await delay(getStreamChunkDelay(contentChunk))
        }

        setMockChatMessagesBySessionId(sessionId, [
          ...baseSessionMessages,
          assistantMessage,
        ])
        touchMockChatSession(sessionId, {
          updated_at: new Date().toISOString(),
        })
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new HttpResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
      },
    })
  }),
]
