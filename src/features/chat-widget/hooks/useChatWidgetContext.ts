import { useContext } from 'react'

import { ChatWidgetContext } from '@/features/chat-widget/context/ChatWidgetContext'

// Context 사용을 위한 커스텀 훅
export function useChatWidgetContext() {
  const context = useContext(ChatWidgetContext)

  // Provider 밖에서 사용 시 에러 방지
  if (!context) {
    throw new Error(
      'useChatWidgetContext must be used within a ChatWidgetProvider'
    )
  }

  return context
}
