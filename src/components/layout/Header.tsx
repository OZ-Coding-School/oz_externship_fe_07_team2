import { useQueryClient } from '@tanstack/react-query'

import { logout as logoutApi } from '@/api/auth'
import Logo from '@/assets/images/logo.png'
import { Avatar } from '@/components'
import { EXTERNAL_LINKS } from '@/constants'
import { TokenService } from '@/lib/tokenService'
import { useAuthStore } from '@/store'

export default function Header() {
  const queryClient = useQueryClient()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

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
              <>
                <li className="flex items-center py-4">
                  <Avatar src={user?.profile_img_url ?? undefined} size="sm" />
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
