export type QnaAuthor = {
  id: number
  name: string
  avatar_url?: string
}

export type QnaQuestion = {
  id: number
  title: string
  content: string
  category_name: string
  sub_category_name?: string
  author: QnaAuthor
  view_count: number
  created_at: string
}
