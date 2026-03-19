import type { ChatMessagePreview } from '@/features/chat-widget'
import { mockInitialChatMessages } from '@/mocks/data/chat-message-mock'
import useChatMessagesQuery from '@/queries/useChatMessagesQuery'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessageList from './ChatMessageList'

type ChatWindowProps = {
  onBack: () => void
  sessionId: number | null
  openType?: 'floating' | 'followUpEntry'
  hasPreviousChat?: boolean
  onLoadPrevious?: () => void
  onStartNewChat?: () => void
}

export default function ChatWindow({
  onBack,
  sessionId,
  openType = 'floating',
  hasPreviousChat = false,
  onLoadPrevious,
  onStartNewChat,
}: ChatWindowProps) {
  const {
    data: chatMessagesData,
    isPending,
    isError,
  } = useChatMessagesQuery({
    sessionId,
  })

  const messages: ChatMessagePreview[] =
    sessionId === null
      ? mockInitialChatMessages
      : (chatMessagesData?.results ?? [])
  const isMessagePending = sessionId !== null && isPending
  const isMessageError = sessionId !== null && isError

  return (
    <div className="bg-surface-default shadow-box flex h-152.5 w-90 flex-col overflow-hidden rounded-xl">
      <ChatHeader actionType="back" onAction={onBack} />
      <ChatMessageList
        mode={openType === 'followUpEntry' ? 'entry' : 'messages'}
        messages={messages}
        isPending={isMessagePending}
        isError={isMessageError}
        hasPreviousChat={hasPreviousChat}
        onLoadPrevious={onLoadPrevious}
        onStartNewChat={onStartNewChat}
      />
      <ChatInput />
    </div>
  )
}
