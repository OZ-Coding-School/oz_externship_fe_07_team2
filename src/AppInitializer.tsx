import { useEffect } from 'react'

import { getMe } from '@/api/auth'
import { useAuthStore } from '@/store/useAuthStore'

import { TokenService } from './lib/tokenService'

export default function AppInitializer() {
  const setUser = useAuthStore((state) => state.setUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const setInitialized = useAuthStore((s) => s.setInitialized)

  useEffect(() => {
    // TODO: 로그인 구현 후 제거
    const devToken = import.meta.env.VITE_ACCESS_TOKEN
    if (devToken) TokenService.setAccessToken(devToken)

    const token = TokenService.getAccessToken()
    if (!token) return

    getMe()
      .then((user) => setUser(user))
      .catch(() => {
        TokenService.clearTokens()
        clearAuth()
      })
      .finally(() => setInitialized())
  }, [setUser, clearAuth, setInitialized])

  return null
}
