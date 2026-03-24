import type { ReactNode } from 'react'

import { useAuthStore } from '@/store'

type AuthGuardProps = {
  children: ReactNode
  fallback?: ReactNode
}

export default function AuthGuard({
  children,
  fallback = null,
}: AuthGuardProps) {
  const accessToken = useAuthStore((s) => s.accessToken)

  if (!accessToken) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
