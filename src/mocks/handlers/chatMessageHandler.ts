import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { mockChatMessagesBySessionId } from '@/mocks/data/chat-message-mock'
import type { ChatMessageListResponse } from '@/types'

const chatMessageApiUrl = toMswApiUrl(
  '/chatbot/sessions/:sessionId/completions'
)

export const chatMessageHandlers = [
  http.get(chatMessageApiUrl, async ({ params }) => {
    await delay(500)

    const sessionId = Number(params.sessionId)

    return HttpResponse.json({
      next: null,
      previous: null,
      results: mockChatMessagesBySessionId[sessionId] ?? [],
    } satisfies ChatMessageListResponse)
  }),
]
