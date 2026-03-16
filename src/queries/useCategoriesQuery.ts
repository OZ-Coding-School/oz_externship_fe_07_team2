import { getCategories } from '@/api'
import { useQuery } from '@tanstack/react-query'

export default function useCategoriesQuery() {
  return useQuery({
    queryKey: ['qna-categories'],
    queryFn: getCategories,
    // 컴포넌트에서는 응답 객체 전체 대신 실제로 필요한 categories 배열만 다룬다.
    select: (data) => data.categories,
  })
}
