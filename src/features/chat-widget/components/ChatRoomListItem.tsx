import { Button } from '@/components'

import ChatBadge from './ChatBadge'

type ChatRoomListItemProps = {
  title: string
  unreadCount?: number
  timeLabel: string
  onClick?: () => void
}

export default function ChatRoomListItem({
  title,
  unreadCount = 0,
  timeLabel,
  onClick,
}: ChatRoomListItemProps) {
  return (
    <Button
      variant={'text'}
      type="button"
      size={'lg'}
      onClick={onClick}
      className="hover:bg-primary-100 w-full gap-1.5 border-b border-[#E7E7E7] px-4 text-left font-normal transition"
    >
      <ChatBadge size="sm" />

      <div className="flex-1">
        <p className="max-w-55 truncate text-sm">{title}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3.5">
        {unreadCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF3B30] text-xs text-white">
            {unreadCount}
          </span>
        )}
        <span className="text-text-light text-xs">{timeLabel}</span>
      </div>
    </Button>
  )
}
