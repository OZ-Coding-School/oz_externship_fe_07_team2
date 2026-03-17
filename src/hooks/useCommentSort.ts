import { useMemo, useState } from 'react'

import type { QnaAnswer } from '@/types'

type Comment = QnaAnswer['comments'][number]
export type SortType = 'latest' | 'oldest'

type SortOption = {
  label: string
  value: SortType
}

export function useCommentSort(comments: Comment[]) {
  const [sortType, setSortType] = useState<SortType>('latest')

  const sortOptions: SortOption[] = [
    { label: '최신순', value: 'latest' },
    { label: '오래된순', value: 'oldest' },
  ]

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      if (sortType === 'latest') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      }

      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })
  }, [comments, sortType])

  return {
    sortType,
    setSortType,
    sortOptions,
    sortedComments,
  }
}
