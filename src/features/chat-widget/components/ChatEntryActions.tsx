import { Avatar, Button } from '@/components'

import ChatBadge from './ChatBadge'

type ChatEntryActionsProps = {
  hasPreviousChat?: boolean
  onLoadPrevious?: () => void
  onStartNewChat?: () => void
}

export default function ChatEntryActions({
  hasPreviousChat = false,
  onLoadPrevious,
  onStartNewChat,
}: ChatEntryActionsProps) {
  return (
    <div className="flex flex-1 flex-col px-4 py-5">
      <div className="flex items-start gap-3 text-sm font-light">
        <ChatBadge size="sm" />
        <div className="max-w-55 rounded-2xl bg-[#F5F5F5] px-3.5 py-2.5 text-[#707070]">
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
          className="border-border-line bg-[#F5F5F5] px-3.5 py-2 text-sm font-light text-[#666666] disabled:cursor-not-allowed disabled:opacity-50"
        >
          이전 대화 불러오기
        </Button>
        <Button
          type="button"
          variant="ghost"
          rounded={'full'}
          onClick={onStartNewChat}
          className="text-primary-400 border-border-line bg-[#F5F5F5] px-3.5 py-2 text-sm font-light"
        >
          새 채팅하기
        </Button>
      </div>
    </div>
  )
}
