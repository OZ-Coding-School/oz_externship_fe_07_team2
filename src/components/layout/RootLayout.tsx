import { Outlet } from 'react-router'

import { PageContainer, Popup } from '@/components'
import ChatView from '@/features/chat-widget/components/ChatView'
import FloatingChatButton from '@/features/chat-widget/components/FloatingChatButton'
import { ChatWidgetProvider } from '@/features/chat-widget/context/ChatWidgetProvider'
import { useModalStore } from '@/store/useModalStore'

export default function RootLayout() {
  const { isUnauthorizedOpen: isOpen, closeUnauthorized: close } =
    useModalStore()
  return (
    <PageContainer>
      <ChatWidgetProvider>
        <Outlet />
        <ChatView />
        <FloatingChatButton />
      </ChatWidgetProvider>

      <Popup
        isOpen={isOpen}
        content={`해당 기능은 수강생만\n이용할 수 있습니다.`}
        onConfirm={close}
        confirmLabel="확인"
      />
    </PageContainer>
  )
}
