import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import { getQuestionDetail } from '@/api'
import type { QnaQuestionDetail } from '@/types'

type QnaDetailQueryOptions = Omit<
  UseQueryOptions<
    QnaQuestionDetail,
    Error,
    QnaQuestionDetail,
    ['qna-detail', number]
  >,
  'queryKey' | 'queryFn'
>

export default function useQnaDetailQuery(
  questionId: number,
  options?: QnaDetailQueryOptions
) {
  const isValidQuestionId = Number.isFinite(questionId) && questionId > 0

  return useQuery({
    ...options,
    queryKey: ['qna-detail', questionId],
    queryFn: () => getQuestionDetail(questionId),
    enabled: isValidQuestionId && (options?.enabled ?? true),
    staleTime: options?.staleTime ?? 1000 * 60,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnReconnect: options?.refetchOnReconnect ?? false,
  })
}
