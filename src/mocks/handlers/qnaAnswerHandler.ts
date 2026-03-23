import { http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'

const qnaApiUrl = toMswApiUrl(QNA_API.questions)

export const qnaAnswerHandlers = [
  http.post(`${qnaApiUrl}/:questionId/answers`, async ({ params, request }) => {
    const questionId = Number(params.questionId)

    if (!Number.isFinite(questionId) || questionId <= 0) {
      return HttpResponse.json(
        { message: '잘못된 질문 ID입니다.' },
        { status: 400 }
      )
    }

    const body = (await request.json()) as {
      content: string
      image_urls: string[]
    }

    const plainText = body.content?.replace(/<[^>]*>/g, '').trim()

    if (!plainText) {
      return HttpResponse.json(
        { message: '답변 내용을 입력해 주세요.' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        cohort_number: null,
      },
      { status: 201 }
    )
  }),
]
