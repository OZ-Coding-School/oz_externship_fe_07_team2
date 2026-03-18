import { useState } from 'react'

import { Dropdown } from '@/components'
import { useResponsiveDirection } from '@/hooks'
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
  direction,
  onSelect,
  className,
  initialValue,
}: CategoryDropdownProps) {
  const autoDirection = useResponsiveDirection()
  const [selected, setSelected] = useState<SelectedCategory>(
    initialValue ?? {
      large: null,
      medium: null,
      small: null,
    }
  )

  const resolvedDirection = direction ?? autoDirection

  const sourceMap: Record<keyof SelectedCategory, Category[] | undefined> = {
    large: categories,
    medium: selected.large?.children,
    small: selected.medium?.children,
  }

  const toOptions = (cats?: Category[]) =>
    cats?.map((c) => ({ id: c.id, value: c.name })) ?? []

  const largeOptions = toOptions(sourceMap.large)
  const mediumOptions = toOptions(sourceMap.medium)
  const smallOptions = toOptions(sourceMap.small)

  const handleSelect =
    (level: keyof SelectedCategory) =>
    (option: { id: number; value: string }) => {
      const found = sourceMap[level]?.find((c) => c.id === option.id)
      if (!found) return

      const newSelected: SelectedCategory =
        level === 'large'
          ? { large: found, medium: null, small: null }
          : level === 'medium'
            ? { ...selected, medium: found, small: null }
            : { ...selected, small: found }

      setSelected(newSelected)
      onSelect(newSelected)
    }

  const itemClassName = resolvedDirection === 'row' ? 'w-1/3' : 'w-full'
  const rowSizeStyle =
    'h-[clamp(2.5rem,calc(0.884vw+2.169rem),3rem)] text-[clamp(0.75rem,calc(0.221vw+0.698rem),0.875rem)]'

  const dropdownButtonClassName = cn(
    resolvedDirection === 'row' && rowSizeStyle
  )

  const dropdownListItemClassName = cn(
    resolvedDirection === 'row' ? rowSizeStyle : '!h-6 !py-0 !px-3'
  )

  return (
    <div
      className={cn(
        'flex gap-4',
        resolvedDirection === 'column' ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <Dropdown
        className={itemClassName}
        buttonClassName={dropdownButtonClassName}
        listItemClassName={dropdownListItemClassName}
        value={selected.large?.name ?? null}
        options={largeOptions}
        placeHolder="대분류"
        onSelect={handleSelect('large')}
      />
      <Dropdown
        className={itemClassName}
        buttonClassName={dropdownButtonClassName}
        listItemClassName={dropdownListItemClassName}
        value={selected.medium?.name ?? null}
        options={mediumOptions}
        placeHolder="중분류"
        disabled={!selected.large}
        onSelect={handleSelect('medium')}
      />
      <Dropdown
        className={itemClassName}
        buttonClassName={dropdownButtonClassName}
        listItemClassName={dropdownListItemClassName}
        value={selected.small?.name ?? null}
        options={smallOptions}
        placeHolder="소분류"
        disabled={!selected.medium}
        onSelect={handleSelect('small')}
      />
    </div>
  )
}
