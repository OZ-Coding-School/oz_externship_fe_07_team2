import type { InputHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

type InputProps = {
  status?: 'error' | 'success'
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({ status, className, ...props }: InputProps) {
  const baseClasses =
    'h-15 rounded border border-transparent bg-primary-100 px-4 text-[18px] text-text-disabled'

  const focusClasses =
    'focus:border-primary focus:bg-transparent focus:text-text-main focus:outline-none'

  const withValueClasses = 'not-placeholder-shown:text-text-main bg-primary-100'

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
        withValueClasses,
        disabledClasses,
        status && statusClasses[status],
        className
      )}
      {...props}
    />
  )
}
