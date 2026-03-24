import { QNA_API } from '@/constants/qna'
import type { CreateAnswerRequest, CreateAnswerResponse } from '@/types'

import { api } from './api'

// 답변 등록 api 호출
export const createAnswer = async (
  questionId: number,
  data: CreateAnswerRequest
): Promise<CreateAnswerResponse> => {
  const res = await api.post<CreateAnswerResponse>(
    `${QNA_API.questions}/${questionId}/answers`,
    data
  )
  return res.data
}
