import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils'

const PAGE_BUTTON_BASE =
  'flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium transition-colors'

const PAGE_BUTTON_STYLES = {
  disabled: 'text-text-disabled cursor-not-allowed',
  icon: 'text-text-sub hover:text-text-main',
}

type NavButtonProps = {
  icon: LucideIcon
  onClick: () => void
  disabled: boolean
  ariaLabel: string
}

export default function NavButton({
  icon: Icon,
  onClick,
  disabled,
  ariaLabel,
}: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        PAGE_BUTTON_BASE,
        disabled ? PAGE_BUTTON_STYLES.disabled : PAGE_BUTTON_STYLES.icon
      )}
    >
      <Icon size={16} />
    </button>
  )
}
