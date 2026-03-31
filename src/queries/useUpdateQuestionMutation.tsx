import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateQuestion } from '@/api'
import { useToast } from '@/hooks/useToast'
import type { UpdateQuestionRequest } from '@/types'

export function useUpdateQuestionMutation(questionId: number) {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: (data: UpdateQuestionRequest) =>
      updateQuestion(questionId, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['qna-detail', questionId], data)
      queryClient.invalidateQueries({ queryKey: ['qna-detail', questionId] })
      queryClient.invalidateQueries({ queryKey: ['qna-list'] })
      success('질문이 수정되었습니다.')
    },
    onError: () => {
      error('질문 수정에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
