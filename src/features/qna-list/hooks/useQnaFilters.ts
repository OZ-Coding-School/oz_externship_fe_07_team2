// Q&A 목록 페이지에서 사용하는 필터 로직 훅
// 검색, 탭 상태(답변완료/대기중), 정렬, 카테고리 조건을 기반으로
// 질문 목록을 필터링하여 새로운 배열을 반환한다.

import type { QnaFilters, QnaListItem } from '@/features/qna-list'
import { mockCategories } from '@/mocks/data/category-mock'
import type { Category } from '@/types'

// 특정 categoryId를 카테고리 트리에서 재귀적으로 찾아 반환하는 함수
// 대/중/소 구조이기 때문에 children을 계속 탐색한다.
function findCategory(
  categoryId: number,
  categories: Category[]
): Category | null {
  for (const category of categories) {
    // 현재 카테고리 id가 찾는 id와 같으면 해당 카테고리 반환
    if (category.id === categoryId) {
      return category
    }

    // 하위 카테고리(children)에서도 동일한 id가 있는지 재귀 탐색
    const found = findCategory(categoryId, category.children)

    if (found) {
      return found
    }
  }

  return null
}

// 선택된 카테고리와 그 하위 모든 카테고리 id를 수집하는 함수
// 상위 카테고리를 선택했을 때 하위 질문들도 함께 필터링하기 위해 사용
function collectCategoryIds(category: Category): number[] {
  // 현재 카테고리 id + 모든 하위 카테고리 id를 재귀적으로 모아서 반환
  return [
    category.id,
    ...category.children.flatMap((childCategory) =>
      collectCategoryIds(childCategory)
    ),
  ]
}

// 질문 목록과 현재 필터 상태를 받아서
// 조건에 맞는 질문 목록만 반환하는 필터링 훅
export default function useQnaFilters(
  questions: QnaListItem[],
  filters: QnaFilters
): QnaListItem[] {
  // 원본 배열을 유지하기 위해 질문 목록을 복사해서 사용
  let result = [...questions]

  // 검색어 필터링 (제목 + 내용 미리보기 기준)
  if (filters.search) {
    // 검색어를 소문자로 변환하여 대소문자 구분 없이 비교
    const keyword = filters.search.toLowerCase() // 대소문자로 변환

    result = result.filter((question) => {
      return (
        question.title.toLowerCase().includes(keyword) ||
        question.content_preview.toLowerCase().includes(keyword)
      )
    })
  }

  // 탭 필터링 (답변 완료 / 답변 대기)
  if (filters.tab === 'answered') {
    result = result.filter((question) => question.answer_count > 0)
  }
  if (filters.tab === 'pending') {
    result = result.filter((question) => question.answer_count === 0)
  }

  // 정렬 필터링 (최신순 / 오래된순)
  if (filters.sort === 'latest') {
    result = [...result].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  if (filters.sort === 'oldest') {
    result = [...result].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
  }

  // 카테고리 필터링
  if (filters.category !== null) {
    // 선택된 카테고리를 카테고리 트리에서 찾기
    const selectedCategory = findCategory(filters.category, mockCategories)
    // 상위 카테고리를 선택했을 경우 하위 카테고리 id까지 포함
    const categoryIds = selectedCategory
      ? new Set(collectCategoryIds(selectedCategory))
      : new Set([filters.category])

    result = result.filter((question) => categoryIds.has(question.category.id))
  }

  // 모든 필터가 적용된 최종 질문 목록 반환
  return result
}
