import chatBotIcon from '@/assets/images/chat-bot.svg'
import { Avatar } from '@/components'
import { cn } from '@/utils'

type ChatBadgeProps = {
  size?: 'xs' | 'sm' | 'md'
  className?: string
  iconClassName?: string
}

export default function ChatBadge({
  size = 'md',
  className = '',
  iconClassName = '',
}: ChatBadgeProps) {
  return (
    <div
      className={cn(
        'bg-primary-200 shadow-box flex shrink-0 items-center justify-center rounded-full',
        size === 'xs' && 'h-6 w-6',
        size === 'sm' && 'h-8 w-8',
        size === 'md' && 'h-10 w-10',
        className
      )}
    >
      <Avatar
        src={chatBotIcon}
        size="sm"
        className={cn(
          size === 'xs' && 'h-4 w-4',
          size === 'sm' && 'h-5 w-5',
          size === 'md' && 'h-6 w-6',
          iconClassName
        )}
        alt="AI OZ"
      />
    </div>
  )
}
