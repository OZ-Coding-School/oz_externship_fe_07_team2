import { Outlet } from 'react-router'

import { FloatingChatButton, PageContainer } from '@/components'

export default function RootLayout() {
  return (
    <PageContainer>
      <Outlet />
      <FloatingChatButton />
    </PageContainer>
  )
}
