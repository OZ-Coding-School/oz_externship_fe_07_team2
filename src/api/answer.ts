import { QNA_API } from '@/constants/qna-api-endpoints'
import type {
  CreateAnswerCommentRequest,
  CreateAnswerCommentResponse,
  CreateAnswerRequest,
  CreateAnswerResponse,
} from '@/types'

import { api } from './api'

// 답변 등록
export const createAnswer = async (
  questionId: number,
  data: CreateAnswerRequest
): Promise<CreateAnswerResponse> => {
  const res = await api.post(QNA_API.QUESTION_ANSWERS(questionId), data)
  return res.data
}

// 답변 수정
export const updateAnswer = async (
  answerId: number,
  data: CreateAnswerRequest
): Promise<CreateAnswerResponse> => {
  const res = await api.put(QNA_API.ANSWER_DETAIL(answerId), data)
  return res.data
}

// 댓글 등록
export const createAnswerComment = async (
  answerId: number,
  data: CreateAnswerCommentRequest
): Promise<CreateAnswerCommentResponse> => {
  const res = await api.post(QNA_API.ANSWER_COMMENTS(answerId), data)
  return res.data
}

// 채택
export const adoptAnswer = async (answerId: number): Promise<void> => {
  await api.post(QNA_API.ANSWER_ADOPT(answerId), {
    content: '',
    image_urls: [],
  })
}
