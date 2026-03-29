import { useEffect, useState } from 'react'

import { useCreateAnswerCommentMutation } from '@/queries'
import { useAuthStore } from '@/store'
import type { CreateAnswerCommentResponse, QnaAnswer } from '@/types'

type UseAnswerCommentFormProps = {
  questionId: number
  answerId: number
  initialComments: QnaAnswer['comments']
}

export function useAnswerCommentForm({
  questionId,
  answerId,
  initialComments,
}: UseAnswerCommentFormProps) {
  const currentUser = useAuthStore((s) => s.user)
  const [commentText, setCommentText] = useState('')
  const [localComments, setLocalComments] = useState(initialComments)

  const { mutate: createCommentMutate, isPending: isCommentPending } =
    useCreateAnswerCommentMutation()

  useEffect(() => {
    setLocalComments(initialComments)
  }, [initialComments])

  const isEmptyComment = !commentText.trim()
  const isSubmitDisabled = isEmptyComment || isCommentPending
  const commentButtonLabel = isCommentPending ? '등록 중...' : '등록'

  const getCommentAuthor = (data: CreateAnswerCommentResponse) => {
    if (data.author) {
      return {
        id: data.author.id,
        nickname: data.author.nickname,
        profile_img_url: data.author.profile_img_url,
      }
    }

    if (currentUser) {
      return {
        id: currentUser.id,
        nickname: currentUser.nickname,
        profile_img_url: currentUser.profile_img_url ?? null,
      }
    }

    return {
      id: 0,
      nickname: '알 수 없음',
      profile_img_url: null,
    }
  }

  const handleCreateCommentSuccess = (data: CreateAnswerCommentResponse) => {
    const commentAuthor = getCommentAuthor(data)

    setLocalComments((prev) => [
      ...prev,
      {
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        author: commentAuthor,
      },
    ])
    setCommentText('')
  }

  const handleSubmitComment = () => {
    const content = commentText.trim()

    if (!content || !currentUser) return

    createCommentMutate(
      {
        questionId,
        answerId,
        content,
        image_urls: [],
      },
      {
        onSuccess: handleCreateCommentSuccess,
      }
    )
  }

  return {
    commentText,
    setCommentText,
    localComments,
    isCommentPending,
    isEmptyComment,
    isSubmitDisabled,
    commentButtonLabel,
    handleSubmitComment,
  }
}
