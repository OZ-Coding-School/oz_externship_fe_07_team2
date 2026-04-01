import { useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { logout as logoutApi } from '@/api/auth'
import defaultAvatar from '@/assets/images/default-avatar.png'
import Logo from '@/assets/images/logo.png'
import { EXTERNAL_LINKS } from '@/constants'
import { UserMenu } from '@/features'
import useOutsideClick from '@/hooks/useOutsideClick'
import { TokenService } from '@/lib/tokenService'
import { useAuthStore } from '@/store'

export default function Header() {
  const queryClient = useQueryClient()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false))

  const handleLogout = async () => {
    try {
      await logoutApi()
    } catch {
      // API 실패해도 클라이언트 로그아웃 진행
    }
    TokenService.clearTokens()
    clearAuth()
    queryClient.clear()
    window.location.href = EXTERNAL_LINKS.HOME
  }

  return (
    <header className="border-b border-gray-200">
      <section className="flex h-12 w-full items-center justify-center bg-[#222222] text-base text-white">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </section>
      <section className="text-ui-gray-600 flex h-16 w-full min-w-170 items-center justify-between px-10 text-[18px] whitespace-nowrap md:px-20 xl:px-90">
        <div className="flex items-center gap-15">
          <h1 className="shrink-0">
            <a href={EXTERNAL_LINKS.HOME}>
              <img
                className="h-auto w-30 object-contain"
                src={Logo}
                alt="logo"
              />
            </a>
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
              <li className="relative py-4" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={user?.profile_img_url ?? defaultAvatar}
                    alt="프로필 이미지"
                    className="pointer-events-none h-6 w-6 rounded-full object-cover"
                  />
                </button>

                {isDropdownOpen && (
                  <UserMenu
                    userInfo={user}
                    onLogout={handleLogout}
                    className="absolute top-full right-0 z-50 mt-2 w-48"
                  />
                )}
              </li>
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
