import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adoptAnswer } from '@/api/answer'

export default function useAdoptAnswerMutation() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { questionId: number; answerId: number }>({
    mutationFn: ({ questionId, answerId }) => adoptAnswer(questionId, answerId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
    },
  })
}
