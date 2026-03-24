import { create } from 'zustand'

export type AuthUser = {
  id: number
  nickname: string
  profile_image_url: string | null
  role?: string
}

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  setAuth: (payload: { accessToken: string; user: AuthUser }) => void
  clearAuth: () => void
}

const getStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem('authUser')

  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  user: getStoredUser(),

  setAuth: ({ accessToken, user }) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('authUser', JSON.stringify(user))

    set({
      accessToken,
      user,
    })
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('authUser')

    set({
      accessToken: null,
      user: null,
    })
  },
}))
