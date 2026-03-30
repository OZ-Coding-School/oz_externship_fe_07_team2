import { Avatar } from '@/components'
import AiMarkdownRenderer from '@/components/common/markdown/AiMarkdownRenderer'
import type { ChatMessagePreview } from '@/features/chat-widget'

import ChatBadge from './ChatBadge'

type ChatBubbleProps = {
  message: ChatMessagePreview
  isStreaming?: boolean
}

export default function ChatBubble({
  message,
  isStreaming = false,
}: ChatBubbleProps) {
  if (message.role === 'assistant') {
    return (
      <div className="flex w-full items-start gap-3 text-sm font-light">
        <ChatBadge size="sm" />
        <div className="bg-surface-chat text-text-chatbot max-w-[85%] min-w-0 rounded-2xl px-3 py-2.5 break-all">
          <AiMarkdownRenderer
            content={message.message}
            className="ai-markdown-body-chat text-sm"
            isStreaming={isStreaming}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full min-w-0 items-start justify-end gap-3 text-sm font-light">
      <div className="bg-primary-400 max-w-[70%] min-w-0 rounded-2xl px-4 py-2.5 break-all text-white">
        {message.message}
      </div>
      <Avatar size="md" alt="user avatar" />
    </div>
  )
}
