import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateQuestion } from '@/api'
import type { QnaListItem, QnaListResponse } from '@/features/qna-list'
import { useToast } from '@/hooks/useToast'
import type { GetQnaListParams, UpdateQuestionRequest } from '@/types'

export function useUpdateQuestionMutation(questionId: number) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateQuestionRequest) =>
      updateQuestion(questionId, data),
    onSuccess: (updatedQuestion) => {
      const nextUpdatedAt =
        updatedQuestion.update_at ??
        updatedQuestion.updated_at ??
        updatedQuestion.created_at

      const listQueries = queryClient.getQueriesData<QnaListResponse>({
        queryKey: ['qna-list'],
      })

      for (const [queryKey, previous] of listQueries) {
        if (!previous) {
          continue
        }

        const params = queryKey[1] as GetQnaListParams | undefined
        const nextResults = previous.results.map((question) =>
          question.id === questionId
            ? {
                ...question,
                title: updatedQuestion.title ?? question.title,
                category: updatedQuestion.category ?? question.category,
                content_preview:
                  updatedQuestion.content ?? question.content_preview,
                update_at: nextUpdatedAt,
                updated_at: nextUpdatedAt,
              }
            : question
        )

        const sortedResults =
          (params?.sort ?? 'latest') === 'latest'
            ? [...nextResults].sort(
                (a: QnaListItem, b: QnaListItem) =>
                  new Date(
                    b.update_at ?? b.updated_at ?? b.created_at
                  ).getTime() -
                  new Date(
                    a.update_at ?? a.updated_at ?? a.created_at
                  ).getTime()
              )
            : nextResults

        queryClient.setQueryData<QnaListResponse>(queryKey, {
          ...previous,
          results: sortedResults,
        })
      }

      queryClient.invalidateQueries({ queryKey: ['qna-detail', questionId] })
      queryClient.invalidateQueries({ queryKey: ['qna-list'] })
      success('질문이 수정되었습니다.')
    },
    onError: () => {
      error('질문 수정에 실패했습니다. 다시 시도해 주세요.')
    },
  })
}
