import { useState, useMemo } from 'react'
import type { QnaAnswer } from '@/pages/qna-detail/types'

type Comment = QnaAnswer['comments'][number]

export function useCommentSort(comments: Comment[]) {
  const [sortType, setSortType] = useState<'latest' | 'oldest'>('latest')

  const sortOptions = [
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
