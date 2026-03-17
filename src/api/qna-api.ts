import { QNA_API } from '@/constants/qna'
import type { QnaListResponse } from '@/features/qna-list'
import type {
  CategoryResponse,
  CreateQuestionRequest,
  CreateQuestionResponse,
  GetQnaListParams,
  QnaQuestionDetail,
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from '@/types'

import { api } from './api'

// 카테고리 조회 api 호출
export const getCategories = async (): Promise<CategoryResponse> => {
  const res = await api.get<CategoryResponse>(QNA_API.categories)
  return res.data
}

// 질문 목록 조회 api 호출
export const getQnaList = async (
  params?: GetQnaListParams
): Promise<QnaListResponse> => {
  const res = await api.get<QnaListResponse>(QNA_API.questions, { params })
  return res.data
}

// 질문 등록 api 호출
export const createQuestion = async (
  data: CreateQuestionRequest
): Promise<CreateQuestionResponse> => {
  const res = await api.post<CreateQuestionResponse>(QNA_API.questions, data)
  return res.data
}

// 질문 상세 조회 api 호출
export const getQuestionDetail = async (
  questionId: number
): Promise<QnaQuestionDetail> => {
  const res = await api.get<QnaQuestionDetail>(
    `${QNA_API.questions}/${questionId}`
  )
  return res.data
}

// 질문 수정 api 호출
export const updateQuestion = async (
  questionId: number,
  data: UpdateQuestionRequest
): Promise<UpdateQuestionResponse> => {
  const res = await api.put<UpdateQuestionResponse>(
    `${QNA_API.questions}/${questionId}`,
    data
  )
  return res.data
}
