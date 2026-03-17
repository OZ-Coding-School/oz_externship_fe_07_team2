import { Avatar, Button } from '@/components'
import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

import ChatBadge from './ChatBadge'
import ChatBubble from './ChatBubble'

type ChatBodyProps = {
  mode: 'messages' | 'entry'
  messages: ChatMessagePreview[]
  hasPreviousChat?: boolean
  onLoadPrevious?: () => void
  onStartNewChat?: () => void
}

export default function ChatBody({
  mode,
  messages,
  hasPreviousChat = false,
  onLoadPrevious,
  onStartNewChat,
}: ChatBodyProps) {
  if (mode === 'entry') {
    return (
      <div className="flex flex-1 flex-col px-4 py-5">
        <div className="flex items-start gap-3 text-sm font-light">
          <ChatBadge size="sm" />
          <div className="bg-surface-chat text-text-chatbot max-w-55 rounded-2xl px-3.5 py-2.5">
            안녕하세요. 무엇을 도와드릴까요?
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Avatar size="lg" alt="user avatar" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="ghost"
            rounded={'full'}
            onClick={onLoadPrevious}
            disabled={!hasPreviousChat}
            className="border-border-line bg-surface-chat text-text-chatbot px-3.5 py-2 text-sm font-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            이전 대화 불러오기
          </Button>
          <Button
            type="button"
            variant="ghost"
            rounded={'full'}
            onClick={onStartNewChat}
            className="text-primary-400 border-border-line bg-surface-chat px-3.5 py-2 text-sm font-light"
          >
            새 채팅하기
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto px-4 py-5">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
    </div>
  )
}
