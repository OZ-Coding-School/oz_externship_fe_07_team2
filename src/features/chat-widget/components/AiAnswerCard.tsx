import { useEffect, useState } from 'react'

import axios from 'axios'
import { ChevronDown } from 'lucide-react'

import { Button, Loading } from '@/components'
import AiMarkdownRenderer from '@/components/common/markdown/AiMarkdownRenderer'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'
import useExpandableContent from '@/features/chat-widget/hooks/useExpandableContent'
import {
  getStoredAiAnswer,
  setStoredAiAnswer,
} from '@/features/chat-widget/lib/aiAnswerStorage'
import { useToast } from '@/hooks/useToast'
import { useAiAnswerQuery, useCreateAiAnswerMutation } from '@/queries'
import { useAiAnswerUiStore, useAuthStore } from '@/store'
import { useModalStore } from '@/store/useModalStore'
import type { QnaAiAnswer, QnaQuestionDetail } from '@/types'

import BubbleTail from './BubbleTail'
import ChatBadge from './ChatBadge'
import ExpandableSection from './ExpandableSection'

type AiAnswerCardProps = {
  question: QnaQuestionDetail
}

const COLLAPSED_ANSWER_HEIGHT = 320

export default function AiAnswerCard({ question }: AiAnswerCardProps) {
  const { chat } = useChatWidgetContext()
  const isEnrolled = useAuthStore((state) => state.isEnrolled())
  const openUnauthorized = useModalStore((state) => state.openUnauthorized)
  const openByQuestionId = useAiAnswerUiStore((state) => state.openByQuestionId)
  const openDetail = useAiAnswerUiStore((state) => state.openDetail)
  const closeDetail = useAiAnswerUiStore((state) => state.closeDetail)
  const { mutateAsync, isPending } = useCreateAiAnswerMutation()
  const { error: showErrorToast } = useToast()
  const initialAiAnswer = question.ai_answer ?? getStoredAiAnswer(question.id)
  const [createdAiAnswer, setCreatedAiAnswer] = useState<QnaAiAnswer | null>(
    initialAiAnswer
  )
  const {
    data: queriedAiAnswer,
    refetch,
    isFetching,
  } = useAiAnswerQuery({
    questionId: question.id,
    initialData: initialAiAnswer,
  })
  const aiAnswer = queriedAiAnswer ?? createdAiAnswer
  const isOpen = Boolean(aiAnswer) && (openByQuestionId[question.id] ?? true)
  // TODO: 질문 수정 기준 업데이트 시간 변경 후 주석 해제
  // const shouldShowOutdatedNotice =
  //   question.updated_at != null &&
  //   aiAnswer?.created_at != null &&
  //   new Date(question.updated_at).getTime() >
  //     new Date(aiAnswer.created_at).getTime()
  const shouldShowOutdatedNotice = false

  const {
    contentRef: answerContentRef,
    isExpanded: isAnswerExpanded,
    setIsExpanded: setIsAnswerExpanded,
    isOverflowing: isAnswerOverflowing,
  } = useExpandableContent({
    content: aiAnswer?.output,
    collapsedHeightPx: COLLAPSED_ANSWER_HEIGHT,
    enabled: isOpen,
  })

  useEffect(() => {
    if (!aiAnswer) {
      return
    }

    openDetail(question.id)
  }, [aiAnswer, openDetail, question.id])

  const handleToggleDetail = async () => {
    if (!isEnrolled) {
      openUnauthorized()
      return
    }

    if (isFetching || isPending) {
      return
    }

    if (isOpen) {
      closeDetail(question.id)
      return
    }

    if (aiAnswer) {
      openDetail(question.id)
      return
    }

    // refetch는 reject 대신 result.status/result.error로 결과를 반환한다.
    const result = await refetch()

    if (result.status === 'success' && result.data) {
      openDetail(question.id)
      return
    }

    if (result.status !== 'error') {
      return
    }

    const lookupError = result.error
    const errorDetail = axios.isAxiosError(lookupError)
      ? lookupError.response?.data?.error_detail
      : undefined
    const status = axios.isAxiosError(lookupError)
      ? lookupError.response?.status
      : null

    if (axios.isAxiosError(lookupError)) {
      console.error('AI answer lookup failed', {
        method: 'GET',
        url: lookupError.config?.url,
        status: lookupError.response?.status,
        data: lookupError.response?.data,
      })
    }

    if (status === 404) {
      try {
        const nextAiAnswer = await mutateAsync(question.id)

        setCreatedAiAnswer(nextAiAnswer)
        setStoredAiAnswer(nextAiAnswer)
        openDetail(question.id)
        return
      } catch (createError) {
        const createErrorDetail = axios.isAxiosError(createError)
          ? createError.response?.data?.error_detail
          : undefined

        if (axios.isAxiosError(createError)) {
          console.error('AI answer creation failed', {
            method: 'GET',
            url: createError.config?.url,
            status: createError.response?.status,
            data: createError.response?.data,
          })
        }

        showErrorToast(
          createErrorDetail ??
            'AI 답변을 불러오지 못했습니다. 다시 시도해주세요.'
        )
        return
      }
    }

    if (status === 409) {
      console.warn('AI answer already exists', {
        questionId: question.id,
        errorDetail,
      })
      return
    }

    showErrorToast(
      errorDetail ?? 'AI 답변을 불러오지 못했습니다. 다시 시도해주세요.'
    )
  }

  const handleOpenChat = () => {
    if (!isEnrolled) {
      openUnauthorized()
      return
    }

    if (!aiAnswer) {
      return
    }

    chat.setEntryData({
      questionId: question.id,
      questionTitle: question.title,
      questionContent: question.content,
      answerContent: aiAnswer.output,
    })
    chat.setEntryMode(true)
    chat.open()
  }

  return (
    <div className="my-8 flex w-full flex-col items-stretch gap-4 md:my-11 md:flex-row md:items-start md:gap-8">
      <ChatBadge size="lg" className="hidden md:flex md:h-15 md:w-15" />

      {!isOpen ? (
        <div className="shadow-box relative w-full min-w-0 flex-1 rounded-xl bg-white px-5 pt-4 pb-5 sm:px-6 sm:pt-5.25 sm:pb-6.75 md:max-w-178.5">
          {/* 말풍선 꼬리  */}
          <BubbleTail color="#fff" className="hidden md:block" />
          <div>
            <p className="text-text-chatbot text-base font-light sm:text-lg">
              {question.title}
            </p>

            <Button
              variant="text"
              type="button"
              onClick={handleToggleDetail}
              disabled={isFetching || isPending}
              className="text-text-sub disabled:text-text-sub gap-2 px-0 text-left font-bold hover:bg-transparent disabled:bg-transparent"
            >
              <span>질문에 대한</span>
              <span className="inline-flex items-center gap-1">
                <ChatBadge size="xs" />
                <span className="text-gradient-brand">AI OZ</span>
              </span>
              {isFetching || isPending ? (
                <span className="inline-flex items-center gap-2">
                  <span>의 답변 생성 중</span>
                  <span className="scale-75">
                    <Loading />
                  </span>
                </span>
              ) : (
                <>
                  <span>의 답변 보기</span>
                  <ChevronDown size={20} />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="shadow-box bg-primary-100/40 relative min-w-0 flex-1 rounded-xl p-5 sm:p-6 md:p-8">
          {/* 말풍선 꼬리  */}
          <BubbleTail color="#f9f5fa" className="hidden md:block" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <ChatBadge size="xs" />
              <span className="text-gradient-brand">AI OZ</span>
              {shouldShowOutdatedNotice && (
                <span className="text-primary-500 text-xs font-semibold">
                  수정 전 질문 기준 답변입니다.
                </span>
              )}
            </div>
            {aiAnswer?.output && (
              <div className="mb-1">
                <ExpandableSection
                  collapsedClassName="max-h-80"
                  isOverflowing={isAnswerOverflowing}
                  isExpanded={isAnswerExpanded}
                  onToggle={() => setIsAnswerExpanded((prev) => !prev)}
                >
                  <div ref={answerContentRef} className="relative">
                    <AiMarkdownRenderer
                      content={aiAnswer.output}
                      className="text-text-chatbot md:text-md text-sm font-light"
                    />
                  </div>
                </ExpandableSection>
              </div>
            )}

            <div className="flex justify-end">
              <Button rounded={'full'} type="button" onClick={handleOpenChat}>
                추가 질문하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
