import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnswerComment } from '@/api/answer'
import { useToast } from '@/hooks/useToast'
import type {
  CreateAnswerCommentRequest,
  CreateAnswerCommentResponse,
} from '@/types'

type CreateAnswerCommentParams = {
  questionId: number
  answerId: number
} & CreateAnswerCommentRequest

export default function useCreateAnswerCommentMutation() {
  const queryClient = useQueryClient()
  const { error } = useToast()

  return useMutation<
    CreateAnswerCommentResponse,
    Error,
    CreateAnswerCommentParams
  >({
    mutationFn: ({ answerId, content, image_urls }) =>
      createAnswerComment(answerId, { content, image_urls }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
    },
    onError: () => {
      error('댓글 등록에 실패했습니다. 다시 시도해주세요.')
    },
  })
}
