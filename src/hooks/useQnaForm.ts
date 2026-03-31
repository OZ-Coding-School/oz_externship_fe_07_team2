import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { ROUTES_PATHS } from '@/constants'
import { ERROR_MESSAGES } from '@/constants/message'
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
  const [imageUrls, setImageUrls] = useState<string[]>([])
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
    if (!categoryId) return ERROR_MESSAGES.CATEGORY_REQUIRED
    if (!title.trim()) return ERROR_MESSAGES.TITLE_REQUIRED
    if (!content.trim() || content === '<p></p>' || content === '<p><br></p>')
      return ERROR_MESSAGES.CONTENT_REQUIRED
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
        { title, content, category_id: categoryId!, image_urls: imageUrls },
        {
          onSuccess: () => navigate(ROUTES_PATHS.QNA_LIST),
        }
      )
    } else {
      updateQuestion(
        { title, content, category_id: categoryId!, image_urls: imageUrls },
        {
          onSuccess: () =>
            navigate(ROUTES_PATHS.QNA_DETAIL_URL(questionId!), {
              state: { updated: true },
            }),
        }
      )
    }
  }

  /**
   * 이미지 업로드 완료 후 URL을 imageUrls 상태에 추가
   * - 질문 등록/수정 시 image_urls 필드에 포함됨
   */
  const handleImageUpload = (imgUrl: string) => {
    setImageUrls((prev) => [...prev, imgUrl])
  }

  return {
    // 상태
    title,
    setTitle,
    content,
    setContent,
    popupMessage,
    setPopupMessage,
    imageUrls,
    // 데이터
    categories,
    questionDetail,
    initialCategory,
    isPending,
    isError,
    // 핸들러
    handleSubmit,
    handleCategorySelect: setSelectedCategory,
    handleImageUpload,
  }
}
