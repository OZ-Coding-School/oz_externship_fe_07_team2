import { useEffect, useState } from 'react'

import ChatSessionList from '@/features/chat-widget/components/ChatSessionList'
import ChatWindow from '@/features/chat-widget/components/ChatWindow'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'
import useChatSessionsQuery from '@/queries/useChatSessionsQuery'

export default function ChatView() {
  const { chat } = useChatWidgetContext()
  const { data: chatSessionsData } = useChatSessionsQuery()

  // 현재 채팅 UI에서 어떤 화면을 보여줄지 관리
  const [activeView, setActiveView] = useState<'sessions' | 'messages'>(
    chat.isEntryMode ? 'messages' : 'sessions'
  )
  // 추가질문하기로 진입한 첫 화면인지 여부를 관리
  const [isEntryMode, setIsEntryMode] = useState(chat.isEntryMode)

  // 선택한 채팅 세션 id를 저장하며, null이면 새 채팅 상태
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  )
  const latestSessionId = chatSessionsData?.results[0]?.id ?? null
  const hasPreviousChat = latestSessionId !== null

  useEffect(() => {
    if (!chat.isOpen) {
      setActiveView('sessions')
      setSelectedSessionId(null)
      setIsEntryMode(false)
      return
    }

    setActiveView(chat.isEntryMode ? 'messages' : 'sessions')
    setIsEntryMode(chat.isEntryMode)

    if (chat.isEntryMode) {
      setSelectedSessionId(null)
    }
  }, [chat.isEntryMode, chat.isOpen])

  if (!chat.isOpen) return null

  return (
    <div className="fixed right-6 bottom-29 z-50">
      {activeView === 'sessions' ? (
        <ChatSessionList
          onClose={chat.close}
          onNewChat={() => {
            setSelectedSessionId(null)
            setIsEntryMode(false)
            setActiveView('messages')
          }}
          onSelectSession={(sessionId) => {
            setSelectedSessionId(sessionId)
            setIsEntryMode(false)
            setActiveView('messages')
          }}
        />
      ) : (
        <ChatWindow
          onBack={() => {
            setIsEntryMode(false)
            setActiveView('sessions')
          }}
          sessionId={selectedSessionId}
          openType={isEntryMode ? 'followUpEntry' : 'floating'}
          hasPreviousChat={hasPreviousChat}
          onLoadPrevious={() => {
            if (latestSessionId === null) return

            setSelectedSessionId(latestSessionId)
            setIsEntryMode(false)
            setActiveView('messages')
          }}
          onStartNewChat={() => {
            setSelectedSessionId(null)
            setIsEntryMode(false)
            setActiveView('messages')
          }}
        />
      )}
    </div>
  )
}
