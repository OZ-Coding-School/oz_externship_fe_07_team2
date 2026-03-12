import { ArrowDownUp } from 'lucide-react'
import {
  useRef,
  useState,
  type ComponentPropsWithRef,
  type MouseEventHandler,
} from 'react'

import useOutsideClick from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'

type ModalOption = {
  label: string
  value: string
}

type ModalButtonProps = Omit<
  ComponentPropsWithRef<'button'>,
  'value' | 'onChange' | 'children'
> & {
  value: string
  options: ModalOption[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  dropdownClassName?: string
}

export default function ModalButton({
  value,
  options,
  onChange,
  placeholder = '선택',
  disabled = false,
  className,
  dropdownClassName,
  type = 'button',
  onClick,
  ...buttonProps
}: ModalButtonProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useOutsideClick(wrapperRef, () => setOpen(false))

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (nextValue: string) => {
    onChange(nextValue)
    setOpen(false)
  }

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)

    if (e.defaultPrevented || disabled) return

    setOpen((prev) => !prev)
  }

  return (
    <div ref={wrapperRef} className={cn('relative inline-block', className)}>
      <button
        {...buttonProps}
        type={type}
        disabled={disabled}
        onClick={handleButtonClick}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex w-24 items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
          disabled
            ? 'bg-surface-disabled text-text-disabled cursor-not-allowed'
            : 'bg-surface-default text-text-sub border-border-line hover:bg-surface-sub',
          className
        )}
      >
        {selectedOption?.label ?? placeholder}
        <ArrowDownUp size={20} className="shrink-0" />
      </button>

      {open && !disabled && (
        <div
          className={cn(
            'bg-surface-default shadow-modal absolute top-full left-0 z-50 mt-2 w-28 rounded-md px-4 py-5',
            dropdownClassName
          )}
        >
          <ul role="listbox" className="flex flex-col gap-1">
            {options.map((option) => {
              const isSelected = option.value === value

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'w-full rounded-md px-3 py-2 text-sm transition-colors',
                      isSelected
                        ? 'bg-primary-100 text-primary font-semibold'
                        : 'text-text-sub hover:bg-surface-sub hover:text-text-main'
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
