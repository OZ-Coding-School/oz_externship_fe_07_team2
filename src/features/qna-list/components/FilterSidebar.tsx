import { Button, Dropdown } from '@/components'
import useCategoryFilter from '@/features/qna-list/hooks/category/useCategoryFilter'
import useCategoryOptions from '@/features/qna-list/hooks/category/useCategoryOptions'
import { RotateCw, X } from 'lucide-react'
import { useEffect } from 'react'

type FilterSidebarProps = {
  isFilterOpen: boolean
  onFilterClose: () => void
  isAppliedCategory: number | null
  onCategoryFilterApply?: (categoryId: number | null) => void
}

//filter open 시 스크롤 없애기
function useBodyScrollLock(isFilterOpen: boolean) {
  useEffect(() => {
    if (!isFilterOpen) {
      document.body.style.overflow = 'auto'
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isFilterOpen])
}

export default function FilterSidebar({
  isFilterOpen,
  onFilterClose,
  isAppliedCategory,
  onCategoryFilterApply,
}: FilterSidebarProps) {
  const {
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
  } = useCategoryFilter()

  const {
    appliedCategoryPath,
    largeDropdownOptions,
    mediumDropdownOptions,
    smallDropdownOptions,
    largeCategoryValue,
    mediumCategoryValue,
    smallCategoryValue,
  } = useCategoryOptions({
    appliedCategoryId: isAppliedCategory,
    selectedLarge,
    selectedMedium,
    selectedSmall,
  })

  //filter Open 시 스크롤 없애기
  useBodyScrollLock(isFilterOpen)

  // 사이드바가 열릴 때 현재 적용된 카테고리 상태를 내부 필터 상태와 동기화
  // 부모 페이지에서 전달된 isAppliedCategory 값을 기준으로
  // 대 / 중 / 소 카테고리 선택 상태를 복원한다.
  useEffect(() => {
    // 사이드바가 닫혀있을 때는 동기화할 필요 없음
    if (!isFilterOpen) return

    // 현재 적용된 카테고리를 훅 내부 상태(selectedLarge, selectedMedium, selectedSmall)에 반영
    syncCategoryFilter(appliedCategoryPath)
  }, [appliedCategoryPath, isFilterOpen, syncCategoryFilter])

  const isApplyDisabled = selectedCategoryId === isAppliedCategory

  // 선택 초기화: 대분류 선택을 초기 상태로 되돌림
  const handleReset = () => {
    resetCategoryFilter()
  }

  // 필터 적용: 사이드바 닫기 (실제 필터링은 부모 페이지에서 처리)
  const handleApply = () => {
    // 선택된 카테고리를 부모 페이지로 전달
    onCategoryFilterApply?.(selectedCategoryId)

    // 사이드바 닫기
    onFilterClose()
  }

  if (!isFilterOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      onClick={onFilterClose}
    >
      <div
        className="bg-surface-default flex h-full w-full flex-col rounded-l-xl rounded-bl-xl md:h-270 md:w-135"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-11.5">
          <div className="mt-11.25 flex items-center justify-between">
            <div className="text-[32px]">필터</div>
            <Button variant={'text'} onClick={onFilterClose} className="p-0">
              <X size={34} className="text-text-light" />
            </Button>
          </div>

          <div className="mt-15">
            <div className="mb-5 flex items-center gap-2">
              <div className="text-text-sub text-xl font-bold">
                카테고리 선택
              </div>
              {isAppliedCategory !== null && (
                <span className="bg-primary-100 text-primary rounded-full px-2.5 py-1 text-xs font-semibold">
                  필터 적용 중
                </span>
              )}
            </div>

            <div className="space-y-5">
              <Dropdown
                value={largeCategoryValue}
                options={largeDropdownOptions}
                placeHolder="대분류"
                onSelect={(option) => handleLargeChange(option.id)}
              />
              <Dropdown
                value={mediumCategoryValue}
                options={mediumDropdownOptions}
                placeHolder="중분류"
                disabled={mediumDisable}
                onSelect={(option) => handleMediumChange(option.id)}
              />
              <Dropdown
                value={smallCategoryValue}
                options={smallDropdownOptions}
                placeHolder="소분류"
                disabled={smallDisable}
                onSelect={(option) => handleSmallChange(option.id)}
              />
            </div>
          </div>
        </div>

        <div className="shadow-modal bg-surface-sub mt-auto flex w-full justify-between rounded-bl-xl px-5 py-5 text-xl [&>button]:w-full">
          <Button variant={'text'} size={'lg'} onClick={handleReset}>
            <RotateCw className="mr-1" /> 선택 초기화
          </Button>

          <Button size={'lg'} onClick={handleApply} disabled={isApplyDisabled}>
            필터 적용하기
          </Button>
        </div>
      </div>
    </div>
  )
}
