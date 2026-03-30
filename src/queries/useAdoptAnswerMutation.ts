import { useMutation, useQueryClient } from '@tanstack/react-query'

import { adoptAnswer } from '@/api/answer'
import { useToast } from '@/hooks/useToast'

export default function useAdoptAnswerMutation() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation<void, Error, { answerId: number; questionId: number }>({
    mutationFn: ({ answerId }) => adoptAnswer(answerId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
      success('답변이 채택되었습니다.')
    },
    onError: () => {
      error('채택에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
