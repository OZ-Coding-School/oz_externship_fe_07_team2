import { cn } from '@/utils/cn'
import type { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button.styles'

interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  className = '',
  children,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}
