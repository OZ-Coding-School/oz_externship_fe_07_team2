import { http, HttpResponse } from 'msw'

import { chatSessionHandlers } from './handlers/chatSessionHandler'
import { qnaCategoryHandlers } from './handlers/qnaCategoryHandler'
import { qnaCreateHandlers } from './handlers/qnaCreateHandler'
import { qnaDetailHandlers } from './handlers/qnaDetailHandler'
import { qnaListHandlers } from './handlers/qnaListHandler'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  ...chatSessionHandlers,
  ...qnaCategoryHandlers,
  ...qnaListHandlers,
  ...qnaDetailHandlers,
  ...qnaCreateHandlers,
]
