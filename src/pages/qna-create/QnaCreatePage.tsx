import { useParams } from 'react-router'

import { Button, Input, Loading, Popup } from '@/components'
import TipTabEditor from '@/components/common/markdown/TipTabEditor'
import { useQnaForm } from '@/hooks/useQnaForm'
import CategoryDropdown from '@/shared/CategoryDropdown'

type QnACreatePageProps = {
  mode: 'create' | 'edit'
  questionId?: number
}

export default function QnACreatePage({ mode }: QnACreatePageProps) {
  const { id } = useParams<{ id: string }>()
  const questionId = Number(id)
  const {
    title,
    setTitle,
    content,
    setContent,
    popupMessage,
    setPopupMessage,
    categories,
    questionDetail,
    initialCategory,
    isPending,
    isError,
    handleSubmit,
    handleCategorySelect,
  } = useQnaForm(mode, questionId)

  if (isPending) return <Loading />

  return (
    <main className="flex h-auto w-full flex-col">
      <h1 className="mb-3 text-[clamp(1.5rem,calc(0.884vw+1.293rem),2rem)] leading-tight font-bold md:mb-5">
        {mode === 'create' ? '질문 작성하기' : '질문 수정하기'}
      </h1>
      <hr className="border-border-line mb-6 w-full border-[0.5px] md:mb-10" />

      <div className="w-full">
        <div className="border-border-line mb-3 rounded-2xl border px-5 py-6 md:mb-5 md:rounded-[20px] md:px-9 md:py-10">
          {(mode === 'create' || initialCategory) && (
            <CategoryDropdown
              key={questionDetail?.category.id ?? 'create'}
              categories={categories}
              onSelect={handleCategorySelect}
              className="mb-3 md:mb-5"
              initialValue={initialCategory}
            />
          )}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full"
          />
        </div>

        <div className="border-border-line mb-3 rounded-2xl border md:mb-5 md:rounded-[20px]">
          {(mode === 'create' || (questionDetail && content)) && (
            <TipTabEditor
              key={questionDetail?.id ?? 'create'}
              content={content}
              contentChange={(value) => setContent(value ?? '')}
            />
          )}
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
          {mode === 'create' ? '등록하기' : '저장하기'}
        </Button>
      </div>
      <Popup
        isOpen={!!popupMessage || isError}
        content={popupMessage}
        confirmLabel="확인"
        onConfirm={() => setPopupMessage(null)}
        onCancel={() => setPopupMessage(null)}
      />
    </main>
  )
}
