import { useCallback, useState } from 'react'
import type { CategoryPath } from '../../utils/categoryTree'

// 카테고리 선택 시 호출되는 핸들러 타입
type HandleCategoryChange = (value: number) => void

type UseCategoryFilterResult = {
  selectedLarge: number | null
  selectedMedium: number | null
  selectedSmall: number | null
  mediumDisable: boolean
  smallDisable: boolean
  handleLargeChange: HandleCategoryChange
  handleMediumChange: HandleCategoryChange
  handleSmallChange: HandleCategoryChange
  selectedCategoryId: number | null
  resetCategoryFilter: () => void
  syncCategoryFilter: (path: CategoryPath) => void
}

// Q&A 목록에서 사용하는 카테고리 필터 상태를 관리하는 훅
// 선택된 대/중/소 카테고리 상태와 최종 선택 id를 제공한다.
export default function useCategoryFilter(): UseCategoryFilterResult {
  // 현재 선택된 대 / 중 / 소 카테고리 상태를 한 객체로 관리
  const [selection, setSelection] = useState<CategoryPath>({
    largeId: null,
    mediumId: null,
    smallId: null,
  })
  const {
    largeId: selectedLarge,
    mediumId: selectedMedium,
    smallId: selectedSmall,
  } = selection

  const mediumDisable = selectedLarge === null
  const smallDisable = selectedMedium === null

  // 실제로 적용될 선택 카테고리 id
  const selectedCategoryId = selectedSmall ?? selectedMedium ?? selectedLarge

  // 대분류 선택 시
  // 중분류, 소분류는 초기화
  const handleLargeChange = (value: number) => {
    setSelection({
      largeId: value,
      mediumId: null,
      smallId: null,
    })
  }

  // 중분류 선택 시
  // 소분류는 초기화
  const handleMediumChange = (value: number) => {
    setSelection((prev) => ({
      ...prev,
      mediumId: value,
      smallId: null,
    }))
  }

  // 소분류 선택
  const handleSmallChange = (value: number) => {
    setSelection((prev) => ({
      ...prev,
      smallId: value,
    }))
  }

  // 모든 카테고리 선택 초기화
  const resetCategoryFilter = useCallback(() => {
    setSelection({
      largeId: null,
      mediumId: null,
      smallId: null,
    })
  }, [])

  /**
   * 외부에서 전달받은 카테고리 경로(CategoryPath)를 기반으로
   * 대 / 중 / 소 선택 상태를 한 번에 동기화하는 함수
   * 예: URL searchParams 또는 기존 필터 상태를 복원할 때 사용
   */
  const syncCategoryFilter = useCallback((path: CategoryPath) => {
    setSelection(path)
  }, [])

  // 훅에서 외부로 제공하는 값들
  return {
    selectedLarge,
    selectedMedium,
    selectedSmall,
    mediumDisable,
    smallDisable,
    handleLargeChange,
    handleMediumChange,
    handleSmallChange,
    selectedCategoryId,
    resetCategoryFilter,
    syncCategoryFilter,
  }
}
