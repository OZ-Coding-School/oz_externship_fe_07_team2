import { useState } from 'react'

import { Avatar, Button, TipTabEditor } from '@/components'

type QnaAnswerProps = {
  nickname: string
  onSubmit?: (content: string) => void
}

export default function QnaAnswer({ nickname, onSubmit }: QnaAnswerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState('')

  const handleClickButton = () => {
    if (!isEditing) {
      setIsEditing(true)
      return
    }
    const trimmedContent = content.replace(/<[^>]*>/g, '').trim()
    if (!trimmedContent) return
    onSubmit?.(content)
  }

  return (
    <section className="bg-surface-default border-border-line mt-6 rounded-2xl border px-5 py-4">
      <div className="m-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Avatar size="lg" />

          <div>
            <p className="text-text-highlight text-sm font-semibold">
              {nickname} 님,
            </p>
            <p className="text-text-sub text-sm">정보를 공유해 주세요.</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          rounded="full"
          onClick={handleClickButton}
          disabled={isEditing && !content.trim()}
        >
          {isEditing ? '등록하기' : '답변하기'}
        </Button>
      </div>

      {isEditing && (
        <div className="mt-4">
          <TipTabEditor
            content={content}
            contentChange={(value) => setContent(value ?? '')}
          />
        </div>
      )}
    </section>
  )
}
