import { ChevronDown } from 'lucide-react'

import { Button } from '@/components'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'
import type { QnaQuestionDetail } from '@/types'

import ChatBadge from './ChatBadge'

type AiAnswerCardProps = {
  question: QnaQuestionDetail
}

export default function AiAnswerCard({ question }: AiAnswerCardProps) {
  const { chat, detail } = useChatWidgetContext()
  const aiAnswer = question.answers?.[0]

  if (!aiAnswer) {
    return null
  }

  const handleToggleDetail = () => {
    if (detail.isOpen) {
      detail.close()
      return
    }
    detail.open()
  }

  const handleOpenChat = () => {
    chat.setEntryData({
      questionId: question.id,
      questionTitle: question.title,
      questionContent: question.content,
      answerContent: aiAnswer.content,
    })
    chat.setEntryMode(true)
    chat.open()
  }

  return (
    <div className="my-11 flex gap-8">
      <ChatBadge size="sm" className="h-15 w-15" iconClassName="h-9 w-9" />

      {!detail.isOpen ? (
        <div className="shadow-box relative w-176 rounded-xl bg-white px-6 pt-5.25 pb-6.75">
          {/* tail shadow (bottom-only look) */}
          <span className="absolute top-6 -left-5 h-0 w-0 translate-y-1.5 border-t-12 border-r-20 border-b-12 border-t-transparent border-r-black/15 border-b-transparent blur-[1.5px]" />
          {/* main tail (sharp triangle) */}
          <span className="absolute top-6 -left-5 z-10 h-0 w-0 border-t-14 border-r-24 border-b-12 border-t-transparent border-r-white border-b-transparent" />
          <div>
            <p className="text-text-chatbot text-lg font-light">
              {question.title}
            </p>

            <Button
              variant="text"
              type="button"
              onClick={handleToggleDetail}
              className="text-text-sub gap-2 px-0 font-bold hover:bg-transparent"
            >
              <span>질문에 대한</span>
              <span className="inline-flex items-center gap-1">
                <ChatBadge size="xs" />
                <span className="text-gradient-brand">AI OZ</span>
              </span>
              <span>의 답변 보기</span>
              <ChevronDown size={20} />
            </Button>
          </div>
        </div>
      ) : (
        /* 답변보기 카드 */
        <div className="shadow-box bg-primary-100/40 relative w-176 rounded-xl p-8">
          {/* tail shadow (bottom-only look) */}
          <span className="absolute top-6 -left-5 h-0 w-0 translate-y-1.5 border-t-12 border-r-20 border-b-12 border-t-transparent border-r-black/15 border-b-transparent blur-[1.5px]" />
          {/* main tail (sharp triangle) */}
          <span className="border-opacity-40 absolute top-6 -left-5 z-10 h-0 w-0 border-t-14 border-r-24 border-b-12 border-t-transparent border-r-[#f9f5fa] border-b-transparent" />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-1.5">
              <ChatBadge size="xs" />
              <span className="text-gradient-brand">AI OZ</span>
            </div>
            <p className="text-text-chatbot mb-6 text-sm font-light whitespace-pre-line">
              {aiAnswer.content}
            </p>

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
