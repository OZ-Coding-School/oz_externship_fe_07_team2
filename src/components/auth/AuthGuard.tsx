import type { ReactNode } from 'react'

import { useAuthStore } from '@/store/useAuthStore'

type AuthGuardProps = {
  children: ReactNode
  fallback?: ReactNode
}

export default function AuthGuard({
  children,
  fallback = null,
}: AuthGuardProps) {
  const accessToken = useAuthStore((s) => s.accessToken)

  return accessToken ? <>{children}</> : <>{fallback}</>
}
