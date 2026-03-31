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
    select: (data) => {
      const sortedMessages = [...data.results].sort((previous, next) => {
        const previousTime = new Date(previous.created_at).getTime()
        const nextTime = new Date(next.created_at).getTime()

        if (previousTime !== nextTime) {
          return previousTime - nextTime
        }

        return previous.id - next.id
      })

      return {
        ...data,
        results: sortedMessages.map((message) => ({
          id: message.id,
          role: message.role,
          message: message.message,
        })),
      }
    },
  })
}
