import { useCallback, useState } from 'react'

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
    if (currentSessionId === null) {
      return
    }

    await deleteSession(currentSessionId)
    setCurrentSessionId(null)
  }, [currentSessionId, deleteSession])

  return {
    currentSessionId,
    ensureSession,
    deleteCurrentSession,
    isSessionCreating,
  }
}
