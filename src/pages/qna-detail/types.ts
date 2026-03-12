export type QnaAuthor = {
  id: number
  name: string
  avatar_url?: string
}

export type QnaQuestion = {
  id: number
  name: string[]
  title: string
  content: string
  author: QnaAuthor
  view_count: number
  created_at: string
}
