import { useQuery } from '@tanstack/react-query'

import { getChatCompletions } from '@/api/chat-api'
import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'
import type { ChatMessageListResponse, GetChatCompletionsParams } from '@/types'

type ChatMessagePreviewListResponse = {
  next: string | null
  previous: string | null
  results: ChatMessagePreview[]
}

type UseChatMessagesQueryParams = {
  sessionId: number | null
  params?: GetChatCompletionsParams
}

export default function useChatMessagesQuery({
  sessionId,
  params,
}: UseChatMessagesQueryParams) {
  return useQuery<
    ChatMessageListResponse,
    Error,
    ChatMessagePreviewListResponse
  >({
    queryKey: ['chat-messages', sessionId, params],
    queryFn: () => getChatCompletions(sessionId!, params),
    enabled: sessionId !== null,
    select: (data) => ({
      ...data,
      results: data.results.map((message) => ({
        id: message.id,
        role: message.role,
        message: message.message,
      })),
    }),
  })
}
