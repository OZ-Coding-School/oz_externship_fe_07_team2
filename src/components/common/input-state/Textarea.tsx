import type { ReactNode, Ref, TextareaHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

type TextareaProps = {
  className?: string
  action?: ReactNode
  textareaRef?: Ref<HTMLTextAreaElement>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({
  className,
  action,
  textareaRef,
  ...props
}: TextareaProps) {
  const baseClasses =
    'text-sm py-2.5 px-4 rounded border border-border-line text-text-disabled resize-none min-h-32'

  const focusClasses = 'focus:border-primary focus:outline-none'
  const disabledClasses =
    'disabled:cursor-not-allowed disabled:bg-surface-disabled'

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        className={cn(baseClasses, focusClasses, disabledClasses, className)}
        {...props}
      />
      {action && <div className="absolute right-4 bottom-6">{action}</div>}
    </div>
  )
}
