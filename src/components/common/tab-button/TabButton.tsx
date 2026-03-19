import { cn } from '@/utils/cn'

type Tab = {
  value: string
  label: string
}

type TabProps = {
  tabs: Tab[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export default function TabButton({
  tabs,
  value,
  onValueChange,
  className,
}: TabProps) {
  return (
    <div className="border-border-line flex gap-2 border-b md:gap-9">
      {tabs.map((tab) => {
        const isSelected = value === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onValueChange(tab.value)}
            className={cn(
              'relative px-1 pb-4 text-[clamp(1rem,calc(0.442vw+0.896rem),1.8rem)] font-bold transition-colors',
              'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-opacity',
              isSelected
                ? 'text-primary after:bg-primary after:opacity-100'
                : 'text-text-disabled after:opacity-0',
              className
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
