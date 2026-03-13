import { Button, Dropdown } from '@/components'
import useCategoryFilter from '@/features/qna-list/hooks/useCategoryFilter'
import { mockCategories } from '@/mocks/data/category-mock'
import { RotateCw, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type FilterSidebarProps = {
  open: boolean
  onClose: () => void
  appliedCategoryId: number | null
  onApply?: (categoryId: number | null) => void
}

export default function FilterSidebar({
  open,
  onClose,
  appliedCategoryId,
  onApply,
}: FilterSidebarProps) {
  const {
    largeOptions,
    mediumOptions,
    smallOptions,
    selectedLarge,
    selectedMedium,
    selectedSmall,
    handleLargeChange,
    handleMediumChange,
    handleSmallChange,
    resetCategoryFilter,
    restoreCategoryFilter,
    selectedCategoryId,
    hasFilterChanged,
  } = useCategoryFilter(mockCategories, appliedCategoryId)

  const [resetKey, setResetKey] = useState(0)

  const mapOptions = (options: { label: string; value: number }[]) =>
    options.map((opt) => ({
      id: opt.value,
      value: opt.label,
    }))

  const selectedLargeLabel = largeOptions.find(
    (option) => option.value === selectedLarge
  )?.label
  const selectedMediumLabel = mediumOptions.find(
    (option) => option.value === selectedMedium
  )?.label
  const selectedSmallLabel = smallOptions.find(
    (option) => option.value === selectedSmall
  )?.label

  // 선택 초기화: 대분류 선택을 초기 상태로 되돌림
  const handleReset = () => {
    resetCategoryFilter()
    setResetKey((prev) => prev + 1)
  }

  // 필터 적용: 사이드바 닫기 (실제 필터링은 부모 페이지에서 처리)
  const handleApply = () => {
    // 선택된 카테고리를 부모 페이지로 전달
    onApply?.(selectedCategoryId)

    // 사이드바 닫기
    onClose()
  }

  //스크롤  없애기
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0px'
      return
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.paddingRight = '0px'
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    restoreCategoryFilter()
    setResetKey((prev) => prev + 1)
  }, [open, restoreCategoryFilter])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-surface-default flex h-full w-full flex-col rounded-l-xl rounded-bl-xl md:h-270 md:w-135"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-11.5">
          <div className="mt-11.25 flex items-center justify-between">
            <div className="text-[32px]">필터</div>
            <Button variant={'text'} onClick={onClose} className="p-0">
              <X size={34} className="text-text-light" />
            </Button>
          </div>

          <div className="mt-15">
            <div className="mb-5 flex items-center gap-2">
              <div className="text-text-sub text-xl font-bold">
                카테고리 선택
              </div>
              {appliedCategoryId !== null && (
                <span className="bg-primary-100 text-primary rounded-full px-2.5 py-1 text-xs font-semibold">
                  필터 적용 중
                </span>
              )}
            </div>

            <div className="space-y-5">
              <Dropdown
                key={`large-${resetKey}`}
                options={mapOptions(largeOptions)}
                placeHolder="대분류"
                value={selectedLargeLabel}
                onSelect={(option) => handleLargeChange(option.id)}
              />
              <Dropdown
                key={`medium-${resetKey}`}
                options={mapOptions(mediumOptions)}
                placeHolder="중분류"
                value={selectedMediumLabel}
                disabled={selectedLarge == null}
                onSelect={(option) => handleMediumChange(option.id)}
              />
              <Dropdown
                key={`small-${resetKey}`}
                options={mapOptions(smallOptions)}
                placeHolder="소분류"
                value={selectedSmallLabel}
                disabled={selectedMedium == null}
                onSelect={(option) => handleSmallChange(option.id)}
              />
            </div>
          </div>
        </div>

        <div className="shadow-modal bg-surface-sub mt-auto flex w-full justify-between rounded-bl-xl px-5 py-5 text-xl [&>button]:w-full">
          <Button variant={'text'} size={'lg'} onClick={handleReset}>
            <RotateCw className="mr-1" /> 선택 초기화
          </Button>
          <Button
            size={'lg'}
            onClick={handleApply}
            disabled={!hasFilterChanged}
          >
            필터 적용하기
          </Button>
        </div>
      </div>
    </div>
  )
}
