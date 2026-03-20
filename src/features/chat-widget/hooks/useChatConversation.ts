import { useCallback, useEffect, useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { createChatCompletion } from '@/api/chat-api'
import type { ChatMessagePreview } from '@/features/chat-widget/type/chat'
import useChatMessagesQuery from '@/queries/useChatMessagesQuery'

import useChatMessageState from './useChatMessageState'

const INITIAL_GREETING_MESSAGE: ChatMessagePreview = {
  id: 1,
  role: 'assistant',
  message: '안녕하세요. 무엇을 도와드릴까요?',
}

type UseChatConversationParams = {
  sessionId: number | null
  ensureSession: (message: string) => Promise<{
    id: number
    created: boolean
  }>
  isSessionCreating?: boolean
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export default function useChatConversation({
  sessionId,
  ensureSession,
  isSessionCreating = false,
}: UseChatConversationParams) {
  const queryClient = useQueryClient()
  // 서버에서 해당 session의 채팅 메시지 조회
  const {
    data: chatMessagesData,
    isPending,
    isError,
  } = useChatMessagesQuery({
    sessionId,
  })

  // 메시지 전송 중 에러 메시지 상태
  const [sendErrorMessage, setSendErrorMessage] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [scrollToLatestKey, setScrollToLatestKey] = useState(0)

  // 메시지 상태 및 스크롤 관련 로직 관리 훅
  const {
    localMessages,
    localMessagesRef,
    createLocalMessageId,
    appendPreviewMessage,
    updateAssistantMessage,
    restoreMessages,
  } = useChatMessageState({
    sessionId,
    chatMessages: isStreaming ? undefined : chatMessagesData?.results,
  })
  // 실제 렌더링할 메시지가 존재하는지 여부
  const renderMessages =
    sessionId === null
      ? [INITIAL_GREETING_MESSAGE, ...localMessages]
      : localMessages
  const hasRenderableMessages = renderMessages.length > 0
  // 기존 session에서 메시지 불러오는 중 (초기 로딩 상태)
  const isMessagePending =
    sessionId !== null && isPending && !hasRenderableMessages
  // 메시지 조회 실패 상태
  const isMessageError =
    sessionId !== null &&
    isError &&
    !hasRenderableMessages &&
    sendErrorMessage === null &&
    !isStreaming

  const handleSend = useCallback(
    async (message: string) => {
      const trimmedMessage = message.trim()

      if (!trimmedMessage || isSessionCreating || isStreaming) return false

      const previousMessages = localMessagesRef.current ?? []
      const userMessageId = createLocalMessageId()
      const assistantMessageId = createLocalMessageId()

      setSendErrorMessage(null)
      setScrollToLatestKey((prevKey) => prevKey + 1)
      appendPreviewMessage('user', trimmedMessage, userMessageId)

      try {
        const { id: nextSessionId } = await ensureSession(trimmedMessage)

        const abortController = new AbortController()
        let hasStartedAssistantStream = false

        abortControllerRef.current = abortController
        setIsStreaming(true)

        const finalAssistantMessage = await createChatCompletion(
          nextSessionId,
          { message: trimmedMessage },
          {
            signal: abortController.signal,
            onChunk: (_chunk, accumulated) => {
              if (!hasStartedAssistantStream) {
                appendPreviewMessage(
                  'assistant',
                  accumulated,
                  assistantMessageId
                )
                hasStartedAssistantStream = true
                return
              }

              updateAssistantMessage(assistantMessageId, accumulated)
            },
          }
        )

        if (!hasStartedAssistantStream && finalAssistantMessage) {
          appendPreviewMessage(
            'assistant',
            finalAssistantMessage,
            assistantMessageId
          )
        }

        await queryClient.invalidateQueries({
          queryKey: ['chat-messages', nextSessionId],
        })

        return true
      } catch (error) {
        if (isAbortError(error)) {
          return true
        }

        setSendErrorMessage('메시지 전송에 실패했습니다. 다시 시도해 주세요.')
        restoreMessages(previousMessages)
        return false
      } finally {
        abortControllerRef.current = null
        setIsStreaming(false)
      }
    },
    [
      appendPreviewMessage,
      createLocalMessageId,
      ensureSession,
      isSessionCreating,
      isStreaming,
      localMessagesRef,
      queryClient,
      restoreMessages,
      updateAssistantMessage,
    ]
  )

  useEffect(
    () => () => {
      abortControllerRef.current?.abort()
    },
    []
  )

  // 외부에서 사용할 상태 및 핸들러 반환
  return {
    localMessages: renderMessages,
    scrollToLatestKey,
    sendErrorMessage,
    isMessagePending,
    isMessageError,
    isSubmitting: isSessionCreating || isStreaming,
    isStreaming,
    handleSend,
  }
}
