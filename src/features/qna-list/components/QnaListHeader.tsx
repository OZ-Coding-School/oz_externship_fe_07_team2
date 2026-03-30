import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Pencil, Search } from 'lucide-react'

import { Button, SearchBar } from '@/components'
import { ROUTES_PATHS } from '@/constants'
import { useAuthStore } from '@/store'
import { useModalStore } from '@/store/useModalStore'

type QnaListHeaderProps = {
  value: string
  onChange: (value: string) => void
}

export default function QnaListHeader({ value, onChange }: QnaListHeaderProps) {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isEnrolled = useAuthStore((state) => state.isEnrolled())
  const openUnauthorized = useModalStore((state) => state.openUnauthorized)

  // 수강생 권한 아닐 시 클릭방지(팝업모달)
  const handleQnaCreate = () => {
    if (!isEnrolled) {
      openUnauthorized()
      return
    }
    navigate(ROUTES_PATHS.QNA_CREATE)
  }

  return (
    <div className="mb-13 flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-text-main text-[clamp(1.5rem,calc(0.884vw+1.293rem),2rem)] leading-[1.3] font-bold">
          질의응답
        </h1>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="md"
            rounded="full"
            aria-label={isSearchOpen ? '검색창 닫기' : '검색창 열기'}
            className="h-11 w-11 p-0"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            rounded="md"
            aria-label="질문하기"
            className="h-11 w-11 p-0"
            onClick={handleQnaCreate}
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="hidden items-center justify-between gap-4 md:flex">
        <SearchBar
          value={value}
          onChange={onChange}
          className="bg-surface-sub w-full max-w-118"
        />
        <Button size="md" rounded="md" onClick={handleQnaCreate}>
          <Pencil className="mr-2 h-5 w-5" />
          질문하기
        </Button>
      </div>

      {isSearchOpen && (
        <div className="md:hidden">
          <SearchBar
            value={value}
            onChange={onChange}
            className="bg-surface-sub h-11 w-full"
          />
        </div>
      )}
    </div>
  )
}
