import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTES_PATHS } from '@/constants/url'
import {
  useCategoriesQuery,
  useCreateQuestionMutation,
  useQnaDetailQuery,
  useUpdateQuestionMutation,
} from '@/queries'
import type { SelectedCategory } from '@/shared/CategoryDropdown'
import { findSelectedCategory } from '@/utils'

export function useQnaForm(mode: 'create' | 'edit', questionId?: number) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null)
  const [popupMessage, setPopupMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const { data: categories = [] } = useCategoriesQuery()
  const { data: questionDetail } = useQnaDetailQuery(questionId ?? 0, {
    enabled: mode === 'edit' && !!questionId,
  })
  /**
   * eidt 모드 진입 시
   * fetch된 데이터로 title, content 초기값 세팅
   */
  useEffect(() => {
    if (mode === 'edit' && questionDetail) {
      setTitle(questionDetail.title)
      setContent(questionDetail.content)
    }
  }, [mode, questionDetail])

  /**
   * edit 모드 초기 카테고리 선택값
   * - categories/questionDetail 미준비 시 undefined
   */
  const initialCategory = useMemo(() => {
    if (mode !== 'edit' || !questionDetail || categories.length === 0) {
      return undefined
    }
    return findSelectedCategory(categories, questionDetail.category.id)
  }, [mode, questionDetail, categories])

  /*
   * initialCategory 계산 완료 후 selectedCategory에 반영
   */
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const {
    mutate: createQuestion,
    isPending: isCreatePending,
    isError: isCreateError,
  } = useCreateQuestionMutation()
  const {
    mutate: updateQuestion,
    isPending: isUpdatePending,
    isError: isUpdateError,
  } = useUpdateQuestionMutation(questionId ?? 0)

  const isPending = isCreatePending || isUpdatePending
  const isError = isCreateError || isUpdateError
  const categoryId = selectedCategory?.small?.id

  /**
   * 폼 제출 전 유효성 검사
   * @returns 에러 메시지 문자열 | 통과 시 null
   */
  const validate = (): string | null => {
    if (!categoryId) return '카테고리를 선택해 주세요.'
    if (!title.trim()) return '제목을 입력해 주세요.'
    if (!content.trim() || content === '<p></p>' || content === '<p><br></p>')
      return '질문 내용을 입력해 주세요.'
    return null
  }

  /**
   * 등록/저장 버튼 클릭 핸들러
   * - validation 실패 시 팝업으로 에러 메시지 표시
   * - create 모드: 질문 등록 후 QNA_LIST로 이동
   * - edit 모드: 질문 수정 후 해당 질문 상세 페이지로 이동
   */
  const handleSubmit = () => {
    const error = validate()
    if (error) return setPopupMessage(error)

    if (mode === 'create') {
      createQuestion(
        { title, content, category: categoryId! },
        { onSuccess: () => navigate(ROUTES_PATHS.QNA_LIST) }
      )
    } else {
      updateQuestion(
        { title, content, category: categoryId! },
        { onSuccess: () => navigate(ROUTES_PATHS.QNA_DETAIL_URL(questionId!)) }
      )
    }
  }
  return {
    // 상태
    title,
    setTitle,
    content,
    setContent,
    popupMessage,
    setPopupMessage,
    // 데이터
    categories,
    questionDetail,
    initialCategory,
    isPending,
    isError,
    // 핸들러
    handleSubmit,
    handleCategorySelect: setSelectedCategory,
  }
}
