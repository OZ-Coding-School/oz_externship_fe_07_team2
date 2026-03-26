import { QNA_API } from '@/constants/qna'
import type { CreateAnswerRequest, CreateAnswerResponse } from '@/types'

import { api } from './api'

const getQuestionAnswerPath = (questionId: number) =>
  `${QNA_API.questions.replace(/\/$/, '')}/${questionId}/answers`

const getAnswerPath = (answerId: number) =>
  `${QNA_API.answers.replace(/\/$/, '')}/${answerId}`

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
  const res = await api.put<CreateAnswerResponse>(getAnswerPath(answerId), data)
  return res.data
}

// 답변 채택 api 호출
export const adoptAnswer = async (
  questionId: number,
  answerId: number
): Promise<void> => {
  const res = await api.post(`${getAnswerPath(answerId)}/adopt`)
  return res.data
}
