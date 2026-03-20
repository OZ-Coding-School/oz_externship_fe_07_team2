import { useMutation } from '@tanstack/react-query'

import { updateQuestion } from '@/api'
import type { UpdateQuestionRequest } from '@/types'

export function useUpdateQuestionMutation(questionId: number) {
  return useMutation({
    mutationFn: (data: UpdateQuestionRequest) =>
      updateQuestion(questionId, data),
  })
}
