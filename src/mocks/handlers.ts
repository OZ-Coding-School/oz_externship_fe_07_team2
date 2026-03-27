import { http, HttpResponse } from 'msw'

import { qnaAnswerHandlers } from './handlers/qnaAnswerHandler'
import { qnaCreateHandlers } from './handlers/qnaCreateHandler'
import { qnaDetailHandlers } from './handlers/qnaDetailHandler'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  ...qnaDetailHandlers,
  ...qnaCreateHandlers,
  ...qnaAnswerHandlers,
]
