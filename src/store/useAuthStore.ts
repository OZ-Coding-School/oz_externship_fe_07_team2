import { create } from 'zustand'

import type { User, UserRole } from '@/types'

const ENROLLED_ROLES: UserRole[] = ['STUDENT', 'TA', 'OM', 'LC', 'ADMIN']

type AuthState = {
  user: User | null
  isLoggedIn: boolean
  isInitialized: boolean
  setInitialized: () => void
  setUser: (user: User) => void
  clearAuth: () => void
  isEnrolled: () => boolean
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoggedIn: false,
  isInitialized: false,

  setInitialized: () => set({ isInitialized: true }),
  setUser: (user) => set({ user, isLoggedIn: true }),
  clearAuth: () => set({ user: null, isLoggedIn: false }),
  isEnrolled: () => ENROLLED_ROLES.includes(get().user?.role as UserRole),
}))
