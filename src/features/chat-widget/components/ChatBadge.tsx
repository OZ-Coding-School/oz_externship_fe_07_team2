import chatBotIcon from '@/assets/images/chat-bot.svg'
import { cn } from '@/utils'

type ChatBadgeProps = {
  size?: 'sm' | 'md'
  className?: string
}

export default function ChatBadge({ size = 'md', className }: ChatBadgeProps) {
  return (
    <div
      className={cn(
        'bg-primary-200 shadow-box flex shrink-0 items-center justify-center rounded-full p-2'
      )}
    >
      <img
        src={chatBotIcon}
        className={cn(
          size === 'sm' && 'h-5 w-5',
          size === 'md' && 'h-6 w-6',
          className
        )}
        alt="AI OZ"
      />
    </div>
  )
}
