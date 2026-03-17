import type { QnaImage, QnaQuestionDetail } from '@/features/qna-detail/types'

export type AnswerStatus = 'answered' | 'waiting'

export type GetQnaListParams = {
  page?: number
  size?: number
  search_keyword?: string
  category_id?: number
  answer_status?: AnswerStatus
  sort?: string
}

export type CreateQuestionRequest = {
  title: QnaQuestionDetail['title']
  content: QnaQuestionDetail['content']
  category: number
  image_ids?: QnaImage['id'][]
}

export type CreateQuestionResponse = QnaQuestionDetail

export type UpdateQuestionRequest = Partial<CreateQuestionRequest>

export type UpdateQuestionResponse = QnaQuestionDetail
