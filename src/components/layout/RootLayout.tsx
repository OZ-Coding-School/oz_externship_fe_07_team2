import { Outlet } from 'react-router'

import { PageContainer } from '@/components'
import AiAnswerCard from '@/features/chat-widget/components/AiAnswerCard'
import ChatView from '@/features/chat-widget/components/ChatView'
import FloatingChatButton from '@/features/chat-widget/components/FloatingChatButton'
import { ChatWidgetProvider } from '@/features/chat-widget/context/ChatWidgetProvider'

export default function RootLayout() {
  return (
    <PageContainer>
      <Outlet />
      <ChatWidgetProvider>
        <ChatView />
        <AiAnswerCard />
        <FloatingChatButton />
      </ChatWidgetProvider>
    </PageContainer>
  )
}
