import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getAiAnswer } from '@/api'
import { setStoredAiAnswer } from '@/features/chat-widget/lib/aiAnswerStorage'
import type { QnaAiAnswer } from '@/types'

type UseAiAnswerQueryOptions = {
  questionId: number
  // 서버 응답 전까지 사용할 초기 AI 답변입니다.
  initialData?: QnaAiAnswer | null
}

// AI 답변은 버튼 클릭 시점에만 조회되므로 자동 실행을 막고 수동 refetch로 사용합니다.
export default function useAiAnswerQuery({
  questionId,
  initialData = null,
}: UseAiAnswerQueryOptions) {
  const query = useQuery({
    queryKey: ['qna-ai-answer', questionId],
    queryFn: () => getAiAnswer(questionId),
    // 답변 카드 열기 전에는 요청하지 않습니다.
    enabled: false,
    retry: false,
    staleTime: Infinity,
    ...(initialData ? { initialData } : {}),
  })

  useEffect(() => {
    if (!query.data) {
      return
    }

    // 조회한 답변은 로컬에도 저장해 상세 재진입 시 재사용합니다.
    setStoredAiAnswer(query.data)
  }, [query.data])

  return query
}
