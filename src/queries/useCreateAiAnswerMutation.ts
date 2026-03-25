import { useMutation } from '@tanstack/react-query'

import { getAiAnswer } from '@/api'

export default function useCreateAiAnswerMutation() {
  return useMutation({
    mutationFn: (questionId: number) => getAiAnswer(questionId),
  })
}
