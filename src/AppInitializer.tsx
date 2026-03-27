import { useEffect } from 'react'

import { getMe } from '@/api/auth'
import { useAuthStore } from '@/store/useAuthStore'

export default function AppInitializer() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken)
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    const token = import.meta.env.VITE_ACCESS_TOKEN
    if (!token) return

    setAccessToken(token)

    getMe()
      .then((user) => {
        setAuth({ accessToken: token, user })
      })
      .catch((error) => {
        console.error('Failed to fetch user info:', error)
      })
  }, [setAccessToken, setAuth])

  return null
}
