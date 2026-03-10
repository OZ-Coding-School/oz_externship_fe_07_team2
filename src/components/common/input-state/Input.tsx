import { cn } from '@/utils/cn'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'error' | 'success'
  className?: string
}

export default function Input({ status, className, ...props }: InputProps) {
  const baseClasses =
    'text-sm py-2.5 px-4 rounded border border-border-line text-text-disabled'

  const focusClasses = 'focus:border-primary focus:outline-none'
  const disabledClasses =
    'disabled:cursor-not-allowed disabled:bg-surface-disabled'

  const statusClasses = {
    error: 'border-red-500',
    success: 'border-green-500',
  }

  return (
    <input
      className={cn(
        baseClasses,
        focusClasses,
        disabledClasses,
        status && statusClasses[status],
        className
      )}
      {...props}
    />
  )
}
