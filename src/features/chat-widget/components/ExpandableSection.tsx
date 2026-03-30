import type { ReactNode } from 'react'

import { Button } from '@/components'

type ExpandableSectionProps = {
  children: ReactNode
  collapsedClassName: string
  isOverflowing: boolean
  isExpanded: boolean
  onToggle: () => void
}

export default function ExpandableSection({
  children,
  collapsedClassName,
  isOverflowing,
  isExpanded,
  onToggle,
}: ExpandableSectionProps) {
  return (
    <>
      <div
        className={`relative overflow-hidden transition-[max-height] duration-300 ease-out ${
          isOverflowing && !isExpanded ? collapsedClassName : 'max-h-none'
        }`}
      >
        {children}

        {isOverflowing && !isExpanded && (
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-linear-to-b from-transparent to-[#f6f5f5]" />
        )}
      </div>

      {isOverflowing && (
        <div className="mt-2 flex justify-center">
          <Button variant="text" type="button" onClick={onToggle}>
            {isExpanded ? '접기' : '더보기'}
          </Button>
        </div>
      )}
    </>
  )
}
