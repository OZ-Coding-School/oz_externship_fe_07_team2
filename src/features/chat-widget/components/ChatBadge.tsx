import chatBotIcon from '@/assets/images/chat-bot.svg'
import { Avatar } from '@/components'
import { cn } from '@/utils'

type ChatBadgeProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  iconClassName?: string
}

const iconSizeMap = {
  xs: '2xs', // 24 → 16
  sm: 'xs', // 32 → 20
  md: 'sm', // 40 → 24
  lg: 'lg', // 60 → 40
} as const

export default function ChatBadge({ size = 'md', className }: ChatBadgeProps) {
  return (
    <div
      className={cn(
        'bg-primary-200 shadow-box flex shrink-0 items-center justify-center rounded-full',
        size === 'xs' && 'h-6 w-6', // 24
        size === 'sm' && 'h-8 w-8', // 32
        size === 'md' && 'h-10 w-10', // 40
        size === 'lg' && 'h-15 w-15', // 60
        className
      )}
    >
      <Avatar src={chatBotIcon} size={iconSizeMap[size]} alt="AI OZ" />
    </div>
  )
}
