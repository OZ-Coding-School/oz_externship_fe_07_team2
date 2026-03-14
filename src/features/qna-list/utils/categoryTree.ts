import type { Category } from '@/types/api-response/category'

// 카테고리 선택 상태를 표현하는 타입
// 대 / 중 / 소 카테고리의 선택 id를 각각 저장
export type CategoryPath = {
  largeId: number | null
  mediumId: number | null
  smallId: number | null
}

// 카테고리를 UI 옵션으로 변환할 때 사용하는 내부 타입
// 드롭다운이나 선택 옵션에서 사용
type CategoryOption = {
  value: number
  label: string
}

// 공통 Dropdown 컴포넌트에서 사용하는 옵션 타입
export type DropdownOption = {
  id: number //id → 실제 값
  value: string // value → 화면에 표시되는 문자열
}

/*
 * API로 받아온 Category 데이터를
 * UI에서 사용할 CategoryOption 형태로 변환하는 함수
 * { id, name } → { value, label }
 */
export function toCategoryOptions(categories: Category[]): CategoryOption[] {
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
}

/**
 * CategoryOption 배열을 Dropdown 컴포넌트에서 사용할 수 있는
 * DropdownOption 형태로 변환하는 함수
 *
 * @param options - CategoryOption 배열 (대/중/소 카테고리 옵션). undefined일 수 있음
 * @returns DropdownOption[] - Dropdown 컴포넌트에 전달할 옵션 배열
 *
 * 동작 방식
 * - options가 존재하면 map을 통해 { id, value } 형태로 변환
 * - options가 undefined일 경우 optional chaining으로 안전하게 처리
 * - 값이 없을 경우 기본값으로 빈 배열([]) 반환
 */
export function toDropdownOptions(
  options: CategoryOption[] | undefined
): DropdownOption[] {
  return (
    options?.map((option) => ({
      id: option.value,
      value: option.label,
    })) ?? []
  )
}

// 특정 categoryId가 어떤 위치(대/중/소)에 속하는지
// 전체 카테고리 트리를 순회하면서 찾는 함수
export function findCategoryPath(
  categories: Category[],
  categoryId: number | null
): CategoryPath {
  // 선택된 카테고리가 없는 경우
  if (categoryId === null) {
    return {
      largeId: null,
      mediumId: null,
      smallId: null,
    }
  }

  // 대 → 중 → 소 카테고리 트리를 순회하면서 id 찾기
  for (const largeCategory of categories) {
    // 대분류가 일치하는 경우
    if (largeCategory.id === categoryId) {
      return {
        largeId: largeCategory.id,
        mediumId: null,
        smallId: null,
      }
    }

    // 중분류 탐색
    for (const mediumCategory of largeCategory.children ?? []) {
      if (mediumCategory.id === categoryId) {
        return {
          largeId: largeCategory.id,
          mediumId: mediumCategory.id,
          smallId: null,
        }
      }

      // 소분류 탐색
      for (const smallCategory of mediumCategory.children ?? []) {
        if (smallCategory.id === categoryId) {
          return {
            largeId: largeCategory.id,
            mediumId: mediumCategory.id,
            smallId: smallCategory.id,
          }
        }
      }
    }
  }

  // 일치하는 카테고리를 찾지 못한 경우
  return {
    largeId: null,
    mediumId: null,
    smallId: null,
  }
}
