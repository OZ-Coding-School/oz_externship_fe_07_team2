import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
