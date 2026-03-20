import type { ChatEntryData } from '@/features/chat-widget/context/ChatWidgetContext'
import useChatConversation from '@/features/chat-widget/hooks/useChatConversation'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessageList from './ChatMessageList'
import ChatQuestionContextCard from './ChatQuestionContextCard'

type ChatWindowProps = {
  onClose: () => void
  sessionId: number | null
  ensureSession: (message: string) => Promise<{
    id: number
    created: boolean
  }>
  isSessionCreating?: boolean
  entryData?: ChatEntryData | null
}

export default function ChatWindow({
  onClose,
  sessionId,
  ensureSession,
  isSessionCreating = false,
  entryData = null,
}: ChatWindowProps) {
  const {
    localMessages,
    scrollToLatestKey,
    sendErrorMessage,
    isMessagePending,
    isMessageError,
    isSubmitting,
    isStreaming,
    handleSend,
  } = useChatConversation({
    sessionId,
    ensureSession,
    isSessionCreating,
  })

  return (
    <div className="bg-surface-default shadow-box flex h-152.5 min-h-0 w-90 flex-col overflow-hidden rounded-xl">
      <ChatHeader onClose={onClose} />
      {entryData ? <ChatQuestionContextCard entryData={entryData} /> : null}
      <ChatMessageList
        messages={localMessages}
        isStreaming={isStreaming}
        scrollToLatestKey={scrollToLatestKey}
        isPending={isMessagePending}
        isError={isMessageError}
      />
      {sendErrorMessage && (
        <p className="shrink-0 px-4 py-2 text-sm text-[#FF3B30]">
          {sendErrorMessage}
        </p>
      )}
      <ChatInput
        onSend={handleSend}
        isPending={isSubmitting}
        isStreaming={isStreaming}
      />
    </div>
  )
}
