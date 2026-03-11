export type QnaAuthor = {
  id: number
  name: string
  avatarUrl?: string
  role?: string
}

export type QnaQuestion = {
  id: number
  category: string
  subCategory?: string
  title: string
  content: string
  author: QnaAuthor
  viewCount: number
  createdAt: string
}
