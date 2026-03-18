import { useQuery } from '@tanstack/react-query'

import { getChatSessions } from '@/api'
import type { ChatSessionPreview } from '@/features/chat-widget'
import type { ChatSessionListResponse, GetChatSessionsParams } from '@/types'
import { formatTimeAgo } from '@/utils'

type ChatSessionPreviewListResponse = {
  next: string | null
  previous: string | null
  results: ChatSessionPreview[]
}

export default function useChatSessionsQuery(params?: GetChatSessionsParams) {
  return useQuery<
    ChatSessionListResponse,
    Error,
    ChatSessionPreviewListResponse
  >({
    queryKey: ['chat-sessions', params],
    queryFn: () => getChatSessions(params),
    select: (data) => ({
      ...data,
      results: data.results.map((session) => ({
        id: session.id,
        title: session.title,
        unreadCount: 0,
        timeLabel: formatTimeAgo(session.updated_at ?? session.created_at),
      })),
    }),
  })
}
