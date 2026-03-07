import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

const categoryPathVariants = cva('', {
  variants: {
    variant: {
      detail: 'text-xl font-bold text-primary',
      list: 'text-xs font-normal text-sub',
    },
  },
  defaultVariants: {
    variant: 'list',
  },
})

type CategoryPathProps = VariantProps<typeof categoryPathVariants> & {
  path: string[]
  className?: string
}

/**
 * 카테고리 경로를 표시하는 컴포넌트
 * - list: 목록용
 * - detail: 상세용
 *
 * @example
 * <CategoryPath path={['프론트엔드', '프로그래밍 언어', 'Python']} variant="list" />
 */
export default function CategoryPath({
  path,
  variant = 'list',
  className,
}: CategoryPathProps) {
  return (
    <nav
      aria-label="category-path"
      className={cn(
        'flex items-center',
        categoryPathVariants({ variant }),
        className
      )}
    >
      {path.map((item, index) => {
        const isLast = index === path.length - 1
        const shouldUnderline = isLast && variant === 'list'

        return (
          <span key={item} className="flex items-center">
            <span
              className={cn(
                shouldUnderline && 'underline decoration-1 underline-offset-2'
              )}
            >
              {item}
            </span>
            {!isLast && (
              <ChevronRight strokeWidth={2} className="mx-1 h-[1em] w-[1em]" />
            )}
          </span>
        )
      })}
    </nav>
  )
}
