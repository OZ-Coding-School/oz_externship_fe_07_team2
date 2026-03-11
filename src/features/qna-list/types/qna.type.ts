// 목록 API 응답 타입
export interface QnaListResponse {
  count: number
  next: string | null
  previous: string | null
  results: QnaQuestion[]
}

// 질문(카드) 데이터 타입
export interface QnaQuestion {
  id: number

  category: {
    id: number
    depth: number
    names: string[]
  }

  author: {
    id: number
    nickname: string
    profile_image_url: string | null
  }

  title: string
  content_preview: string

  answer_count: number
  view_count: number

  created_at: string

  thumbnail_img_url: string | null
}
