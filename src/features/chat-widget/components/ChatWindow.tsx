import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

import ChatBody from './ChatBody'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

type ChatWindowProps = {
  onBack: () => void
  messages: ChatMessagePreview[]
  openType?: 'floating' | 'followUp'
  hasPreviousChat?: boolean
  onLoadPrevious?: () => void
  onStartNewChat?: () => void
}

export default function ChatWindow({
  onBack,
  messages,
  openType = 'floating',
  hasPreviousChat = false,
  onLoadPrevious,
  onStartNewChat,
}: ChatWindowProps) {
  return (
    <div className="bg-surface-default shadow-box flex h-152.5 w-90 flex-col overflow-hidden rounded-xl">
      <ChatHeader actionType="back" onAction={onBack} />
      <ChatBody
        mode={openType === 'followUp' ? 'entry' : 'messages'}
        messages={messages}
        hasPreviousChat={hasPreviousChat}
        onLoadPrevious={onLoadPrevious}
        onStartNewChat={onStartNewChat}
      />
      <ChatInput />
    </div>
  )
}
