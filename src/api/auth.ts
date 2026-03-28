import type { User } from '@/types'

import { api } from './api'

export const getMe = async (): Promise<User> => {
  const res = await api.get('/accounts/me')
  return res.data
}
