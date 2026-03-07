import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const answerBadgeVariants = cva(
  'flex items-center justify-center rounded-full font-semibold text-white',
  {
    variants: {
      variant: {
        answered: 'bg-answer-active',
        unanswered: 'bg-surface-disabled',
        detail: 'bg-primary',
      },
      size: {
        sm: 'w-6 h-6 text-sm',
        md: 'w-12 h-12 text-[1.75rem]',
      },
    },
    defaultVariants: {
      variant: 'unanswered',
      size: 'md',
    },
  }
)

type AnswerBadgeProps = VariantProps<typeof answerBadgeVariants> & {
  className?: string
}

export default function AnswerBadge({
  variant,
  size,
  className,
}: AnswerBadgeProps) {
  return (
    <div className={cn(answerBadgeVariants({ variant, size }), className)}>
      A
    </div>
  )
}
