import { useEffect, useState } from 'react'

import { Avatar, Button, TipTabEditor } from '@/components'
import useCreateAnswerMutation from '@/queries/useCreateAnswerMutation'
import useUpdateAnswerMutation from '@/queries/useUpdateAnswerMutation'
import { useAuthStore } from '@/store/useAuthStore'
import type { QnaAnswer as QnaAnswerType } from '@/types'

import AnswerCard from './AnswerCard'

type QnaAnswerProps = {
  questionId: number
  myAnswer: QnaAnswerType | null
}

export default function QnaAnswer({ questionId, myAnswer }: QnaAnswerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState('')

  const user = useAuthStore((s) => s.user)
  const { mutate: createMutate, isPending: isCreating } =
    useCreateAnswerMutation()
  const { mutate: updateMutate, isPending: isUpdating } =
    useUpdateAnswerMutation()

  const isPending = isCreating || isUpdating
  const isEmptyContent = !content.replace(/<[^>]*>/g, '').trim()

  useEffect(() => {
    if (myAnswer && !isEditing) {
      setContent('')
    }
  }, [myAnswer, isEditing])

  const handleEditClick = () => {
    if (myAnswer) {
      // 수정 모드: 기존 내용을 에디터에 로드
      setContent(myAnswer.content)
      setIsEditing(true)
    } else {
      // 신규 모드: 에디터 오픈
      setIsEditing(true)
    }
  }

  const handleSubmit = () => {
    if (isEmptyContent || isPending) return

    if (myAnswer) {
      // 기존 답변 수정
      updateMutate(
        {
          questionId,
          answerId: myAnswer.id,
          content,
          image_urls: [],
        },
        {
          onSuccess: () => {
            setIsEditing(false)
            setContent('')
          },
        }
      )
    } else {
      // 신규 답변 등록
      createMutate(
        {
          questionId,
          content,
          image_urls: [],
        },
        {
          onSuccess: () => {
            setIsEditing(false)
            setContent('')
          },
        }
      )
    }
  }

  if (myAnswer && !isEditing) {
    return (
      <AnswerCard
        questionId={questionId}
        answer={myAnswer}
        currentUserId={user?.id ?? null}
        onEdit={handleEditClick}
      />
    )
  }

  return (
    <section className="bg-surface-default border-border-line mt-6 rounded-2xl border px-5 py-4">
      <div className="m-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Avatar size="lg" />

          <div>
            <p className="text-text-highlight text-sm font-semibold">
              {user?.nickname ?? '회원'} 님,
            </p>
            <p className="text-text-sub text-sm">
              {myAnswer ? '' : '정보를 공유해 주세요.'}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              rounded="full"
              onClick={() => {
                setIsEditing(false)
                setContent('')
              }}
              disabled={isPending}
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="md"
              rounded="full"
              onClick={handleSubmit}
              disabled={isPending || isEmptyContent}
            >
              {isPending ? '처리 중...' : myAnswer ? '수정하기' : '답변하기'}
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="md"
            rounded="full"
            onClick={handleEditClick}
          >
            답변하기
          </Button>
        )}
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
