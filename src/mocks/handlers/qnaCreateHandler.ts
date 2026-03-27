import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna-api-endpoints'
import { mockQuestionDetail } from '@/mocks/data/qna-detail-mock'
import type { CreateQuestionRequest } from '@/types'

export const qnaCreateHandlers = [
  http.post(
    toMswApiUrl(QNA_API.QUESTIONS_BASE.slice(0, -1)),
    async ({ request }) => {
      await delay(500)
      const body = (await request.json()) as CreateQuestionRequest

      return HttpResponse.json(
        {
          ...mockQuestionDetail,
          title: body.title,
          content: body.content,
        },
        { status: 201 }
      )
    }
  ),
]
