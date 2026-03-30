import type { ChatEntryData } from '@/features/chat-widget/context/ChatWidgetContext'

type ChatQuestionContextCardProps = {
  entryData: ChatEntryData
}

export default function ChatQuestionContextCard({
  entryData,
}: ChatQuestionContextCardProps) {
  return (
    <div className="shrink-0 border-b border-[#E5E5EA] bg-[#F8F5FB] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-text-main min-w-0 flex-1 truncate text-sm font-normal">
          {entryData.questionTitle}
        </p>
        <span className="text-primary-400 shrink-0 text-xs font-semibold">
          채팅 중...
        </span>
      </div>
    </div>
  )
}
