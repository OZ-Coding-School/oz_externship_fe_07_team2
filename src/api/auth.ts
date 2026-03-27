import type { AuthUser } from '@/store/useAuthStore'

import { api } from './api'

export const getMe = async (): Promise<AuthUser> => {
  const res = await api.get('/accounts/me')
  return res.data
}
