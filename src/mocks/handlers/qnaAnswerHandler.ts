import { http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna-api-endpoints'

const qnaApiUrl = toMswApiUrl(QNA_API.QUESTIONS_BASE.slice(0, -1))
const qnaAnswerApiUrl = toMswApiUrl(QNA_API.ANSWERS_BASE)

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

  http.put(`${qnaAnswerApiUrl}/:answerId`, async ({ params, request }) => {
    const answerId = Number(params.answerId)

    if (!Number.isFinite(answerId) || answerId <= 0) {
      return HttpResponse.json(
        { message: '잘못된 답변 ID입니다.' },
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

    // Mock 응답 - 실제로는 수정된 답변 데이터를 반환해야 함
    return HttpResponse.json({
      id: answerId,
      content: body.content,
      created_at: new Date().toISOString(),
      is_adopted: false,
      image_urls: body.image_urls,
      author: {
        id: 999,
        nickname: '테스트 사용자',
        profile_image_url: null,
      },
    })
  }),

  http.post(
    `${qnaAnswerApiUrl}/:answerId/comments`,
    async ({ params, request }) => {
      const answerId = Number(params.answerId)

      if (!Number.isFinite(answerId) || answerId <= 0) {
        return HttpResponse.json(
          { message: '잘못된 답변 ID입니다.' },
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
          { message: '댓글 내용을 입력해 주세요.' },
          { status: 400 }
        )
      }

      return HttpResponse.json(
        {
          id: Date.now(),
          content: body.content,
          created_at: new Date().toISOString(),
          author: {
            id: 999,
            nickname: '테스트 댓글러',
            profile_image_url: null,
          },
        },
        { status: 201 }
      )
    }
  ),

  http.post(`${qnaAnswerApiUrl}/:answerId/adopt`, async ({ params }) => {
    const answerId = Number(params.answerId)

    if (!Number.isFinite(answerId) || answerId <= 0) {
      return HttpResponse.json(
        { message: '잘못된 답변 ID입니다.' },
        { status: 400 }
      )
    }

    return HttpResponse.json({ message: '채택되었습니다.' })
  }),
]
