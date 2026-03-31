import { AUTH_API } from '@/constants/auth-endpoint'
import type { User } from '@/types'

import { api } from './api'

export const getMe = async (): Promise<User> => {
  const res = await api.get(AUTH_API.ME)
  return res.data
}

export const logout = async (): Promise<void> => {
  await api.post(AUTH_API.LOGOUT)
}
