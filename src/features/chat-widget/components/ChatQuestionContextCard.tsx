import type { ChatEntryData } from '@/features/chat-widget/context/ChatWidgetContext'

import ChatBadge from './ChatBadge'

type ChatQuestionContextCardProps = {
  entryData: ChatEntryData
}
//Todo : 추가질문 클릭시 채팅방 ui 수정 예정 임시용

export default function ChatQuestionContextCard({
  entryData,
}: ChatQuestionContextCardProps) {
  return (
    <div className="shrink-0 border-b border-[#E7E7E7] bg-[#FCF8FF] px-4 py-4">
      <div className="flex items-start gap-3">
        <ChatBadge size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-primary-400 mb-1 text-xs font-semibold">
            이 질문을 기준으로 채팅 중
          </p>
          <p className="text-text-main truncate text-sm font-medium">
            {entryData.questionTitle}
          </p>
        </div>
      </div>
    </div>
  )
}
