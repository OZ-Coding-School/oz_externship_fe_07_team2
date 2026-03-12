import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

import { buttonVariants } from './button.styles'

type ButtonProps = {} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export default function Button({
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
