// GET/api/v1/qna/categories 응답
export type Category = {
  id: number
  name: string
  categoryType: 'large' | 'medium' | 'small'
  children: Category[]
}

export type CategoryResponse = {
  categories: Category[]
}
