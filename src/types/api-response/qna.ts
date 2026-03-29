import type { QnaQuestionDetail } from './detail'

// 질문 목록 조회 시 사용하는 답변 상태 query 값
export type AnswerStatus = 'answered' | 'unanswered'

export type QnaSort = 'latest' | 'views'

// 질문 목록 조회 API의 query parameter 타입
export type GetQnaListParams = {
  page?: number
  size?: number
  search?: string
  category_id?: number
  answer_status?: AnswerStatus
  sort?: QnaSort
}

// 질문 등록 API 요청 본문 타입
export type CreateQuestionRequest = {
  category_id: number
  title: string
  content: string
  image_urls?: string[]
}

// 답변 등록 API 요청 본문 타입
export type CreateAnswerRequest = {
  content: string
  image_urls: string[]
}

// 답변 등록 API 응답 타입
export type CreateAnswerResponse = {
  id: number
  content: string
  created_at: string
  is_adopted: boolean
  image_urls?: string[]
  author: {
    id: number
    nickname: string
    profile_image_url: string | null
  }
}

export type CreateAnswerCommentRequest = {
  content: string
  image_urls: string[]
}

export type CreateAnswerCommentResponse = {
  id: number
  content: string
  created_at: string
  author: {
    id: number
    nickname: string
    profile_img_url: string | null
  }
}

export type CreateQuestionResponse = QnaQuestionDetail

// 질문 수정은 등록 요청 타입을 일부만 보내는 형태로 재사용한다.
export type UpdateQuestionRequest = Partial<CreateQuestionRequest>

export type UpdateQuestionResponse = QnaQuestionDetail

export type GetPresignedUrlRequest = {
  file_name: string
}

export type GetPresignedUrlResponse = {
  presigned_url: string
  img_url: string
  key: string
}
