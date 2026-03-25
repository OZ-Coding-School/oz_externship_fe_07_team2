import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'

import { createQuestion } from '@/api'
import { useToast } from '@/hooks/useToast'

export default function useCreateQuestionMutation() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { success, error } = useToast()

  const mutation = useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      success('질문이 등록되었습니다.')
    },
    onError: () => {
      error('질문 등록에 실패했습니다. 다시 시도해 주세요.')
    },
  })

  return { ...mutation, errorMessage, clearError: () => setErrorMessage(null) }
}
