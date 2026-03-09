import { Search, X } from 'lucide-react'

import { cn } from '@/utils/cn'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({
  value,
  onChange,
  placeholder = '질문 검색',
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        'border-border-line bg-surface-default flex h-12 w-[472px] items-center gap-[10px] rounded-[1000px] border px-3 py-[10px] transition-colors',
        'focus-within:border-primary',
        className
      )}
    >
      <Search className="text-text-light h-4 w-4 shrink-0" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-text-main placeholder:text-text-light flex-1 bg-transparent text-sm outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
          className="text-text-light hover:text-text-sub flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
