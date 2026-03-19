import chatBotIcon from '@/assets/images/chat-bot.svg'
import { Avatar } from '@/components'
import { cn } from '@/utils'

type ChatBadgeProps = {
  size?: 'sm' | 'md'
}

export default function ChatBadge({ size = 'md' }: ChatBadgeProps) {
  return (
    <div className="bg-primary-200 shadow-box flex shrink-0 items-center justify-center rounded-full p-2">
      <Avatar
        src={chatBotIcon}
        size="sm"
        className={cn(size === 'sm' && 'h-5 w-5', size === 'md' && 'h-6 w-6')}
        alt="AI OZ"
      />
    </div>
  )
}
