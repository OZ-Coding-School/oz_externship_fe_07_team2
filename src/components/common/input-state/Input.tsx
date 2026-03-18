import { type InputHTMLAttributes, useState } from 'react'

import { cn } from '@/utils/cn'

type InputProps = {
  status?: 'error' | 'success'
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export default function Input({
  status,
  className,
  onBlur,
  ...props
}: InputProps) {
  const [hasBeenFocused, setHasBeenFocused] = useState(false)

  const baseClasses =
    'h-[clamp(2.75rem,calc(1.768vw+2.336rem),3.75rem)] rounded border border-transparent bg-primary-100 px-4 text-[clamp(0.875rem,calc(0.442vw+0.771rem),1.125rem)] placeholder:text-text-chatbot'

  const focusClasses =
    'focus:border-primary focus:bg-transparent focus:text-text-main focus:outline-none'

  const withValueClasses = 'not-placeholder-shown:text-text-main bg-primary-100'

  const disabledClasses =
    'disabled:cursor-not-allowed disabled:bg-surface-disabled '

  const statusClasses = {
    error: 'border-red-500',
    success: 'border-green-500',
  }

  const placeholderClass = hasBeenFocused
    ? 'placeholder:text-text-disabled'
    : 'placeholder:text-text-chatbot'

  return (
    <input
      className={cn(
        baseClasses,
        focusClasses,
        withValueClasses,
        disabledClasses,
        placeholderClass,
        status && statusClasses[status],
        className
      )}
      onBlur={(e) => {
        setHasBeenFocused(true)
        onBlur?.(e)
      }}
      {...props}
    />
  )
}
