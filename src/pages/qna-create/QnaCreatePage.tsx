import { Button, Input, Editor } from '@/components'
import { ROUTES_PATHS } from '@/constants/url'
import CategoryDropdown, {
  type SelectedCategory,
} from '@/shared/CategoryDropdown'
import type { Category } from '@/types'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function QnACreatePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [categories] = useState<Category[]>([])
  const navigate = useNavigate()

  const handleCategorySelect = (selected: SelectedCategory) => {
    setCategoryId(selected.small?.id ?? null)
  }

  /*
   *TODO: API axios 설정 후 작업 예정
   */
  const handleSubmit = async () => {
    if (!categoryId) return

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
            className="text-text-main bg-primary-100 h-15 w-full border-none text-[18px]"
          />
        </div>

        {/* TODO: MDEditor -> Tiptap으로 변경 예정 */}
        <div className="border-border-line mb-5 rounded-2xl border md:mb-3 md:rounded-[20px]">
          <Editor
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
    </main>
  )
}
