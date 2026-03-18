import { useState } from 'react'

import { X } from 'lucide-react'

import chatBotIcon from '@/assets/images/chat-bot.svg'
import { Button } from '@/components'
import ChatSessionList from '@/features/chat-widget/components/ChatSessionList'
import ChatWindow from '@/features/chat-widget/components/ChatWindow'
import {
  mockChatMessagesByRoomId,
  mockInitialChatMessages,
} from '@/mocks/data/chat-message-mock'

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeView, setActiveView] = useState<'sessions' | 'messages'>(
    'sessions'
  )
  const [openType, setOpenType] = useState<'floating' | 'followUp'>('floating')
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  )

  const handleToggle = () => {
    setIsOpen((prev) => {
      if (prev) {
        setActiveView('sessions')
        setOpenType('floating')
        setSelectedSessionId(null)
      }

      return !prev
    })
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {isOpen &&
        (activeView === 'sessions' ? (
          <ChatSessionList
            onClose={() => {
              setIsOpen(false)
              setActiveView('sessions')
              setOpenType('floating')
              setSelectedSessionId(null)
            }}
            onNewChat={() => {
              setSelectedSessionId(null)
              setActiveView('messages')
              setOpenType('floating')
            }}
            onSelectSession={(sessionId) => {
              setSelectedSessionId(sessionId)
              setActiveView('messages')
              setOpenType('floating')
            }}
          />
        ) : (
          <ChatWindow
            onBack={() => {
              setActiveView('sessions')
              setOpenType('floating')
            }}
            openType={openType}
            hasPreviousChat={false}
            onStartNewChat={() => {
              setSelectedSessionId(null)
              setActiveView('messages')
              setOpenType('floating')
            }}
            messages={
              selectedSessionId === null
                ? mockInitialChatMessages
                : mockChatMessagesByRoomId[selectedSessionId]
            }
          />
        ))}

      <div className="flex items-center gap-3">
        {/* TODO: 상세페이지의 "추가질문하기" 버튼이 연결되면 이 임시 버튼은 삭제 */}
        <Button
          type="button"
          variant="outline"
          className="rounded-full bg-white px-4"
          onClick={() => {
            setIsOpen(true)
            setActiveView('messages')
            setOpenType('followUp')
            setSelectedSessionId(null)
          }}
        >
          추가질문하기
        </Button>

        <Button
          variant="primary"
          rounded="full"
          type="button"
          className="shadow-modal h-19.5 w-19.5 p-5 transition hover:scale-[1.02]"
          onClick={handleToggle}
          aria-label="챗봇 열기"
        >
          {isOpen ? (
            <X size={36} />
          ) : (
            <img src={chatBotIcon} alt="AI OZ" className="h-9 w-9" />
          )}
        </Button>
      </div>
    </div>
  )
}
