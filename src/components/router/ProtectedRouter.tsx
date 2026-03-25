import { Navigate, Outlet } from 'react-router'

import { ROUTES_PATHS } from '@/constants/url'
import { useAuthStore } from '@/store'

export default function ProtectedRoute() {
  const accessToken = useAuthStore((s) => s.accessToken)
  if (!accessToken) return <Navigate to={ROUTES_PATHS.LOGIN} replace />
  return <Outlet />
}
