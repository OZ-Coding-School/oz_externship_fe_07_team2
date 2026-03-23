import { type ReactNode, useState } from 'react'

import {
  type ChatEntryData,
  ChatWidgetContext,
} from '@/features/chat-widget/context/ChatWidgetContext'

type ChatWidgetProviderProps = {
  children: ReactNode
}

export function ChatWidgetProvider({ children }: ChatWidgetProviderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isChatEntryMode, setChatEntryMode] = useState(false)
  const [chatEntryData, setChatEntryData] = useState<ChatEntryData | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // 채팅 열기
  const openChat = () => setIsChatOpen(true)
  // 채팅 닫기 + 초기 상태 리셋
  const closeChat = () => {
    setIsChatOpen(false)
    setChatEntryMode(false)
    setChatEntryData(null)
  }
  // 상세 패널 열기
  const openDetail = () => setIsDetailOpen(true)
  // 상세 패널 닫기
  const closeDetail = () => setIsDetailOpen(false)

  // Context로 내려줄 UI 상태와 액션 묶음
  const value = {
    chat: {
      isOpen: isChatOpen,
      isEntryMode: isChatEntryMode,
      entryData: chatEntryData,
      open: openChat,
      close: closeChat,
      setEntryMode: setChatEntryMode,
      setEntryData: setChatEntryData,
    },
    detail: {
      isOpen: isDetailOpen,
      open: openDetail,
      close: closeDetail,
    },
  }

  return (
    <ChatWidgetContext.Provider value={value}>
      {children}
    </ChatWidgetContext.Provider>
  )
}
