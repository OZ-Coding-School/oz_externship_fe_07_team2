// GET/api/v1/qna/categories 응답
export type CategoryType = 'large' | 'medium' | 'small'

export type Category = {
  id: number
  name: string
  category_type: CategoryType
  children: Category[]
}

export type CategoryResponse = {
  categories: Category[]
}
