import { Button } from '@/components'
import useOutsideClick from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type SetValueAction<T> = T | ((prev: T) => T)

function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) {
  const [internalValue, setInternalValue] = useState(defaultValue)

  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const setValue = useCallback(
    (next: SetValueAction<T>) => {
      const resolvedValue =
        typeof next === 'function' ? (next as (prev: T) => T)(value) : next

      if (!isControlled) {
        setInternalValue(resolvedValue)
      }
      onChangeRef.current?.(resolvedValue)
    },
    [isControlled, value]
  )

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

  useOutsideClick(dropdownRef, () => setOpen(false))

  const handleClick = () => {
    setOpen((prev) => !prev)
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
                onClick={() => handleSelect(item)}
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
