import { useMutation } from '@tanstack/react-query'

import { updateQuestion } from '@/api'
import { useToast } from '@/hooks/useToast'
import type { UpdateQuestionRequest } from '@/types'

export function useUpdateQuestionMutation(questionId: number) {
  const { success, error } = useToast()

  return useMutation({
    mutationFn: (data: UpdateQuestionRequest) =>
      updateQuestion(questionId, data),
    onSuccess: () => {
      success('질문이 수정되었습니다.')
    },
    onError: () => {
      error('질문 수정에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
