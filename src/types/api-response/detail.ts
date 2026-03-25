export type QnaAuthor = {
  id: number
  nickname: string
  profile_image_url: string | null
}

export type QnaCategory = {
  id: number
  depth: number
  names: string[]
}

export type QnaImage = {
  id: number
  img_url: string
}

export type QnaAnswerComment = {
  id: number
  content: string
  created_at: string
  author: QnaAuthor
}

export type QnaAnswer = {
  id: number
  content: string
  created_at: string
  is_adopted: boolean
  author: QnaAuthor
  comments: QnaAnswerComment[]
}

export type QnaAiAnswer = {
  id: number
  question_id: number
  output: string
  using_model: string
  created_at: string
}

export type QnaQuestionDetail = {
  id: number
  title: string
  content: string
  category: QnaCategory
  images: QnaImage[]
  view_count: number
  created_at: string
  author: QnaAuthor
  answers: QnaAnswer[]
}

export type AnswerPermissions = {
  isGuest: boolean
  canComment: boolean
  canEdit: boolean
  canDelete: boolean
  canAdopt: boolean
}
