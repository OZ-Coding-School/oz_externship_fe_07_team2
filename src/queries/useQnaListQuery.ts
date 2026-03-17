import { getQnaList } from '@/api'
import type { GetQnaListParams } from '@/types'
import { useQuery } from '@tanstack/react-query'

export default function useQnaListQuery(params: GetQnaListParams) {
  return useQuery({
    queryKey: ['qna-list', params],
    queryFn: () => getQnaList(params),
  })
}
