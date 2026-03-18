import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-surface-disabled disabled:text-text-disabled',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
        outline:
          'border border-primary bg-primary-100 text-primary disabled:border-border-line disabled:text-text-sub',
        text: 'bg-transparent text-text-main hover:bg-surface-sub',
        textAccent: 'bg-transparent text-primary hover:bg-primary-100',
        textMuted:
          'bg-transparent text-text-sub hover:bg-gray-200 active:bg-primary-100 active:text-primary',
        ghost:
          'border border-border-line bg-transparent text-text-chatbot hover:bg-gray-100',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2.5 text-sm md:text-base',
        lg: 'px-6 py-3 text-base md:px-9 md:py-4 md:text-lg',
      },
      rounded: {
        md: 'rounded',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        size: 'sm',
        className: 'gap-1 px-3 py-2 text-xs',
      },
      {
        variant: 'ghost',
        size: 'md',
        className: 'gap-1 px-3 py-3 text-xs md:text-sm',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      rounded: 'md',
    },
  }
)
