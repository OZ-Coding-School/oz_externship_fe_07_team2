import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type AuthUser = {
  id: number
  email?: string
  name?: string
  nickname: string
  phone_number?: string
  gender?: 'M' | 'F' | 'O' | string
  birthday?: string
  profile_img_url?: string | null
  role?: string
  created_at?: string
  updated_at?: string
}

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  setAuth: (payload: { accessToken: string; user: AuthUser }) => void
  setAccessToken: (token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAuth: ({ accessToken, user }) =>
        set({
          accessToken,
          user,
        }),

      setAccessToken: (token: string) =>
        set({
          accessToken: token,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
