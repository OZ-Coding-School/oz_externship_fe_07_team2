import { useRef } from 'react'
import { Search, X } from 'lucide-react'

import { cn } from '@/utils/cn'

type SearchBarProps = {
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
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={cn(
        'border-border-line bg-surface-default flex h-12 w-[472px] items-center gap-[10px] rounded-[1000px] border px-3 py-[10px] transition-colors',
        'focus-within:border-primary',
        className
      )}
    >
      <Search size={16} className="text-text-light shrink-0" />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-text-main placeholder:text-text-light flex-1 bg-transparent text-sm outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          aria-label="검색어 지우기"
          className="text-text-light hover:text-text-sub flex shrink-0 items-center justify-center rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
