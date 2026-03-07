import { cn } from '@/utils/cn'

const DELAYS = [
  '[animation-delay:0ms]',
  '[animation-delay:150ms]',
  '[animation-delay:300ms]',
]

export default function Loading() {
  return (
    <div className="flex gap-2">
      {DELAYS.map((delay, index) => (
        <div
          key={`${delay}-${index}`}
          className={cn('animate-jump bg-primary h-2 w-2 rounded-lg', delay)}
        />
      ))}
    </div>
  )
}
