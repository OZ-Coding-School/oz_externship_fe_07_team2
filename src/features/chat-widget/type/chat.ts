import type { ChatRole } from '@/types'

export type ChatMessagePreview = {
  id: number
  message: string
  role: ChatRole
}
