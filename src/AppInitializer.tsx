import { useEffect } from 'react'

import axios from 'axios'

import { getMe } from '@/api/auth'
import { API_BASE_URL } from '@/constants/apiPath'
import { AUTH_API } from '@/constants/auth-endpoint'
import { TokenService } from '@/lib/tokenService'
import { useAuthStore } from '@/store/useAuthStore'

export default function AppInitializer() {
  const setUser = useAuthStore((state) => state.setUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const setInitialized = useAuthStore((s) => s.setInitialized)

  useEffect(() => {
    const init = async () => {
      let token = TokenService.getAccessToken()

      if (!token) {
        // access token 없으면 refresh 먼저 시도
        try {
          const { data } = await axios.post(
            `${API_BASE_URL}${AUTH_API.REFRESH}`,
            {},
            { withCredentials: true }
          )
          TokenService.setAccessToken(data.access_token)
          token = data.access_token
        } catch {
          // refresh 실패 = 비로그인 상태
          setInitialized()
          return
        }
      }

      // token 있거나 refresh 성공하면 getMe() 호출
      getMe()
        .then((user) => setUser(user))
        .catch(() => {
          TokenService.clearTokens()
          clearAuth()
        })
        .finally(() => setInitialized())
    }

    init()
  }, [setUser, clearAuth, setInitialized])

  return null
}
