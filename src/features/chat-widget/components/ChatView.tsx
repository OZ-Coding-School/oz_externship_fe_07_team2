import { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import ChatWindow from '@/features/chat-widget/components/ChatWindow'
import useChatSessionLifecycle from '@/features/chat-widget/hooks/useChatSessionLifecycle'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'

export default function ChatView() {
  const { chat } = useChatWidgetContext()
  const location = useLocation()
  const previousPathnameRef = useRef(location.pathname)
  const previousOpenStateRef = useRef(chat.isOpen)
  const {
    currentSessionId,
    ensureSession,
    deleteCurrentSession,
    isSessionCreating,
  } = useChatSessionLifecycle({
    entryData: chat.entryData,
  })

  // 채팅을 닫을 때 실행되는 공통 로직
  const handleCloseChat = useCallback(async () => {
    await deleteCurrentSession() // 서버에 생성된 채팅 세션 삭제
    chat.close() // 채팅 UI 닫기
  }, [chat, deleteCurrentSession])

  // 라우트(페이지)가 변경되었을 때 처리
  // 채팅이 열려있는 상태라면 자동으로 닫고 세션도 정리
  useEffect(() => {
    if (previousPathnameRef.current === location.pathname) {
      return // 같은 경로면 무시
    }
    previousPathnameRef.current = location.pathname // 이전 경로 업데이트
    if (!chat.isOpen) {
      return // 채팅이 닫혀있으면 아무것도 안함
    }
    void handleCloseChat() // 페이지 이동 시 채팅 닫기 + 세션 정리
  }, [chat.isOpen, handleCloseChat, location.pathname])

  // 플로팅 버튼으로 닫아도 세션은 정리
  useEffect(() => {
    const wasOpen = previousOpenStateRef.current

    previousOpenStateRef.current = chat.isOpen

    if (wasOpen && !chat.isOpen && currentSessionId !== null) {
      void deleteCurrentSession()
    }
  }, [chat.isOpen, currentSessionId, deleteCurrentSession])

  if (!chat.isOpen) return null

  return (
    <div className="fixed right-6 bottom-29 z-50">
      <ChatWindow
        onClose={() => void handleCloseChat()}
        sessionId={currentSessionId}
        ensureSession={ensureSession}
        isSessionCreating={isSessionCreating}
        entryData={chat.entryData}
      />
    </div>
  )
}
