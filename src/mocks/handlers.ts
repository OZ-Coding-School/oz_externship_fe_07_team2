import { http, HttpResponse } from 'msw'

import { qnaCategoryHandlers } from './handlers/qnaCategoryHandler'
import { qnaCreateHandlers } from './handlers/qnaCreateHandler'
import { qnaListHandlers } from './handlers/qnaListHandler'

export const handlers = [
  http.get('/api/hello', () => {
    return HttpResponse.json({ message: 'Hello, world!', code: 200 })
  }),
  ...qnaCategoryHandlers,
  ...qnaListHandlers,
  ...qnaCreateHandlers,
]
