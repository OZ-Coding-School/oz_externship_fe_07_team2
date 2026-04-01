import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateQuestion } from '@/api'
import type { QnaListResponse } from '@/features/qna-list'
import { useToast } from '@/hooks/useToast'
import type { UpdateQuestionRequest } from '@/types'

export function useUpdateQuestionMutation(questionId: number) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateQuestionRequest) =>
      updateQuestion(questionId, data),
    onSuccess: (updatedQuestion) => {
      queryClient.setQueryData(['qna-detail', questionId], updatedQuestion)
      queryClient.setQueriesData<QnaListResponse>(
        { queryKey: ['qna-list'] },
        (previous) => {
          if (!previous) {
            return previous
          }

          const nextUpdatedAt =
            updatedQuestion.update_at ??
            updatedQuestion.updated_at ??
            updatedQuestion.created_at

          return {
            ...previous,
            results: previous.results.map((question) =>
              question.id === questionId
                ? {
                    ...question,
                    title: updatedQuestion.title,
                    category: updatedQuestion.category,
                    content_preview: updatedQuestion.content,
                    update_at: nextUpdatedAt,
                    updated_at: nextUpdatedAt,
                  }
                : question
            ),
          }
        }
      )
      queryClient.invalidateQueries({ queryKey: ['qna-list'] })
      queryClient.invalidateQueries({ queryKey: ['qna-detail', questionId] })
      success('질문이 수정되었습니다.')
    },
    onError: () => {
      error('질문 수정에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
