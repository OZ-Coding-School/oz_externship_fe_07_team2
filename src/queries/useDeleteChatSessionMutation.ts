import { useMutation } from '@tanstack/react-query'

import { deleteChatSession } from '@/api/chat-api'

export default function useDeleteChatSessionMutation() {
  return useMutation({
    mutationFn: deleteChatSession,
  })
}
