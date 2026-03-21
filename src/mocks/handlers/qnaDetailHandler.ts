import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'
import { mockQuestionDetail } from '@/mocks/data/qna-detail-mock'
import type { QnaCategory } from '@/types'

const qnaDetailApiUrl = toMswApiUrl(QNA_API.questions)
/*
 * PUT 핸들러에서 상태를 업데이트하기 위해 mutable 복사본으로 관리
 */
let mockData = { ...mockQuestionDetail }

/**
 * 공통 검증 함수
 * - 에러면 HttpResponse 반환, 통과면 null
 */
const validateQuestionId = (rawId: unknown) => {
  const questionId = Number(rawId)

  if (!Number.isFinite(questionId) || questionId <= 0) {
    return {
      error: HttpResponse.json(
        { message: '잘못된 질문 ID입니다.' },
        { status: 400 }
      ),
      questionId,
    }
  }

  if (questionId !== mockData.id) {
    return {
      error: HttpResponse.json(
        { message: '질문을 찾을 수 없습니다.' },
        { status: 404 }
      ),
      questionId,
    }
  }

  return { error: null, questionId }
}

export const qnaDetailHandlers = [
  http.get(`${qnaDetailApiUrl}/:questionId`, async ({ params }) => {
    await delay(500)
    const { error } = validateQuestionId(params.questionId)
    if (error) return error

    return HttpResponse.json(mockData)
  }),

  http.put(`${qnaDetailApiUrl}/:questionId`, async ({ params, request }) => {
    await delay(500)
    const { error } = validateQuestionId(params.questionId)
    if (error) return error

    const body = (await request.json()) as {
      title: string
      content: string
      category: QnaCategory
    }
    mockData = {
      ...mockData,
      title: body.title,
      content: body.content,
      category: body.category,
    }
    return HttpResponse.json(mockData)
  }),
]
