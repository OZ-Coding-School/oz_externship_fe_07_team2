export type UserRole = 'USER' | 'STUDENT' | 'TA' | 'OM' | 'LC' | 'ADMIN'

export type User = {
  id: number
  email?: string
  name?: string
  nickname: string
  phone_number?: string
  gender?: 'M' | 'F' | 'O' | string
  birthday?: string
  profile_img_url?: string | null
  role?: UserRole
  created_at?: string
  updated_at?: string
}
