import type { User } from '@/types'

export const mockLoginUser: { accessToken: string; user: User } = {
  accessToken: 'mock-access-token',
  user: {
    id: 1,
    nickname: '김오즈',
    profile_img_url: null,
    role: 'USER',
  },
}
