import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button, Input, Popup } from '@/components'
import TipTabEditor from '@/components/common/markdown/TipTabEditor'
import { ROUTES_PATHS } from '@/constants/url'
import useCategoriesQuery from '@/queries/useCategoriesQuery'
import useCreateQuestionMutation from '@/queries/useCreateQuestionMutation'
import CategoryDropdown, {
  type SelectedCategory,
} from '@/shared/CategoryDropdown'

type QnACreatePageProps = {
  mode: 'create' | 'edit'
  questionId?: number
}

export default function QnACreatePage({ mode }: QnACreatePageProps) {
  // TODO: DetailQuery API 연결 예정

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null)
  const { data: categories = [] } = useCategoriesQuery()
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    mutate: createQuestion,
    isPending,
    isError,
  } = useCreateQuestionMutation()

  const handleCategorySelect = (selected: SelectedCategory) => {
    setSelectedCategory(selected)
  }

  const categoryId = selectedCategory?.small?.id

  const validate = (): string | null => {
    if (!categoryId) return '카테고리를 선택해 주세요.'
    if (!title.trim()) return '제목을 입력해 주세요.'
    if (!content.trim() || content === '<p></p>' || content === '<p><br></p>')
      return '질문 내용을 입력해 주세요.'
    return null
  }

  const handleCreate = () => {
    createQuestion(
      { title, content, category: categoryId! },
      { onSuccess: () => navigate(ROUTES_PATHS.QNA_LIST) }
    )
  }

  const handleSubmit = () => {
    const error = validate()
    if (error) return setAlertMessage(error)

    if (mode === 'create') return handleCreate()
    // TODO: edit 모드는 DetailQuery merge 후 작업 예정
  }

  return (
    <main className="flex h-auto w-full flex-col">
      <h1 className="mb-3 text-[clamp(1.5rem,calc(0.884vw+1.293rem),2rem)] leading-tight font-bold md:mb-5">
        질문 작성하기
      </h1>
      <hr className="border-border-line mb-6 w-full border-[0.5px] md:mb-10" />

      <div className="w-full">
        <div className="border-border-line mb-3 rounded-2xl border px-5 py-6 md:mb-5 md:rounded-[20px] md:px-9 md:py-10">
          <CategoryDropdown
            categories={categories}
            onSelect={handleCategorySelect}
            className="mb-3 md:mb-5"
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full"
          />
        </div>

        <div className="border-border-line mb-3 rounded-2xl border md:mb-5 md:rounded-[20px]">
          <TipTabEditor
            content={content}
            contentChange={(value) => setContent(value ?? '')}
          />
        </div>
      </div>
      <div className="mt-8 flex w-full justify-end md:mt-13">
        <Button
          variant="primary"
          size="lg"
          className="h-9.5 w-28 p-0 text-[clamp(0.875rem,calc(0.663vw+0.72rem),1.25rem)] md:h-13.5 md:w-35"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {mode === 'create'
            ? isPending
              ? '등록 중...'
              : '등록하기'
            : '저장하기'}
        </Button>
      </div>
      <Popup
        isOpen={!!alertMessage || isError}
        content={alertMessage}
        confirmLabel="확인"
        onConfirm={() => setAlertMessage(null)}
        onCancel={() => setAlertMessage(null)}
      />
    </main>
  )
}
