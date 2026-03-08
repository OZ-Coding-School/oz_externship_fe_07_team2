import { cn } from '@/utils/cn'

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md'
}

const baseClasses =
  'inline-flex items-center justify-center font-semibold transition-colors disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-surface-disabled disabled:text-text-disabled'
const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
  outline:
    'border border-primary text-primary bg-primary-100 disabled:text-text-sub disabled:border disabled:border-border-line',
}
const sizes = {
  sm: 'py-3 px-6 rounded-full',
  md: 'px-9 py-4 rounded',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
