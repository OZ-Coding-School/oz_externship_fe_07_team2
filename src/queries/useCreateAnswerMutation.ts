import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnswer } from '@/api'
import { useToast } from '@/hooks/useToast'

type CreateAnswerParams = {
  questionId: number
} & CreateAnswerRequest

export default function useCreateAnswerMutation() {
  const queryClient = useQueryClient()
  const { error } = useToast()

  return useMutation<CreateAnswerResponse, Error, CreateAnswerParams>({
    mutationFn: ({ questionId, content, image_urls }) =>
      createAnswer(questionId, { content, image_urls }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
    },
    onError: () => {
      error('답변 등록에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
