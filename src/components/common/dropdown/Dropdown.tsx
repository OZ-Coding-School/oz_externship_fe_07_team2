import { Button } from '@/components'
import { cn } from '@/utils/cn'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) {
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const setValue = (next: T) => {
    if (!isControlled) {
      setInternalValue(next)
    }
    onChange?.(next)
  }

  return [value, setValue] as const
}

type Option = {
  id: number
  value: string
}

type DropdownProps = {
  variant?: 'overlay' | 'inline'
  options: Option[]
  placeHolder?: string
  value?: string
  open?: boolean
  onSelect?: (option: Option) => void
  onOpenChange?: (value: boolean) => void
  disabled?: boolean
  className?: string
}
export default function Dropdown({
  variant = 'overlay',
  options,
  placeHolder = 'placeholder',
  value,
  open,
  onOpenChange,
  onSelect,
  disabled,
  className,
}: DropdownProps) {
  const [isOpen, setOpen] = useControllableState(open, false, onOpenChange)
  const [selectedValue, setSelectedValue] = useControllableState<string | null>(
    value,
    null
  )
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
    }
  }, [setOpen])

  const handleClick = () => {
    setOpen(!isOpen)
  }

  const handleSelect = (option: Option) => {
    setSelectedValue(option.value)
    onSelect?.(option)
    setOpen(false)
  }

  return (
    <div
      ref={dropdownRef}
      className={cn('w-full', variant === 'overlay' && 'relative', className)}
      data-testid="dropdown"
    >
      <Button
        disabled={disabled}
        variant="text"
        onClick={handleClick}
        className="border-gray-primary flex w-full justify-between gap-3 border p-4 font-normal"
      >
        <span>{selectedValue ?? placeHolder}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      {isOpen && (
        <ul
          className={cn(
            'border-gray-primary mt-1.5 max-h-[220px] overflow-y-auto rounded border bg-white p-1.5',
            variant === 'overlay'
              ? 'absolute top-full left-0 z-20 w-full shadow-md'
              : 'w-full'
          )}
        >
          {options.map((item) => {
            const isSelected = selectedValue === item.value

            return (
              <li
                onClick={handleSelect.bind(null, item)}
                className={cn(
                  'hover:bg-primary-100 flex cursor-pointer items-center justify-between p-3',
                  isSelected && 'text-primary'
                )}
                key={item.id}
              >
                <span>{item.value}</span>
                {isSelected && <Check size={16} className="text-primary" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
