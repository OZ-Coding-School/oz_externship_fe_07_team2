import { useAuthStore } from '@/store/useAuthStore'

type AuthGuardProps = {
  children: React.ReactElement
  fallback?: React.ReactElement | null
  requireEnrolled?: boolean
}

export default function AuthGuard({
  children,
  fallback = null,
  requireEnrolled = false,
}: AuthGuardProps): React.ReactElement | null {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const isEnrolled = useAuthStore((state) => state.isEnrolled)

  if (!isLoggedIn) return fallback
  if (requireEnrolled && !isEnrolled) return fallback

  return children
}
