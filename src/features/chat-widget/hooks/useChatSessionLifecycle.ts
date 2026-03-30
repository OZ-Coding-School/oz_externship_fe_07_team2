import { useCallback, useRef, useState } from 'react'

import { deleteChatSessionOnPageExit } from '@/api/chat-api'
import type { ChatEntryData } from '@/features/chat-widget/context/ChatWidgetContext'
import useCreateChatSessionMutation from '@/queries/useCreateChatSessionMutation'
import useDeleteChatSessionMutation from '@/queries/useDeleteChatSessionMutation'

const CHAT_SESSION_TITLE_MAX_LENGTH = 20

type EnsureSessionResult = {
  id: number
  created: boolean
}

type UseChatSessionLifecycleParams = {
  entryData?: ChatEntryData | null
}

export default function useChatSessionLifecycle({
  entryData = null,
}: UseChatSessionLifecycleParams = {}) {
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)
  const currentSessionIdRef = useRef<number | null>(null)
  const { mutateAsync: createSession, isPending: isSessionCreating } =
    useCreateChatSessionMutation()
  const { mutateAsync: deleteSession } = useDeleteChatSessionMutation()

  const ensureSession = useCallback(
    async (message: string): Promise<EnsureSessionResult> => {
      if (currentSessionId !== null) {
        return { id: currentSessionId, created: false }
      }

      const createdSession = await createSession({
        question_id: entryData?.questionId,
        title: (entryData?.questionTitle ?? message).slice(
          0,
          CHAT_SESSION_TITLE_MAX_LENGTH
        ),
        using_model: 'gemini',
      })

      setCurrentSessionId(createdSession.id)
      currentSessionIdRef.current = createdSession.id

      return { id: createdSession.id, created: true }
    },
    [
      createSession,
      currentSessionId,
      entryData?.questionId,
      entryData?.questionTitle,
    ]
  )

  const deleteCurrentSession = useCallback(async () => {
    const sessionId = currentSessionIdRef.current

    if (sessionId === null) {
      return
    }

    setCurrentSessionId(null)
    currentSessionIdRef.current = null
    await deleteSession(sessionId)
  }, [deleteSession])

  const deleteCurrentSessionOnPageExit = useCallback(() => {
    const sessionId = currentSessionIdRef.current

    if (sessionId === null) {
      return
    }

    setCurrentSessionId(null)
    currentSessionIdRef.current = null
    deleteChatSessionOnPageExit(sessionId)
  }, [])

  return {
    currentSessionId,
    ensureSession,
    deleteCurrentSession,
    deleteCurrentSessionOnPageExit,
    isSessionCreating,
  }
}
