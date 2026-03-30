import { useState } from 'react'

import axios from 'axios'
import { ChevronDown } from 'lucide-react'

import { getAiAnswer } from '@/api'
import { Button, Loading } from '@/components'
import AiMarkdownRenderer from '@/components/common/markdown/AiMarkdownRenderer'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'
import useExpandableContent from '@/features/chat-widget/hooks/useExpandableContent'
import { useCreateAiAnswerMutation } from '@/queries'
import type { QnaAiAnswer, QnaQuestionDetail } from '@/types'

import BubbleTail from './BubbleTail'
import ChatBadge from './ChatBadge'
import ExpandableSection from './ExpandableSection'

type AiAnswerCardProps = {
  question: QnaQuestionDetail
}

const COLLAPSED_ANSWER_HEIGHT = 320

export default function AiAnswerCard({ question }: AiAnswerCardProps) {
  const { chat, detail } = useChatWidgetContext()
  const { mutateAsync, isPending } = useCreateAiAnswerMutation()
  const [aiAnswer, setAiAnswer] = useState<QnaAiAnswer | null>(null)

  const {
    contentRef: answerContentRef,
    isExpanded: isAnswerExpanded,
    setIsExpanded: setIsAnswerExpanded,
    isOverflowing: isAnswerOverflowing,
  } = useExpandableContent({
    content: aiAnswer?.output,
    collapsedHeightPx: COLLAPSED_ANSWER_HEIGHT,
    enabled: detail.isOpen,
  })

  const handleToggleDetail = async () => {
    if (isPending) {
      return
    }

    if (detail.isOpen) {
      detail.close()
      return
    }

    if (aiAnswer) {
      detail.open()
      return
    }

    try {
      const existingAiAnswer = await getAiAnswer(question.id)

      setAiAnswer(existingAiAnswer)
      detail.open()
    } catch (error) {
      const errorDetail = axios.isAxiosError(error)
        ? error.response?.data?.error_detail
        : undefined
      const status = axios.isAxiosError(error) ? error.response?.status : null

      if (axios.isAxiosError(error)) {
        console.error('AI answer lookup failed', {
          method: 'GET',
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        })
      }

      if (status === 404) {
        try {
          const createdAiAnswer = await mutateAsync(question.id)

          setAiAnswer(createdAiAnswer)
          detail.open()
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

          alert(
            createErrorDetail ??
              'AI 답변 생성에 실패했습니다. 다시 시도해주세요.'
          )
          return
        }
      }

      if (status === 409) {
        alert(errorDetail ?? '이미 AI가 답변을 생성했습니다.')
        return
      }

      alert(errorDetail ?? 'AI 답변 생성에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleOpenChat = () => {
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

      {!detail.isOpen ? (
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
              disabled={isPending}
              className="text-text-sub disabled:text-text-sub gap-2 px-0 text-left font-bold hover:bg-transparent disabled:bg-transparent"
            >
              <span>질문에 대한</span>
              <span className="inline-flex items-center gap-1">
                <ChatBadge size="xs" />
                <span className="text-gradient-brand">AI OZ</span>
              </span>
              {isPending ? (
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
        /* 답변보기 카드 */
        <div className="shadow-box bg-primary-100/40 relative max-w-full flex-1 rounded-xl p-5 sm:p-6 md:max-w-178.5 md:p-8">
          {/* 말풍선 꼬리  */}
          <BubbleTail color="#f9f5fa" className="hidden md:block" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <ChatBadge size="xs" />
              <span className="text-gradient-brand">AI OZ</span>
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
