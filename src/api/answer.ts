import { QNA_API } from '@/constants/qna'
import type { CreateAnswerRequest, CreateAnswerResponse } from '@/types'

import { api } from './api'

const getQuestionAnswerPath = (questionId: number) =>
  `${QNA_API.questions.replace(/\/$/, '')}/${questionId}/answers`

const getQuestionAnswerDetailPath = (questionId: number, answerId: number) =>
  `${getQuestionAnswerPath(questionId)}/${answerId}`

// 답변 등록 api 호출
export const createAnswer = async (
  questionId: number,
  data: CreateAnswerRequest
): Promise<CreateAnswerResponse> => {
  const res = await api.post<CreateAnswerResponse>(
    getQuestionAnswerPath(questionId),
    data
  )
  return res.data
}

// 답변 수정 api 호출
export const updateAnswer = async (
  questionId: number,
  answerId: number,
  data: CreateAnswerRequest
): Promise<CreateAnswerResponse> => {
  const res = await api.put<CreateAnswerResponse>(
    getQuestionAnswerDetailPath(questionId, answerId),
    data
  )
  return res.data
}
