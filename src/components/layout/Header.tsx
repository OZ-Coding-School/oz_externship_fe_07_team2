import { Link, useNavigate } from 'react-router'

import { useQueryClient } from '@tanstack/react-query'

import Logo from '@/assets/images/logo.png'
import { EXTERNAL_LINKS, ROUTES_PATHS } from '@/constants'
import { useAuthStore } from '@/store'

import Avatar from '../common/avatar/Avatar'

export default function Header() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = async () => {
    clearAuth()
    queryClient.clear()
    navigate(ROUTES_PATHS.LOGIN)
  }

  return (
    <header className="border-b border-gray-200">
      <section className="flex h-12 w-full items-center justify-center bg-[#222222] text-base text-white">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </section>
      <section className="text-ui-gray-600 flex h-16 w-full min-w-170 items-center justify-between px-10 text-[18px] whitespace-nowrap md:px-20 xl:px-90">
        <div className="flex items-center gap-15">
          <h1 className="shrink-0">
            <Link to="/">
              <img
                className="h-auto w-30 object-contain"
                src={Logo}
                alt="logo"
              />
            </Link>
          </h1>
          <nav aria-label="주요 메뉴">
            <ul className="flex gap-15">
              <li className="py-4">
                <a href={EXTERNAL_LINKS.COMMUNITY}>커뮤니티</a>
              </li>
              <li className="py-4">
                <a href={EXTERNAL_LINKS.QNA}>질의응답</a>
              </li>
            </ul>
          </nav>
        </div>
        <nav aria-label="사용자 메뉴">
          <ul className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <li className="flex items-center gap-2 py-4">
                  <Avatar src={user?.profile_img_url ?? undefined} size="sm" />
                  <span>{user?.nickname}</span>
                </li>
                <li className="py-4">
                  <button type="button" onClick={handleLogout}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="py-4">
                  <a href={EXTERNAL_LINKS.LOGIN}>로그인</a>
                </li>
                <li className="text-xl">|</li>
                <li className="py-4">
                  <a href={EXTERNAL_LINKS.SIGNUP}>회원가입</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </header>
  )
}
