import { http, HttpResponse } from 'msw'

import { chatMessageHandlers } from './handlers/chatMessageHandler'
import { chatSessionHandlers } from './handlers/chatSessionHandler'
import { qnaCategoryHandlers } from './handlers/qnaCategoryHandler'
import { qnaCreateHandlers } from './handlers/qnaCreateHandler'
import { qnaDetailHandlers } from './handlers/qnaDetailHandler'
import { qnaListHandlers } from './handlers/qnaListHandler'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  ...chatMessageHandlers,
  ...chatSessionHandlers,
  ...qnaCategoryHandlers,
  ...qnaListHandlers,
  ...qnaDetailHandlers,
  ...qnaCreateHandlers,
]
