import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adoptAnswer } from '@/api/answer'

export default function useAdoptAnswerMutation() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { answerId: number }>({
    mutationFn: ({ answerId }) => adoptAnswer(answerId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.answerId],
      })
    },
  })
}
