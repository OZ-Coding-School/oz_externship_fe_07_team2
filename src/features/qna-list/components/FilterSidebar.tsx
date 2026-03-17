import { Button, Loading } from '@/components'
import { findSelectedCategory } from '@/features/qna-list/utils/categoryFilter'
import useCategoriesQuery from '@/queries/useCategoriesQuery'
import CategoryDropdown, {
  type SelectedCategory,
} from '@/shared/CategoryDropdown'
import { RotateCw, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

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
  const { data: categories = [], isPending, isError } = useCategoriesQuery()

  const appliedSelection = useMemo(
    () => findSelectedCategory(categories, isAppliedCategory),
    [categories, isAppliedCategory]
  )
  const [pendingSelection, setPendingSelection] =
    useState<SelectedCategory>(appliedSelection)
  const [dropdownKey, setDropdownKey] = useState(0)

  //filter Open 시 스크롤 없애기
  useBodyScrollLock(isFilterOpen)

  useEffect(() => {
    if (!isFilterOpen) return

    setPendingSelection(appliedSelection)
    setDropdownKey((prev) => prev + 1)
  }, [appliedSelection, isFilterOpen])

  const selectedCategoryId =
    pendingSelection.small?.id ??
    pendingSelection.medium?.id ??
    pendingSelection.large?.id ??
    null

  const isApplyDisabled = selectedCategoryId === isAppliedCategory

  const handleReset = () => {
    const emptySelection = {
      large: null,
      medium: null,
      small: null,
    }

    setPendingSelection(emptySelection)
    setDropdownKey((prev) => prev + 1)
  }

  const handleApply = () => {
    onCategoryFilterApply?.(selectedCategoryId)
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
              {isPending ? (
                <div className="flex justify-center py-10">
                  <Loading />
                </div>
              ) : isError ? (
                <div className="text-text-light py-10 text-center text-sm">
                  카테고리를 불러오지 못했습니다.
                </div>
              ) : (
                <CategoryDropdown
                  key={dropdownKey}
                  categories={categories}
                  direction="column"
                  initialValue={pendingSelection}
                  onSelect={setPendingSelection}
                />
              )}
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
