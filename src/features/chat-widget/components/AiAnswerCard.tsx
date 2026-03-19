import { Button } from '@/components'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'

import ChatBadge from './ChatBadge'

/**
 * Todo: detail 페이지로 이동 예정 임시용
 */

const PREVIEW_TEXT =
  'AND 연산자는 두 개 이상의 조건이 모두 참(True)일 때만 결과를 참으로 처리합니다.'

const DETAIL_TEXT = `즉, 하나라도 거짓(False)이면 결과는 거짓이 됩니다.

예를 들어 로그인 시 아이디와 비밀번호가 모두 일치해야 성공하는 경우에 사용할 수 있습니다.

1. 여러 조건을 동시에 만족해야 하는지 확인할 때
2. 데이터를 필터링하거나 범위를 지정할 때`

export default function AiAnswerCard() {
  const { chat, detail } = useChatWidgetContext()

  const handleToggleDetail = () => {
    if (detail.isOpen) {
      detail.close()
      return
    }

    detail.open()
  }

  const handleOpen = () => {
    chat.setEntryMode(true)
    chat.open()
  }

  return (
    <div className="fixed right-28 bottom-10 z-50 flex max-w-156 flex-col items-end gap-4">
      <div className="flex items-start gap-3 self-start">
        <ChatBadge size="sm" />
        <div className="shadow-box w-136 rounded-2xl border border-[#E7E7E7] bg-[#FCF8FF] px-5 py-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-primary-400 text-sm font-semibold">
              AI OZ
            </span>
          </div>
          <p
            className={`text-text-chatbot text-sm font-light ${
              detail.isOpen ? 'mb-4 whitespace-pre-line' : 'line-clamp-2'
            }`}
          >
            {detail.isOpen ? DETAIL_TEXT : PREVIEW_TEXT}
          </p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full bg-white"
              onClick={handleToggleDetail}
            >
              {detail.isOpen ? '접기' : '자세히 보기'}
            </Button>
            {detail.isOpen ? (
              <Button
                type="button"
                className="h-8 rounded-full px-4 text-xs"
                onClick={handleOpen}
              >
                추가 질문하기
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
