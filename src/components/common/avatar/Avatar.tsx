import { cva, type VariantProps } from 'class-variance-authority'

import defaultAvatar from '@/assets/images/default-avatar.png'
import { cn } from '@/utils/cn'

const avatarVariants = cva('rounded-full object-cover', {
  variants: {
    size: {
      sm: 'w-6 h-6', // 목록용 - 24px
      md: 'w-8 h-8', // 챗봇용 - 32px
      lg: 'w-10 h-10', // 댓글용 - 40px
      xl: 'w-12 h-12', // 답변상세용 - 48px
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

type AvatarProps = VariantProps<typeof avatarVariants> & {
  src?: string
  alt?: string
  className?: string
}

/**
 * 사용자 프로필 이미지 컴포넌트
 * - 이미지가 없거나 로드 실패 시 기본 이미지로 대체
 *
 * @example
 * <Avatar src={user.profileImage} size="lg" />
 */
export default function Avatar({
  src,
  alt = '프로필 이미지',
  className,
  size,
}: AvatarProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultAvatar
  }

  return (
    <img
      src={src ?? defaultAvatar}
      alt={alt}
      onError={handleImageError}
      className={cn(avatarVariants({ size }), className)}
    />
  )
}
