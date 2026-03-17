import { useState } from 'react'

import { Dropdown } from '@/components'
import type { Category } from '@/types/api-response/category'
import { cn } from '@/utils'

export type SelectedCategory = {
  large: Category | null
  medium: Category | null
  small: Category | null
}

type CategoryDropdownProps = {
  direction?: 'row' | 'column'
  categories: Category[]
  onSelect: (selected: SelectedCategory) => void
  className?: string
  initialValue?: SelectedCategory
}

export default function CategoryDropdown({
  categories,
  direction = 'row',
  onSelect,
  className,
  initialValue,
}: CategoryDropdownProps) {
  const [selected, setSelected] = useState<SelectedCategory>(
    initialValue ?? {
      large: null,
      medium: null,
      small: null,
    }
  )

  const toOptions = (cats?: Category[]) =>
    cats?.map((c) => ({ id: c.id, value: c.name })) ?? []

  const largeOptions = toOptions(categories)
  const mediumOptions = toOptions(selected.large?.children)
  const smallOptions = toOptions(selected.medium?.children)

  const handleSelect =
    (level: keyof SelectedCategory) =>
    (option: { id: number; value: string }) => {
      const source =
        level === 'large'
          ? categories
          : level === 'medium'
            ? selected.large?.children
            : selected.medium?.children

      const found = source?.find((c) => c.id === option.id)
      if (!found) return

      setSelected((prev) => {
        const newSelected =
          level === 'large'
            ? { large: found, medium: null, small: null }
            : level === 'medium'
              ? { ...prev, medium: found, small: null }
              : { ...prev, small: found }

        onSelect(newSelected)
        return newSelected
      })
    }

  const itemClassName = direction === 'row' ? 'w-1/3' : 'w-full'

  return (
    <div
      className={cn(
        'flex gap-4',
        direction === 'column' ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <Dropdown
        className={itemClassName}
        value={selected.large?.name ?? null}
        options={largeOptions}
        placeHolder="대분류"
        onSelect={handleSelect('large')}
      />
      <Dropdown
        className={itemClassName}
        value={selected.medium?.name ?? null}
        options={mediumOptions}
        placeHolder="중분류"
        disabled={!selected.large}
        onSelect={handleSelect('medium')}
      />
      <Dropdown
        className={itemClassName}
        value={selected.small?.name ?? null}
        options={smallOptions}
        placeHolder="소분류"
        disabled={!selected.medium}
        onSelect={handleSelect('small')}
      />
    </div>
  )
}
