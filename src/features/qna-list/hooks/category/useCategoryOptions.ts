import { mockCategories } from '@/mocks/data/category-mock'
import { useMemo } from 'react'
import {
  findCategoryPath,
  toCategoryOptions,
  toDropdownOptions,
} from '../../utils/categoryTree'

type UseCategoryOptionsParams = {
  appliedCategoryId: number | null
  selectedLarge: number | null
  selectedMedium: number | null
  selectedSmall: number | null
}

type UseCategoryOptionsResult = {
  appliedCategoryPath: ReturnType<typeof findCategoryPath>
  largeDropdownOptions: ReturnType<typeof toDropdownOptions>
  mediumDropdownOptions: ReturnType<typeof toDropdownOptions>
  smallDropdownOptions: ReturnType<typeof toDropdownOptions>
  largeCategoryValue: string | null
  mediumCategoryValue: string | null
  smallCategoryValue: string | null
}

function findCategoryValue(
  options: ReturnType<typeof toCategoryOptions>,
  selectedId: number | null
): string | null {
  return options.find((option) => option.value === selectedId)?.label ?? null
}

export default function useCategoryOptions({
  appliedCategoryId,
  selectedLarge,
  selectedMedium,
  selectedSmall,
}: UseCategoryOptionsParams): UseCategoryOptionsResult {
  // 현재 "적용 중인" 카테고리 id를 대/중/소 선택 경로로 변환

  // FilterSidebar가 열릴 때 내부 선택 상태를 복원할 때 사용
  const appliedCategoryPath = useMemo(
    () => findCategoryPath(mockCategories, appliedCategoryId),
    [appliedCategoryId]
  )

  // 대분류는 항상 전체 목록을 기준으로 옵션을 만듬
  const largeCategoryOptions = toCategoryOptions(mockCategories)
  const largeCategoryValue = findCategoryValue(
    largeCategoryOptions,
    selectedLarge
  )

  // 중분류/소분류 옵션은 현재 선택된 상위 카테고리 기준으로만 계산
  const selectedLargeCategory = mockCategories.find(
    (category) => category.id === selectedLarge
  )
  const mediumCategoryOptions = toCategoryOptions(
    selectedLargeCategory?.children ?? []
  )
  const mediumCategoryValue = findCategoryValue(
    mediumCategoryOptions,
    selectedMedium
  )

  const selectedMediumCategory = selectedLargeCategory?.children?.find(
    (category) => category.id === selectedMedium
  )
  const smallCategoryOptions = toCategoryOptions(
    selectedMediumCategory?.children ?? []
  )
  const smallCategoryValue = findCategoryValue(
    smallCategoryOptions,
    selectedSmall
  )

  return {
    // Dropdown 컴포넌트가 바로 사용할 수 있는 형태로 변환해서 넘김
    appliedCategoryPath,
    largeDropdownOptions: toDropdownOptions(largeCategoryOptions),
    mediumDropdownOptions: toDropdownOptions(mediumCategoryOptions),
    smallDropdownOptions: toDropdownOptions(smallCategoryOptions),
    largeCategoryValue,
    mediumCategoryValue,
    smallCategoryValue,
  }
}
