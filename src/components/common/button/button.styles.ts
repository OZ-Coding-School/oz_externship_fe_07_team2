import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  `inline-flex items-center justify-center font-semibold transition-colors disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-surface-disabled disabled:text-text-disabled`,
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
        outline:
          'border border-primary text-primary bg-primary-100 disabled:text-text-sub disabled:border disabled:border-border-line',
        text: 'bg-transparent text-text-main hover:bg-surface-sub',
        textAccent:
          'bg-transparent text-primary hover:bg-primary-100 hover:font-bold',
        textMuted:
          'bg-transparent text-text-sub hover:bg-gray-200 active:bg-primary-100 active:text-primary',
        ghost:
          'text-text-chatbot border-border-line flex gap-1 rounded-full border px-3 py-3 text-xs hover:bg-gray-100',
      },
      size: {
        sm: 'px-5 py-2.5',
        md: 'px-6 py-3',
        lg: 'px-9 py-4',
      },
      rounded: {
        md: 'rounded',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      rounded: 'md',
    },
  }
)
