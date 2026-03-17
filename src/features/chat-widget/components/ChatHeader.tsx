import { ArrowLeft, X } from 'lucide-react'

import { Button } from '@/components'

import ChatBadge from './ChatBadge'

type ChatHeaderProps = {
  actionType: 'close' | 'back'
  onAction: () => void
}

export default function ChatHeader({ actionType, onAction }: ChatHeaderProps) {
  const actionButtonClassName =
    actionType === 'back' ? 'absolute left-5' : 'absolute right-5'

  return (
    <div className="bg-primary-400 relative flex h-18 w-full items-center justify-center px-5 text-white">
      <Button
        variant="text"
        onClick={onAction}
        className={`${actionButtonClassName} p-0 text-white hover:bg-transparent`}
        aria-label={
          actionType === 'back' ? '채팅방 목록으로 이동' : '챗봇 닫기'
        }
      >
        {actionType === 'back' ? <ArrowLeft size={20} /> : <X size={20} />}
      </Button>

      <div className="flex items-center justify-center gap-3">
        <ChatBadge size="md" />
        <p className="text-[22px]">AI OZ</p>
      </div>
    </div>
  )
}
