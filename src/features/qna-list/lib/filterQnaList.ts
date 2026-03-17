import type { QnaListItem } from '@/features/qna-list'
import type { Category } from '@/types/api-response/category'

// 카테고리 트리에서 선택된 카테고리를 재귀적으로 찾는다.
function findCategory(
  categoryId: number,
  categories: Category[]
): Category | null {
  for (const category of categories) {
    if (category.id === categoryId) {
      return category
    }

    const found = findCategory(categoryId, category.children)

    if (found) {
      return found
    }
  }

  return null
}

// 부모 카테고리 선택 시 하위 카테고리까지 함께 포함하기 위해 id를 모두 수집한다.
function collectCategoryIds(category: Category): number[] {
  return [
    category.id,
    ...category.children.flatMap((childCategory) =>
      collectCategoryIds(childCategory)
    ),
  ]
}

export type QnaListFilterOptions = {
  search: string
  tab: string
  sort: string
  category: number | null
}

// 제목과 미리보기 본문에 검색어가 포함된 질문만 남긴다.
function applySearchFilter(
  questions: QnaListItem[],
  search: string
): QnaListItem[] {
  if (!search) {
    return questions
  }

  const keyword = search.toLowerCase()

  return questions.filter((question) => {
    return (
      question.title.toLowerCase().includes(keyword) ||
      question.content_preview.toLowerCase().includes(keyword)
    )
  })
}

// 답변 완료/대기 상태에 맞는 질문만 남긴다.
function applyStatusFilter(
  questions: QnaListItem[],
  tab: string
): QnaListItem[] {
  if (tab === 'answered') {
    return questions.filter((question) => question.answer_count > 0)
  }

  if (tab === 'pending') {
    return questions.filter((question) => question.answer_count === 0)
  }

  return questions
}

function applySort(questions: QnaListItem[], sort: string): QnaListItem[] {
  if (sort === 'oldest') {
    return [...questions].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  }

  return [...questions].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

// 선택한 카테고리와 그 하위 카테고리에 속한 질문만 남긴다.
function applyCategoryFilter(
  questions: QnaListItem[],
  categoryId: number | null,
  categories: Category[]
): QnaListItem[] {
  if (categoryId === null) {
    return questions
  }

  const selectedCategory = findCategory(categoryId, categories)
  const categoryIds = selectedCategory
    ? new Set(collectCategoryIds(selectedCategory))
    : new Set([categoryId])

  return questions.filter((question) => categoryIds.has(question.category.id))
}

// QnA 목록에 검색, 탭, 정렬, 카테고리 조건을 순서대로 적용한다.
export function filterQnaList(
  questions: QnaListItem[],
  filters: QnaListFilterOptions,
  categories: Category[]
): QnaListItem[] {
  const searchedQuestions = applySearchFilter(questions, filters.search)
  const statusFilteredQuestions = applyStatusFilter(
    searchedQuestions,
    filters.tab
  )
  const sortedQuestions = applySort(statusFilteredQuestions, filters.sort)

  return applyCategoryFilter(sortedQuestions, filters.category, categories)
}

// API query params를 프론트에서 쓰는 필터 형태로 변환한다.
export function createQnaFiltersFromApiParams(params: {
  search_keyword: string
  answer_status: string | null
  sort: string
  category_id: number | null
}): QnaListFilterOptions {
  return {
    search: params.search_keyword,
    tab:
      params.answer_status === 'waiting'
        ? 'pending'
        : (params.answer_status ?? 'all'),
    sort: params.sort,
    category: params.category_id,
  }
}
