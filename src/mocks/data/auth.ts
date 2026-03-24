import type { AuthUser } from '@/store/useAuthStore'

export const mockLoginUser: { accessToken: string; user: AuthUser } = {
  accessToken: 'mock-access-token',
  user: {
    id: 1,
    nickname: '김오즈',
    profile_image_url: null,
    role: 'USER',
  },
}
