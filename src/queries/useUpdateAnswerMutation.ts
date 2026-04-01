import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAnswer } from '@/api/answer'
import { useToast } from '@/hooks/useToast'
import type { CreateAnswerRequest, CreateAnswerResponse } from '@/types'

type UpdateAnswerParams = {
  questionId: number
  answerId: number
} & CreateAnswerRequest

export default function useUpdateAnswerMutation() {
  const queryClient = useQueryClient()
  const { error } = useToast()

  return useMutation<CreateAnswerResponse, Error, UpdateAnswerParams>({
    mutationFn: ({ answerId, content, image_urls }) =>
      updateAnswer(answerId, { content, image_urls }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
      queryClient.invalidateQueries({
        queryKey: ['qna-list'],
      })
    },
    onError: () => {
      error('답변 수정에 실패했습니다. 다시 시도해주세요.')
    },
  })
}
