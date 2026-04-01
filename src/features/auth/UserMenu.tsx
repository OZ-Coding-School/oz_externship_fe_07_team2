import { Button } from '@/components'
import { EXTERNAL_LINKS } from '@/constants'
import type { User } from '@/types'
import { cn } from '@/utils'

type UserMenuProps = {
  userInfo: User | null
  onLogout: () => void
  className?: string
}

function UserMenu({ userInfo, onLogout, className }: UserMenuProps) {
  return (
    <div
      className={cn(
        'shadow-modal flex flex-col gap-2.5 rounded-xl bg-white px-4 py-5',
        className
      )}
    >
      <div className="flex flex-col gap-1 border-b border-gray-200 pb-5">
        <span className="text-base font-semibold">{userInfo?.nickname}</span>
        <span className="text-sm text-gray-400">{userInfo?.email}</span>
      </div>
      <div className="flex flex-col">
        <Button variant="text" size="sm" rounded="md" className="justify-start">
          수강생 등록
        </Button>
        <a href={EXTERNAL_LINKS.MYPAGE} className="w-full">
          <Button
            variant="text"
            size="sm"
            rounded="md"
            className="w-full justify-start"
          >
            마이페이지
          </Button>
        </a>
        <Button
          variant="text"
          size="sm"
          rounded="md"
          className="justify-start"
          onClick={onLogout}
        >
          로그아웃
        </Button>
      </div>
    </div>
  )
}

export default UserMenu
