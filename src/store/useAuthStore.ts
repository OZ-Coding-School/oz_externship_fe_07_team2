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

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  user: null,

  setAuth: ({ accessToken, user }) => {
    localStorage.setItem('accessToken', accessToken)
    set({ accessToken, user })
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken')
    set({ accessToken: null, user: null })
  },
}))
