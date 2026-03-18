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
  return useQuery({
    queryKey: ['qna-detail', questionId] as ['qna-detail', number],
    queryFn: () => getQuestionDetail(questionId),
    enabled: questionId > 0 && (options?.enabled ?? true),
    ...options,
  })
}
