import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createQuestion } from '@/api'
import { useToast } from '@/hooks/useToast'

export default function useCreateQuestionMutation() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  const mutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qna-list'] })
      success('질문이 등록되었습니다.')
    },
    onError: () => {
      error('질문 등록에 실패했습니다. 다시 시도해 주세요.')
    },
  })

  return mutation
}
