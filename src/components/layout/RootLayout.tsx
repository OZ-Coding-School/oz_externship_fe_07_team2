import { Outlet } from 'react-router'
import { PageContainer } from '@/components'

export default function RootLayout() {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  )
}
