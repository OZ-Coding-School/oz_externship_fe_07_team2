// Q&A 목록 페이지에서 사용하는 카테고리 필터 로직을 관리하는 커스텀 훅
// 대분류 → 중분류 → 소분류 구조의 선택 상태와 드롭다운 옵션을 관리

import type { Category } from '@/types/api-response/category'
import { useCallback, useEffect, useState } from 'react'

// 카테고리 선택 시 호출되는 핸들러 타입
type HandleCategoryChange = (value: number) => void

// 드롭다운 컴포넌트에서 사용하는 옵션 형태
type CategoryOption = {
  label: string //화면에 표시되는 이름
  value: number //실제 카테고리 id
}

// useCategoryFilter 훅에서 반환하는 값들의 타입
// 드롭다운 옵션, 선택된 값, 변경 핸들러, 필터 상태 등을 포함
type UseCategoryFilterResult = {
  largeOptions: CategoryOption[]
  mediumOptions: CategoryOption[]
  smallOptions: CategoryOption[]
  selectedLarge: number | null
  selectedMedium: number | null
  selectedSmall: number | null
  handleLargeChange: HandleCategoryChange
  handleMediumChange: HandleCategoryChange
  handleSmallChange: HandleCategoryChange
  selectedCategoryId: number | null
  hasFilterChanged: boolean
  resetCategoryFilter: () => void
  restoreCategoryFilter: () => void
}

// API에서 받은 카테고리 데이터를
// 드롭다운에서 사용할 수 있는 { label, value } 형태로 변환
function toOptions(categories: Category[]): CategoryOption[] {
  // 카테고리 배열을 순회하면서 옵션 형태로 변환
  return categories.map((category) => ({
    label: category.name,
    value: category.id,
  }))
}

// 특정 카테고리 id가
// 대 / 중 / 소 중 어디에 속하는지 나타내는 경로 구조
type CategoryPath = {
  largeId: number | null
  mediumId: number | null
  smallId: number | null
}

// categoryId가 주어졌을 때
// 해당 카테고리가 대/중/소 중 어디에 있는지 찾아서 경로를 반환한다.
// (필터를 다시 열었을 때 선택 상태를 복원하기 위해 사용)
function findCategoryPath(
  categories: Category[],
  targetId: number | null
): CategoryPath {
  // 선택된 카테고리가 없으면 전체 null 반환
  if (targetId === null) {
    return { largeId: null, mediumId: null, smallId: null }
  }

  // 카테고리 트리를 순회하면서
  // 대분류 → 중분류 → 소분류 순서로 찾는다
  for (const large of categories) {
    if (large.id === targetId) {
      return { largeId: large.id, mediumId: null, smallId: null }
    }

    for (const medium of large.children) {
      if (medium.id === targetId) {
        return { largeId: large.id, mediumId: medium.id, smallId: null }
      }

      for (const small of medium.children) {
        if (small.id === targetId) {
          return { largeId: large.id, mediumId: medium.id, smallId: small.id }
        }
      }
    }
  }

  return { largeId: null, mediumId: null, smallId: null }
}

// Q&A 목록에서 사용하는 카테고리 필터 상태를 관리하는 훅
// 선택된 대/중/소 카테고리 상태와 드롭다운 옵션을 계산한다.
export default function useCategoryFilter(
  categories: Category[],
  appliedCategoryId: number | null
): UseCategoryFilterResult {
  // 현재 선택된 대 / 중 / 소 카테고리 상태
  const [selectedLarge, setSelectedLarge] = useState<number | null>(null)
  const [selectedMedium, setSelectedMedium] = useState<number | null>(null)
  const [selectedSmall, setSelectedSmall] = useState<number | null>(null)

  // 대분류 드롭다운 옵션
  const largeOptions = toOptions(categories)

  // 현재 선택된 대분류 카테고리 객체
  const selectedLargeCategory =
    categories.find((category) => category.id === selectedLarge) ?? null

  // 선택된 대분류에 해당하는 중분류 옵션
  const mediumOptions = toOptions(selectedLargeCategory?.children ?? [])

  // 현재 선택된 중분류 카테고리 객체
  const selectedMediumCategory =
    selectedLargeCategory?.children.find(
      (category) => category.id === selectedMedium
    ) ?? null

  // 선택된 중분류에 해당하는 소분류 옵션
  const smallOptions = toOptions(selectedMediumCategory?.children ?? [])

  const restoreCategoryFilter = useCallback(() => {
    const nextPath = findCategoryPath(categories, appliedCategoryId)

    setSelectedLarge(nextPath.largeId)
    setSelectedMedium(nextPath.mediumId)
    setSelectedSmall(nextPath.smallId)
  }, [appliedCategoryId, categories])

  // appliedCategoryId가 변경되면
  // 해당 id의 카테고리 경로를 찾아서
  // 대 / 중 / 소 선택 상태를 복원한다.
  useEffect(() => {
    restoreCategoryFilter()
  }, [restoreCategoryFilter])

  // 현재 선택된 카테고리와
  // 실제 적용된 필터 값이 다른지 확인
  const hasFilterChanged =
    (selectedSmall ?? selectedMedium ?? selectedLarge) !== appliedCategoryId

  // 대분류 선택 시
  // 중분류, 소분류는 초기화
  const handleLargeChange = (value: number) => {
    setSelectedLarge(value)
    setSelectedMedium(null)
    setSelectedSmall(null)
  }

  // 중분류 선택 시
  // 소분류는 초기화
  const handleMediumChange = (value: number) => {
    setSelectedMedium(value)
    setSelectedSmall(null)
  }

  // 소분류 선택
  const handleSmallChange = (value: number) => {
    setSelectedSmall(value)
  }

  // 모든 카테고리 선택 초기화
  const resetCategoryFilter = () => {
    setSelectedLarge(null)
    setSelectedMedium(null)
    setSelectedSmall(null)
  }

  // 훅에서 외부로 제공하는 값들
  return {
    largeOptions,
    mediumOptions,
    smallOptions,
    selectedLarge,
    selectedMedium,
    selectedSmall,
    handleLargeChange,
    handleMediumChange,
    handleSmallChange,
    selectedCategoryId: selectedSmall ?? selectedMedium ?? selectedLarge,
    hasFilterChanged,
    resetCategoryFilter,
    restoreCategoryFilter,
  }
}
