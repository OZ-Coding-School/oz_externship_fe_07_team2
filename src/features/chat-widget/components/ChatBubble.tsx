import { Avatar } from '@/components'
import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

import ChatBadge from './ChatBadge'

type ChatBubbleProps = {
  message: ChatMessagePreview
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  if (message.role === 'assistant') {
    return (
      <div className="flex items-start gap-3 text-sm font-light">
        <ChatBadge size="sm" />
        <div className="bg-surface-chat text-text-chatbot max-w-55 rounded-2xl px-3.5 py-2.5">
          {message.message}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start justify-end gap-3 text-sm font-light">
      <div className="bg-primary-400 max-w-55 rounded-2xl px-3.5 py-2.5 text-white">
        {message.message}
      </div>
      <Avatar size="md" alt="user avatar" />
    </div>
  )
}
