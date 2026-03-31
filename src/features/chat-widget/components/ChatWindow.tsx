import type { ChatEntryData } from '@/features/chat-widget/context/ChatWidgetContext'
import useChatConversation from '@/features/chat-widget/hooks/useChatConversation'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessageList from './ChatMessageList'

const ENTRY_GUIDE_MESSAGE = '추가로 궁금한 내용을 질문해 보세요.'

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
    isBlockedByRateLimit,
    isMessagePending,
    isMessageError,
    isSubmitting,
    isStreaming,
    handleSend,
  } = useChatConversation({
    sessionId,
    hasEntryContext: entryData !== null,
    ensureSession,
    isSessionCreating,
  })

  return (
    <div className="bg-surface-default shadow-box flex h-152.5 min-h-0 w-90 flex-col overflow-hidden rounded-xl">
      <ChatHeader onClose={onClose} />
      <ChatMessageList
        messages={localMessages}
        guideMessage={entryData ? ENTRY_GUIDE_MESSAGE : undefined}
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
        isDisabled={isBlockedByRateLimit}
        disabledPlaceholder=""
      />
    </div>
  )
}
