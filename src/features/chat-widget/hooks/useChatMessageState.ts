import { useCallback, useEffect, useRef, useState } from 'react'

import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'

type UseChatMessageStateParams = {
  sessionId: number | null
  chatMessages: ChatMessagePreview[] | undefined
}

export default function useChatMessageState({
  sessionId,
  chatMessages,
}: UseChatMessageStateParams) {
  // 화면에 렌더링되는 실제 메시지 상태
  const [localMessages, setLocalMessages] = useState<ChatMessagePreview[]>([])

  // 최신 메시지를 항상 참조하기 위한 ref (비동기/클로저 문제 방지)
  const localMessagesRef = useRef<ChatMessagePreview[]>([])

  // 로컬 메시지 id 생성용 (서버 id와 충돌 방지 → 음수 사용)
  const nextLocalMessageIdRef = useRef(-1)

  // localMessages가 바뀔 때마다 ref 최신화
  useEffect(() => {
    localMessagesRef.current = localMessages
  }, [localMessages])

  // session 또는 서버 메시지 변경 시 동기화
  useEffect(() => {
    if (sessionId === null) {
      setLocalMessages([])
      return
    }

    if (chatMessages) {
      setLocalMessages(chatMessages)
    }
  }, [chatMessages, sessionId])

  // 로컬 메시지용 id 생성 (음수로 감소)
  const createLocalMessageId = useCallback(() => {
    const nextLocalMessageId = nextLocalMessageIdRef.current
    nextLocalMessageIdRef.current -= 1
    return nextLocalMessageId
  }, [])

  // 메시지 추가 (user / assistant 공통)
  const appendPreviewMessage = useCallback(
    (role: ChatMessagePreview['role'], message: string, id: number) => {
      setLocalMessages((prevMessages) => [
        ...prevMessages,
        { id, role, message },
      ])
    },
    []
  )

  // assistant 메시지 업데이트 (스트리밍 대응)
  const updateAssistantMessage = useCallback((id: number, message: string) => {
    setLocalMessages((prevMessages) =>
      prevMessages.map((previewMessage) =>
        previewMessage.id === id
          ? { ...previewMessage, message }
          : previewMessage
      )
    )
  }, [])

  // 메시지 전체 복원 (롤백 / 재동기화)
  const restoreMessages = useCallback((messages: ChatMessagePreview[]) => {
    setLocalMessages(messages)
  }, [])

  return {
    localMessages,
    localMessagesRef,
    createLocalMessageId,
    appendPreviewMessage,
    updateAssistantMessage,
    restoreMessages,
  }
}
