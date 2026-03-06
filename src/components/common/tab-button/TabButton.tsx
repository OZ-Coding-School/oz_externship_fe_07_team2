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
    <div className="flex gap-9 border-b border-[#CECECE]">
      {tabs.map((tab) => {
        const isSelected = value === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onValueChange(tab.value)}
            className={cn(
              'relative px-1 pb-4 text-xl font-bold transition-colors',
              'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-opacity',
              isSelected
                ? 'text-[#721AE3] after:bg-[#6201F4] after:opacity-100'
                : 'text-[#BDBDBD] after:opacity-0',
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
