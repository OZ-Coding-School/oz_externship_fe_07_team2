import { Plus } from 'lucide-react'

import { Button, Loading } from '@/components'
import useChatSessionsQuery from '@/queries/useChatSessionsQuery'

import ChatHeader from './ChatHeader'
import ChatSessionListItem from './ChatSessionListItem'

type ChatSessionListProps = {
  onClose: () => void
  onSelectSession: (sessionId: number) => void
  onNewChat: () => void
}

export default function ChatSessionList({
  onClose,
  onSelectSession,
  onNewChat,
}: ChatSessionListProps) {
  const { data: chatSessionsData, isPending, isError } = useChatSessionsQuery()

  const sessions = chatSessionsData?.results ?? []

  //첫로딩시
  const renderContent = () => {
    if (isPending) {
      return (
        <div className="flex h-full items-center justify-center px-6">
          <Loading />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="text-text-chatbot flex h-full items-center justify-center px-6 text-center text-sm font-light">
          채팅 목록을 불러오지 못했습니다.
        </div>
      )
    }

    if (sessions.length === 0) {
      return (
        <div className="text-text-chatbot flex h-full items-center justify-center px-6 text-center text-sm font-light">
          새로운 채팅을 하세요
        </div>
      )
    }

    return sessions.map((session) => (
      <ChatSessionListItem
        key={session.id}
        title={session.title}
        unreadCount={session.unreadCount}
        timeLabel={session.timeLabel}
        onClick={() => onSelectSession(session.id)}
      />
    ))
  }

  return (
    <div className="bg-surface-default shadow-box flex h-152.5 w-90 flex-col overflow-hidden rounded-xl">
      <ChatHeader actionType="close" onAction={onClose} />

      <div className="px-5 py-4 text-sm text-white">
        <Button
          variant={'primary'}
          type="button"
          onClick={onNewChat}
          className="bg-primary-400 w-full gap-2 rounded-lg font-light"
        >
          <Plus size={20} />새 채팅
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto border-t border-[#E7E7E7]">
        {renderContent()}
      </div>
    </div>
  )
}
