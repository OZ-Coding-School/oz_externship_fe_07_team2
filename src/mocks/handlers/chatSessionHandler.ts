import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { CHAT_API } from '@/constants/chat'
import { mockChatSessions } from '@/mocks/data/chat-session-mock'
import type { ChatSessionListResponse } from '@/types'

const chatSessionsApiUrl = toMswApiUrl(CHAT_API.sessions)

export const chatSessionHandlers = [
  http.get(chatSessionsApiUrl, async () => {
    await delay(500)

    return HttpResponse.json({
      next: null,
      previous: null,
      results: mockChatSessions,
    } satisfies ChatSessionListResponse)
  }),
]
