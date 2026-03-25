import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAnswer } from '@/api/answer'
import type { CreateAnswerRequest, CreateAnswerResponse } from '@/types'

type UpdateAnswerParams = {
  questionId: number
  answerId: number
} & CreateAnswerRequest

export default function useUpdateAnswerMutation() {
  const queryClient = useQueryClient()

  return useMutation<CreateAnswerResponse, Error, UpdateAnswerParams>({
    mutationFn: ({ questionId, answerId, content, image_urls }) =>
      updateAnswer(questionId, answerId, { content, image_urls }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
    },
  })
}
