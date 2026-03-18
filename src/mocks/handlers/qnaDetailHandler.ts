import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'
import { mockQuestionDetail } from '@/mocks/data/qna-detail-mock'

const qnaDetailApiUrl = toMswApiUrl(QNA_API.questions)

export const qnaDetailHandlers = [
  http.get(`${qnaDetailApiUrl}/:questionId`, async ({ params }) => {
    await delay(500)

    const questionId = Number(params.questionId)

    if (!Number.isFinite(questionId) || questionId <= 0) {
      return HttpResponse.json(
        { message: '잘못된 질문 ID입니다.' },
        { status: 400 }
      )
    }

    if (questionId !== mockQuestionDetail.id) {
      return HttpResponse.json(
        { message: '질문을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return HttpResponse.json(mockQuestionDetail)
  }),
]
