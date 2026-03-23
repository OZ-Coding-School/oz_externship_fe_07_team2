import { ChevronDown } from 'lucide-react'

import { Button } from '@/components'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'
import type { QnaQuestionDetail } from '@/types'

import BubbleTail from './BubbleTail'
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
      <ChatBadge size="lg" />

      {!detail.isOpen ? (
        <div className="shadow-box relative w-176 rounded-xl bg-white px-6 pt-5.25 pb-6.75">
          {/* 말풍선 꼬리  */}
          <BubbleTail color="#fff" />
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
          {/* 말풍선 꼬리  */}
          <BubbleTail color="#f9f5fa" />

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
