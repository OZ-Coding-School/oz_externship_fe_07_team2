import { Button, Dropdown } from '@/components'
import { RotateCw, X } from 'lucide-react'
import { useEffect } from 'react'

type FilterSidebarProps = {
  open: boolean
  onClose: () => void
}

export default function FilterSidebar({ open, onClose }: FilterSidebarProps) {
  //스크롤  없애기
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'auto'
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-surface-default flex h-full w-full flex-col rounded-l-xl rounded-bl-xl md:h-270 md:w-135"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-11.5">
          <div className="mt-11.25 flex items-center justify-between">
            <div className="text-[32px]">필터</div>
            <Button variant={'text'} onClick={onClose} className="p-0">
              <X size={34} className="text-text-light" />
            </Button>
          </div>

          <div className="mt-15">
            <div className="text-text-sub mb-5 text-xl font-bold">
              카테고리 선택
            </div>

            <div className="space-y-5">
              <Dropdown options={[]} placeHolder="대분류" />
              <Dropdown options={[]} placeHolder="중분류" disabled />
              <Dropdown options={[]} placeHolder="소분류" disabled />
            </div>
          </div>
        </div>

        <div className="shadow-modal bg-surface-sub mt-auto flex w-full justify-between rounded-bl-xl px-5 py-5 text-xl [&>button]:w-full">
          <Button variant={'text'} size={'lg'}>
            <RotateCw className="mr-1" /> 선택 초기화
          </Button>
          <Button size={'lg'}>필터 적용하기</Button>
        </div>
      </div>
    </div>
  )
}
