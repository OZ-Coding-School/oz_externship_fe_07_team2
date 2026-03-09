import { useEffect, useRef, useState } from 'react'

type ModalOption = {
  label: string
  value: string
}

type ModalButtonProps = {
  value: string
  options: ModalOption[]
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export default function ModalButton({
  value,
  options,
  onChange,
  placeholder = '선택',
  disabled = false,
  className = '',
}: ModalButtonProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (nextValue: string) => {
    onChange(nextValue)
    setOpen(false)
  }

  const handleToggle = () => {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`w-20 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          disabled
            ? 'bg-surface-disabled text-text-disabled cursor-not-allowed'
            : 'bg-primary-100 text-primary hover:bg-primary-200 whitespace-nowrap'
        } `}
      >
        {selectedOption?.label ?? placeholder}
      </button>

      {open && !disabled && (
        <div className="bg-surface-default absolute top-full left-0 z-50 mt-2 w-28 rounded-md px-4 py-5 shadow-[var(--shadow-modal)]">
          <ul className="flex flex-col gap-1">
            {options.map((option) => {
              const isSelected = option.value === value

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full rounded-md px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? 'bg-primary-100 text-primary font-semibold'
                        : 'text-text-sub hover:bg-surface-sub hover:text-text-main'
                    } `}
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
