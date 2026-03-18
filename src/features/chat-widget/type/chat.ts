import type { ChatRole } from '@/types'

// 채팅방 리스트 UI에서 사용하는 미리보기 데이터
export type ChatRoomPreview = {
  id: number
  title: string
  unreadCount: number
  timeLabel: string
}

export type ChatMessagePreview = {
  id: number
  message: string
  role: ChatRole
}
