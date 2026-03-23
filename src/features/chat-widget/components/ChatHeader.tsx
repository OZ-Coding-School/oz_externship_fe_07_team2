import { X } from 'lucide-react'

import { Button } from '@/components'

import ChatBadge from './ChatBadge'

type ChatHeaderProps = {
  onClose: () => void
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-primary-400 relative flex h-18 w-full items-center justify-center px-5 text-white">
      <Button
        variant="text"
        onClick={onClose}
        className="absolute right-5 p-0 text-white hover:bg-transparent"
        aria-label="챗봇 닫기"
      >
        <X size={20} />
      </Button>

      <div className="flex items-center justify-center gap-3">
        <ChatBadge size="md" />
        <p className="text-[22px]">AI OZ</p>
      </div>
    </div>
  )
}
