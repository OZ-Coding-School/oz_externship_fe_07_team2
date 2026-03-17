import { Plus } from 'lucide-react'

import { Button } from '@/components'
import { mockChatRooms } from '@/mocks/data/chat-room-mock'

import ChatHeader from './ChatHeader'
import ChatRoomListItem from './ChatRoomListItem'

type ChatRoomListProps = {
  onClose: () => void
  onSelectRoom: (roomId: number) => void
  onNewChat: () => void
}

export default function ChatRoomList({
  onClose,
  onSelectRoom,
  onNewChat,
}: ChatRoomListProps) {
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

      {/* chatRoom 목록 */}
      <div className="flex-1 overflow-y-auto border-t border-[#E7E7E7]">
        {mockChatRooms.length > 0 ? (
          mockChatRooms.map((room) => (
            <ChatRoomListItem
              key={room.id}
              title={room.title}
              unreadCount={room.unreadCount}
              timeLabel={room.timeLabel}
              onClick={() => onSelectRoom(room.id)}
            />
          ))
        ) : (
          <div className="text-text-chatbot flex h-full items-center justify-center px-6 text-center text-sm font-light">
            새로운 채팅을 하세요
          </div>
        )}
      </div>
    </div>
  )
}
