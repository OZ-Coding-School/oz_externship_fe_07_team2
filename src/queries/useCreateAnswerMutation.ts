import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnswer } from '@/api'

type CreateAnswerVariables = {
  questionId: number
  content: string
  image_urls: string[]
}

export default function useCreateAnswerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ questionId, content, image_urls }: CreateAnswerVariables) =>
      createAnswer(questionId, {
        content,
        image_urls,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qna-detail', variables.questionId],
      })
    },
  })
}
