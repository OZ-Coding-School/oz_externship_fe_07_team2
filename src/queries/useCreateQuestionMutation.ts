import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { createQuestion } from '@/api'

export default function useCreateQuestionMutation() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: createQuestion,
    onError: () => {
      // TODO: 토스트 컴포넌트 생기면 교체 예정
      setErrorMessage('질문 등록에 실패했습니다. 다시 시도해 주세요.')
    },
  })

  return { ...mutation, errorMessage, clearError: () => setErrorMessage(null) }
}
