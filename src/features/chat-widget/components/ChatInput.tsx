import {
  type ChangeEvent,
  type KeyboardEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'

import { SendHorizontal } from 'lucide-react'

import { Button, Textarea } from '@/components'
import { cn } from '@/utils'

type ChatInputProps = {
  onSend: (message: string) => Promise<boolean>
  isPending?: boolean
  isStreaming?: boolean
}

function ChatInput({
  onSend,
  isPending = false,
  isStreaming = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [value, setValue] = useState('')
  const maxLength = 1000 //제한글자수
  const isSendDisabled = isPending || value.trim().length === 0

  //채팅방 진입시 자동포커스
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (isStreaming) {
      return
    }

    const nextValue = e.target.value
    // 글자수 제한 로직
    if (nextValue.length <= maxLength) {
      setValue(nextValue)
    }
  }

  const submitMessage = async () => {
    const currentValue = value

    setValue('')

    const didSend = await onSend(currentValue)

    if (!didSend) {
      setValue(currentValue)
      textareaRef.current?.focus()
      return
    }

    // 전송 뒤 입력 포커스 유지
    textareaRef.current?.focus()
  }

  // textarea에서 키 입력 처리 (Enter 전송 / Shift+Enter 줄바꿈)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 입력 중(조합 중)에는 Enter로 전송되지 않게 막기
    if (e.nativeEvent.isComposing) return

    // Enter가 아니거나, Shift+Enter(줄바꿈)는 그냥 통과
    if (e.key !== 'Enter' || e.shiftKey) return

    // 기본 Enter 동작(줄바꿈) 막기
    e.preventDefault()

    // 전송 가능한 상태일 때만 메시지 전송
    if (!isSendDisabled && !isStreaming) {
      void submitMessage()
    }
  }

  return (
    <div className="border-border-line relative shrink-0 border-t bg-[#F2F2F7] p-3">
      <Textarea
        textareaRef={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        readOnly={isStreaming}
        aria-busy={isStreaming}
        className={cn(
          'bg-surface-sub text-text-chatbot min-h-0 w-full overflow-y-auto rounded-lg pb-5 text-base [scrollbar-width:thin]',
          isStreaming &&
            'border-primary-200 bg-primary-50/40 text-primary-400 placeholder:text-primary-300'
        )}
        placeholder={
          isStreaming
            ? 'AI가 답변 생성 중입니다...'
            : '더 궁금한 것이 있다면 이어서 질문해 보세요.'
        }
      />

      <div className="absolute right-5.5 bottom-5 flex items-center justify-end gap-2 rounded-2xl border border-white/20 bg-white/20 px-2 py-px backdrop-blur-md">
        <span className="text-text-light text-xs font-medium">
          <span className="text-primary">{value.length}</span>/{maxLength}
        </span>
        <Button
          variant={'text'}
          type="button"
          onClick={() => void submitMessage()}
          disabled={isSendDisabled}
          aria-label="메시지 전송"
          className="p-0 disabled:cursor-not-allowed disabled:bg-transparent"
        >
          <SendHorizontal
            size={14}
            className={cn(
              'transition-colors',
              isSendDisabled ? 'text-text-light' : 'text-primary-400'
            )}
          />
        </Button>
      </div>
    </div>
  )
}

export default memo(ChatInput)
