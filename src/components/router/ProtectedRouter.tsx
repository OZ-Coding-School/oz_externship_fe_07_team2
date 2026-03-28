import { Navigate, Outlet } from 'react-router'

import { ROUTES_PATHS } from '@/constants'
import { useAuthStore } from '@/store'
import { useModalStore } from '@/store/useModalStore'

import Loading from '../common/loading/Loading'

type ProtectedRouterProps = {
  requireErolled?: boolean
}

export default function ProtectedRoute({
  requireErolled = false,
}: ProtectedRouterProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const isEnrolled = useAuthStore((state) => state.isEnrolled())
  const isInitialized = useAuthStore((state) => state.isInitialized)
  const openUnauthorized = useModalStore((state) => state.openUnauthorized)

  if (!isInitialized) return <Loading />

  if (!isLoggedIn) return <Navigate to={ROUTES_PATHS.LOGIN} replace />
  if (requireErolled && !isEnrolled) {
    openUnauthorized()
    return <Navigate to={ROUTES_PATHS.QNA_LIST} replace />
  }

  return <Outlet />
}
