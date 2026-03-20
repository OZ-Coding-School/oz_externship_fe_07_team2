import { useCallback, useEffect, useRef, useState } from 'react'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from '@/components'
import useOutsideClick from '@/hooks/useOutsideClick'
import { cn } from '@/utils/cn'

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
  options: Option[]
  placeHolder?: string
  value?: string | null
  open?: boolean
  onSelect?: (option: Option) => void
  onOpenChange?: (value: boolean) => void
  disabled?: boolean
  className?: string
  buttonClassName?: string
  listItemClassName?: string
}

export default function Dropdown({
  options,
  placeHolder = 'placeholder',
  value,
  open,
  onOpenChange,
  onSelect,
  disabled,
  className,
  buttonClassName,
  listItemClassName,
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
      className={cn('relative w-full', className)}
      data-testid="dropdown"
    >
      <Button
        disabled={disabled}
        variant="ghost"
        onClick={handleClick}
        className={cn(
          'border-gray-primary text-main flex w-full justify-between gap-3 border p-2 text-sm font-normal md:p-4',
          buttonClassName
        )}
      >
        <span>{selectedValue ?? placeHolder}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      {isOpen && (
        <ul
          className={cn(
            'border-gray-primary absolute top-full left-0 z-20 mt-1.5',
            'max-h-55 w-full overflow-y-auto rounded border bg-white p-1.5 text-sm shadow-md'
          )}
        >
          {options.map((item) => {
            const isSelected = selectedValue === item.value

            return (
              <li
                onClick={() => handleSelect(item)}
                className={cn(
                  'hover:bg-primary-100 flex cursor-pointer items-center justify-between p-3',
                  isSelected && 'text-primary font-semibold',
                  listItemClassName
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
