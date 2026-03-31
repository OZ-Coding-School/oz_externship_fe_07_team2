import { Outlet } from 'react-router'

import { Footer, Header, PageContainer, Popup } from '@/components'
import { ERROR_MESSAGES } from '@/constants/message'
import { ChatView, ChatWidgetProvider, FloatingChatButton } from '@/features'
import { useModalStore } from '@/store/useModalStore'

export default function RootLayout() {
  const { isUnauthorizedOpen: isOpen, closeUnauthorized: close } =
    useModalStore()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <PageContainer>
        <ChatWidgetProvider>
          <Outlet />
          <ChatView />
          <FloatingChatButton />
        </ChatWidgetProvider>

        <Popup
          isOpen={isOpen}
          content={ERROR_MESSAGES.UNAUTHORIZED}
          onConfirm={close}
          confirmLabel="확인"
        />
      </PageContainer>
      <Footer />
    </div>
  )
}
