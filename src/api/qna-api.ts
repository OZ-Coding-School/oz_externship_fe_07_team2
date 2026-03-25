import { QNA_API } from '@/constants/qna'
import type { QnaListResponse } from '@/features/qna-list'
import type {
  CategoryResponse,
  CreateQuestionRequest,
  CreateQuestionResponse,
  GetPresignedUrlResponse,
  GetQnaListParams,
  QnaQuestionDetail,
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from '@/types'

import { api } from './api'

// 카테고리 조회 api 호출
export const getCategories = async (): Promise<CategoryResponse> => {
  const res = await api.get<CategoryResponse>(`${QNA_API.categories}`)
  return res.data
}

// 질문 목록 조회 api 호출
export const getQnaList = async (
  params?: GetQnaListParams
): Promise<QnaListResponse> => {
  const res = await api.get<QnaListResponse>(`${QNA_API.questions}`, {
    params,
  })
  return res.data
}

// 질문 등록 api 호출
export const createQuestion = async (
  data: CreateQuestionRequest
): Promise<CreateQuestionResponse> => {
  const res = await api.post<CreateQuestionResponse>(QNA_API.questions, data)
  return res.data
}

const getQuestionPath = (questionId: number) =>
  `${QNA_API.questions.replace(/\/$/, '')}/${questionId}/`

// 질문 상세 조회 api 호출
export const getQuestionDetail = async (
  questionId: number
): Promise<QnaQuestionDetail> => {
  const res = await api.get<QnaQuestionDetail>(getQuestionPath(questionId))
  return res.data
}

// 질문 수정 api 호출
export const updateQuestion = async (
  questionId: number,
  data: UpdateQuestionRequest
): Promise<UpdateQuestionResponse> => {
  const res = await api.put<UpdateQuestionResponse>(
    getQuestionPath(questionId),
    data
  )
  return res.data
}

// S3에 직접 업로드 (presigned URL 사용)
export const uploadImageToS3 = async (PresignedUrl: string, file: File) => {
  await fetch(PresignedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  })
}

// presignedUrl api호출
export const getPresignedUrl = async (
  fileName: string
): Promise<GetPresignedUrlResponse> => {
  const res = await api.put(QNA_API.presignedUrl, { file_name: fileName })
  return res.data
}
