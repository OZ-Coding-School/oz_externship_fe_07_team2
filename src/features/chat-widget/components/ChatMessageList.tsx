import { memo } from 'react'

import { ArrowDown } from 'lucide-react'

import { Button, Loading } from '@/components'
import useChatAutoScroll from '@/features/chat-widget/hooks/useChatAutoScroll'
import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

import ChatBubble from './ChatBubble'

type ChatMessageListProps = {
  messages: ChatMessagePreview[]
  isStreaming?: boolean
  scrollToLatestKey?: number
  isPending?: boolean
  isError?: boolean
}

type ChatMessageRowProps = {
  message: ChatMessagePreview
}

const ChatMessageRow = memo(function ChatMessageRow({
  message,
}: ChatMessageRowProps) {
  return (
    <div>
      <ChatBubble message={message} />
    </div>
  )
})

export default function ChatMessageList({
  messages,
  isStreaming = false,
  scrollToLatestKey = 0,
  isPending = false,
  isError = false,
}: ChatMessageListProps) {
  const latestMessage = messages[messages.length - 1]
  const {
    containerRef,
    bottomRef,
    showScrollButton,
    handleScroll,
    scrollToBottom,
  } = useChatAutoScroll({
    latestMessageKey: latestMessage
      ? `${latestMessage.id}:${latestMessage.message.length}`
      : 'empty',
    isStreaming,
    scrollToLatestKey,
  })

  if (isPending) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-5">
        <Loading />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-text-chatbot flex min-h-0 flex-1 items-center justify-center px-6 text-center text-sm font-light">
        채팅 내역을 불러오지 못했습니다.
      </div>
    )
  }

  return (
    <div className="relative flex min-h-0 flex-1">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto px-4 py-5"
      >
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessageRow message={message} />
          </div>
        ))}
        <div ref={bottomRef} aria-hidden="true" />
      </div>

      {showScrollButton && (
        <Button
          type="button"
          variant="ghost"
          rounded="full"
          onClick={scrollToBottom}
          className="absolute bottom-4 left-1/2 h-11 w-11 -translate-x-1/2 border border-white/80 bg-white/72 p-0 text-[#7C4DFF] shadow-[0_10px_24px_rgba(124,77,255,0.18)] backdrop-blur-md hover:bg-white/85"
          aria-label="최신 메시지로 이동"
        >
          <ArrowDown size={18} />
        </Button>
      )}
    </div>
  )
}
