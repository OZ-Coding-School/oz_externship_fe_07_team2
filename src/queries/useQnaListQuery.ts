import { useQuery } from '@tanstack/react-query'

import { getQnaList } from '@/api'
import type { GetQnaListParams } from '@/types'

export default function useQnaListQuery(params: GetQnaListParams) {
  return useQuery({
    queryKey: ['qna-list', params],
    queryFn: () => getQnaList(params),
  })
}
