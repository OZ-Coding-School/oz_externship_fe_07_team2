import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ChevronDown } from 'lucide-react'

import { getAiAnswer } from '@/api'
import { Button, Loading } from '@/components'
import AiMarkdownRenderer from '@/components/common/markdown/AiMarkdownRenderer'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'
import useExpandableContent from '@/features/chat-widget/hooks/useExpandableContent'
import { useToast } from '@/hooks/useToast'
import { useAuthStore } from '@/store'
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
  const queryClient = useQueryClient()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const openUnauthorized = useModalStore((state) => state.openUnauthorized)
  const { error: showErrorToast } = useToast()
  const [createdAiAnswer, setCreatedAiAnswer] = useState<QnaAiAnswer | null>(
    null
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const aiAnswer = question.ai_answer ?? createdAiAnswer
  const questionUpdatedAt = question.update_at ?? question.updated_at
  const hasQuestionBeenEdited =
    questionUpdatedAt != null &&
    new Date(questionUpdatedAt).getTime() >
      new Date(question.created_at).getTime()

  // 실제로 질문이 수정된 뒤, 그 수정 시각이 AI 답변 생성 시각보다 늦을 때만 안내 문구를 표시한다.
  const shouldShowOutdatedNotice =
    hasQuestionBeenEdited &&
    aiAnswer?.created_at != null &&
    new Date(questionUpdatedAt!).getTime() >
      new Date(aiAnswer.created_at).getTime()

  const renderDefaultButtonLabel = (trailingText: string) => (
    <>
      <span>질문에 대한</span>
      <span className="inline-flex items-center gap-1">
        <ChatBadge size="xs" />
        <span className="text-gradient-brand">AI OZ</span>
      </span>
      <span>{trailingText}</span>
    </>
  )

  const {
    contentRef: answerContentRef,
    isExpanded: isAnswerExpanded,
    setIsExpanded: setIsAnswerExpanded,
    isOverflowing: isAnswerOverflowing,
  } = useExpandableContent({
    content: aiAnswer?.output,
    collapsedHeightPx: COLLAPSED_ANSWER_HEIGHT,
    enabled: isOpen && Boolean(aiAnswer),
  })

  const loadAiAnswer = async () => {
    if (isLoading) {
      return
    }

    if (aiAnswer) {
      setIsOpen(true)
      return
    }

    setIsLoading(true)

    try {
      const nextAiAnswer = await getAiAnswer(question.id)
      setCreatedAiAnswer(nextAiAnswer)
      setIsOpen(true)
      queryClient.setQueryData<QnaQuestionDetail>(
        ['qna-detail', question.id],
        (prev) => (prev ? { ...prev, ai_answer: nextAiAnswer } : prev)
      )
    } catch (error) {
      const errorDetail = axios.isAxiosError(error)
        ? error.response?.data?.error_detail
        : undefined

      if (axios.isAxiosError(error)) {
        console.error('AI answer request failed', {
          method: 'GET',
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        })
      }

      showErrorToast(
        errorDetail ?? 'AI 답변을 불러오지 못했습니다. 다시 시도해주세요.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleDetail = async () => {
    await loadAiAnswer()
  }

  const handleOpenChat = () => {
    if (!isLoggedIn) {
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
    })
    chat.setEntryMode(true)
    chat.open()
  }

  return (
    <div className="my-8 flex w-full flex-col items-stretch gap-4 md:my-11 md:flex-row md:items-start md:gap-8">
      <ChatBadge size="lg" className="hidden md:flex md:h-15 md:w-15" />

      {!isOpen || !aiAnswer ? (
        <div className="shadow-box relative w-full min-w-0 flex-1 rounded-xl bg-white px-5 pt-4 pb-5 sm:px-6 sm:pt-5.25 sm:pb-6.75 md:max-w-178.5">
          {/* 말풍선 꼬리  */}
          <BubbleTail color="#fff" className="hidden md:block" />
          <div>
            {shouldShowOutdatedNotice ? (
              <p className="text-text-sub text-sm font-light sm:text-base">
                질문 수정 전 기준 답변입니다.
              </p>
            ) : (
              <p className="text-text-chatbot text-base font-light sm:text-lg">
                {question.title}
              </p>
            )}

            <Button
              variant="text"
              type="button"
              onClick={handleToggleDetail}
              disabled={isLoading}
              className="text-text-sub disabled:text-text-sub gap-2 px-0 text-left font-bold hover:bg-transparent disabled:bg-transparent"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  {shouldShowOutdatedNotice ? (
                    <span>최초 AI 답변 생성 중</span>
                  ) : (
                    renderDefaultButtonLabel('의 답변 생성 중')
                  )}
                  <span className="scale-75">
                    <Loading />
                  </span>
                </span>
              ) : (
                <>
                  {shouldShowOutdatedNotice ? (
                    <span>최초 AI 답변 보기</span>
                  ) : (
                    renderDefaultButtonLabel('의 답변 보기')
                  )}
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

            <div className="flex items-center gap-2 self-end">
              <Button
                variant="primary"
                size="sm"
                rounded="full"
                onClick={handleOpenChat}
              >
                추가 질문하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
