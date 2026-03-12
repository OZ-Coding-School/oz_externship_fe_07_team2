import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { NavButton } from '@/components'
import { cn } from '@/utils/cn'
import { getPageNumbers } from '@/utils/getPageNumbers'

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  if (totalPages <= 0) return null

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      <NavButton
        icon={ChevronsLeft}
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
        ariaLabel="첫 페이지"
      />

      <NavButton
        icon={ChevronLeft}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        ariaLabel="이전 페이지"
      />

      {pages.map((page) => {
        const isActive = page === currentPage

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
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

      <NavButton
        icon={ChevronRight}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        ariaLabel="다음 페이지"
      />

      <NavButton
        icon={ChevronsRight}
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPage}
        ariaLabel="마지막 페이지"
      />
    </nav>
  )
}
