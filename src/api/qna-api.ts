import type { QnaImage, QnaQuestionDetail } from '@/features/qna-detail/types'
import type { QnaListResponse } from '@/features/qna-list'
import type { CategoryResponse } from '@/types'
import { api } from './api'

// QnA 관련 API endpoint 상수
const QNA_API = {
  categories: '/qna/categories',
  questions: '/qna/questions',
}

// 질문 답변 상태 타입
export type AnswerStatus = 'answered' | 'waiting'

// QnA 목록 조회 API에서 사용하는 query parameter 타입
// GET /qna/questions 요청 시 서버에 전달되는 필터/검색 조건
// 예: 페이지, 검색어, 카테고리, 정렬 방식 등
export type GetQnaListParams = {
  page?: number
  size?: number
  search_keyword?: string
  category_id?: number
  answer_status?: AnswerStatus
  sort?: string
}

// 질문 등록 API 요청(Request) 데이터 타입
// POST /qna/questions 호출 시 서버에 보내는 데이터 구조
export type CreateQuestionRequest = {
  title: QnaQuestionDetail['title']
  content: QnaQuestionDetail['content']
  category: number
  image_ids?: QnaImage['id'][]
}

// 질문 등록 API 응답(Response) 타입
// 서버에서 반환되는 질문 상세 정보 형태
export type CreateQuestionResponse = QnaQuestionDetail

// 질문 수정 API 요청(Request) 타입
// Partial을 사용해서 CreateQuestionRequest의 모든 필드를 선택적으로 사용 가능
// 즉 수정할 필드만 보내도 되도록 만든 타입
export type UpdateQuestionRequest = Partial<CreateQuestionRequest>

// 질문 수정 API 응답(Response) 타입
// 수정 후 서버가 반환하는 질문 상세 정보
export type UpdateQuestionResponse = QnaQuestionDetail

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
