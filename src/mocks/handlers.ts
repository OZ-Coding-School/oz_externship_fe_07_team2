import { http, HttpResponse } from 'msw'

import { chatMessageHandlers } from './handlers/chatMessageHandler'
import { chatSessionHandlers } from './handlers/chatSessionHandler'
import { qnaAnswerHandlers } from './handlers/qnaAnswerHandler'
import { qnaCreateHandlers } from './handlers/qnaCreateHandler'
import { qnaDetailHandlers } from './handlers/qnaDetailHandler'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  ...chatMessageHandlers,
  ...chatSessionHandlers,
  ...qnaDetailHandlers,
  ...qnaCreateHandlers,
  ...qnaAnswerHandlers,
]
