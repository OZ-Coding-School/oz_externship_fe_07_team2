import type { QnaImage, QnaQuestionDetail } from './detail'

// 질문 목록 조회 시 사용하는 답변 상태 query 값
export type AnswerStatus = 'answered' | 'waiting'

// 질문 목록 조회 API의 query parameter 타입
export type GetQnaListParams = {
  page?: number
  size?: number
  search_keyword?: string
  category_id?: number
  answer_status?: AnswerStatus
  sort?: string
}

// 질문 등록 API 요청 본문 타입
export type CreateQuestionRequest = {
  title: QnaQuestionDetail['title']
  content: QnaQuestionDetail['content']
  category: number
  image_ids?: QnaImage['id'][]
}

export type CreateQuestionResponse = QnaQuestionDetail

// 질문 수정은 등록 요청 타입을 일부만 보내는 형태로 재사용한다.
export type UpdateQuestionRequest = Partial<CreateQuestionRequest>

export type UpdateQuestionResponse = QnaQuestionDetail
