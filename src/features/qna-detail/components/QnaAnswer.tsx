import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { createAnswer } from '@/api'
import { Avatar, Button, TipTabEditor } from '@/components'

type QnaAnswerProps = {
  nickname: string
  questionId: number
}

export default function QnaAnswer({ nickname, questionId }: QnaAnswerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const isEmptyContent = !content.replace(/<[^>]*>/g, '').trim()

  const handleButtonClick = async () => {
    if (!isEditing) {
      setIsEditing(true)
      return
    }

    if (isEmptyContent || isSubmitting) return

    try {
      setIsSubmitting(true)

      await createAnswer(questionId, {
        content,
        image_urls: [],
      })

      setIsEditing(false)
      setContent('')
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', questionId],
      })
    } catch {
      alert('답변 등록에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
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
          onClick={handleButtonClick}
          disabled={isSubmitting || (isEditing && isEmptyContent)}
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
