import { Avatar } from '@/components'
import AiMarkdownRenderer from '@/components/common/markdown/AiMarkdownRenderer'
import type { ChatMessagePreview } from '@/features/chat-widget'
import useExpandableContent from '@/features/chat-widget/hooks/useExpandableContent'

import ChatBadge from './ChatBadge'
import ExpandableSection from './ExpandableSection'

type ChatBubbleProps = {
  message: ChatMessagePreview
  isStreaming?: boolean
}

const COLLAPSED_CHAT_ENTRY_HEIGHT = 296

export default function ChatBubble({
  message,
  isStreaming = false,
}: ChatBubbleProps) {
  const { contentRef, isExpanded, setIsExpanded, isOverflowing } =
    useExpandableContent({
      content: message.message,
      collapsedHeightPx: COLLAPSED_CHAT_ENTRY_HEIGHT,
      enabled: message.isInitialEntry && message.role === 'assistant',
    })

  if (message.role === 'assistant') {
    return (
      <div className="flex min-w-0 items-start gap-3 text-sm font-light">
        <ChatBadge size="sm" />
        <div className="bg-surface-chat text-text-chatbot min-w-0 flex-1 rounded-2xl px-3 py-2.5 break-all">
          {/* 채팅 버블도 AI 답변을 렌더링
              단, 상세페이지에서 "추가 질문하기"로 가져온 첫 답변(isInitialEntry)만
              접힌 높이 + 더보기/접기 UI를 적용 */}
          {message.isInitialEntry ? (
            <ExpandableSection
              collapsedClassName="max-h-74"
              isOverflowing={isOverflowing}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded((prev) => !prev)}
            >
              {/* 초기 진입 답변은 길 수 있어서 먼저 접힌 높이로 렌더링 */}
              <div ref={contentRef} className="relative">
                <AiMarkdownRenderer
                  content={message.message}
                  className="ai-markdown-body-chat text-sm"
                  isStreaming={isStreaming}
                />
              </div>
            </ExpandableSection>
          ) : (
            /* 일반 채팅 응답은 접기 없이 그대로 렌더링 */
            <AiMarkdownRenderer
              content={message.message}
              className="ai-markdown-body-chat text-sm"
              isStreaming={isStreaming}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 items-start justify-end gap-3 text-sm font-light">
      <div className="bg-primary-400 max-w-55 min-w-0 rounded-2xl px-4 py-2.5 break-all text-white">
        {message.message}
      </div>
      <Avatar size="md" alt="user avatar" />
    </div>
  )
}
