import { useMutation } from '@tanstack/react-query'

import { createChatSession } from '@/api/chat-api'

export default function useCreateChatSessionMutation() {
  return useMutation({
    mutationFn: createChatSession,
  })
}
