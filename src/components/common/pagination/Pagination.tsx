import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react'

import { cn } from '@/utils/cn'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const PAGE_BUTTON_BASE =
  'flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium transition-colors'

const PAGE_BUTTON_STYLES = {
  default: 'text-text-sub hover:bg-primary-100 hover:text-primary',
  active: 'bg-primary text-white',
  disabled: 'text-text-disabled cursor-not-allowed',
  icon: 'text-text-sub hover:text-text-main',
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisible = 10

  //   페이지 수가 적을때
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const start = Math.max(1, currentPage - 4)
  const end = Math.min(totalPages, start + maxVisible - 1)

  const adjustedStart = Math.max(1, end - maxVisible + 1)

  return Array.from(
    { length: end - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  )
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handleMoveFirst = () => {
    if (isFirstPage) return
    onPageChange(1)
  }

  const handleMovePrev = () => {
    if (isFirstPage) return
    onPageChange(currentPage - 1)
  }

  const handleMoveNext = () => {
    if (isLastPage) return
    onPageChange(currentPage + 1)
  }

  const handleMoveLast = () => {
    if (isLastPage) return
    onPageChange(totalPages)
  }

  if (totalPages <= 0) return null

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      <button
        type="button"
        onClick={handleMoveFirst}
        disabled={isFirstPage}
        aria-label="첫 페이지"
        className={cn(
          PAGE_BUTTON_BASE,
          isFirstPage ? PAGE_BUTTON_STYLES.disabled : PAGE_BUTTON_STYLES.icon
        )}
      >
        <ChevronsLeft size={16} />
      </button>

      <button
        type="button"
        onClick={handleMovePrev}
        disabled={isFirstPage}
        aria-label="이전 페이지"
        className={cn(
          PAGE_BUTTON_BASE,
          isFirstPage ? PAGE_BUTTON_STYLES.disabled : PAGE_BUTTON_STYLES.icon
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              PAGE_BUTTON_BASE,
              isActive ? PAGE_BUTTON_STYLES.active : PAGE_BUTTON_STYLES.default
            )}
          >
            {page}
          </button>
        )
      })}

      <button
        type="button"
        onClick={handleMoveNext}
        disabled={isLastPage}
        aria-label="다음 페이지"
        className={cn(
          PAGE_BUTTON_BASE,
          isLastPage ? PAGE_BUTTON_STYLES.disabled : PAGE_BUTTON_STYLES.icon
        )}
      >
        <ChevronRight size={16} />
      </button>

      <button
        type="button"
        onClick={handleMoveLast}
        disabled={isLastPage}
        aria-label="마지막 페이지"
        className={cn(
          PAGE_BUTTON_BASE,
          isLastPage ? PAGE_BUTTON_STYLES.disabled : PAGE_BUTTON_STYLES.icon
        )}
      >
        <ChevronsRight size={16} />
      </button>
    </nav>
  )
}
