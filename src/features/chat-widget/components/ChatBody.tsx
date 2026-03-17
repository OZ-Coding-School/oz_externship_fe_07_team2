import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

import ChatBubble from './ChatBubble'
import ChatEntryActions from './ChatEntryActions'

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
      <ChatEntryActions
        hasPreviousChat={hasPreviousChat}
        onLoadPrevious={onLoadPrevious}
        onStartNewChat={onStartNewChat}
      />
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
