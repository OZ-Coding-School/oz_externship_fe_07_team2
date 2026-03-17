import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button, Input, Popup } from '@/components'
import TipTabEditor from '@/components/common/markdown/TipTabEditor'
import { ROUTES_PATHS } from '@/constants/url'
import CategoryDropdown, {
  type SelectedCategory,
} from '@/shared/CategoryDropdown'
import type { Category } from '@/types'

export default function QnACreatePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories] = useState<Category[]>([])
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleCategorySelect = (selected: SelectedCategory) => {
    setCategoryId(selected.small?.id ?? null)
  }

  /*
   *TODO: API axios 설정 후 작업 예정
   */
  const handleSubmit = async () => {
    // 순서대로 검증
    if (!categoryId) {
      setAlertMessage('카테고리를 선택해 주세요.')
      return
    }
    if (!title.trim()) {
      setAlertMessage('제목을 입력해 주세요.')
      return
    }
    if (!content.trim() || content === '<p></p>') {
      setAlertMessage('질문 내용을 입력해 주세요.')
      return
    }

    navigate(ROUTES_PATHS.QNA_LIST)
  }

  return (
    <main className="flex h-auto w-full flex-col">
      <h1 className="text-text-default mb-5 text-[32px] font-bold">
        질문 작성하기
      </h1>
      <hr className="border-border-line mb-10 w-full border-[0.5px]" />

      <div className="w-full">
        <div className="border-border-line mb-5 rounded-2xl border px-9 py-10 md:mb-3 md:rounded-[20px]">
          <CategoryDropdown
            categories={categories}
            direction="row"
            onSelect={handleCategorySelect}
            className="mb-5"
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full"
          />
        </div>

        <div className="border-border-line mb-5 rounded-2xl border md:mb-3 md:rounded-[20px]">
          <TipTabEditor
            content={content}
            contentChange={(value) => setContent(value ?? '')}
          />
        </div>
      </div>
      <div className="mt-3 flex w-full justify-end">
        <Button
          variant="primary"
          size="lg"
          className="h-13.5 w-35 text-[20px]"
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>
      <Popup
        isOpen={!!alertMessage}
        content={alertMessage}
        confirmLabel="확인"
        onConfirm={() => setAlertMessage(null)}
        onCancel={() => setAlertMessage(null)}
      />
    </main>
  )
}
