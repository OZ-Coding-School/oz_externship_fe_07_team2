import { type ChangeEvent, useState } from 'react'

import { SendHorizontal } from 'lucide-react'

import { Textarea } from '@/components'

export default function ChatInput() {
  const [text, setText] = useState('')
  const maxLength = 1000 //제한글자수

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    // 글자수 제한 로직
    if (value.length <= maxLength) {
      setText(value)
    }
  }

  return (
    <div className="relative border-t border-[#CECECE] bg-[#F2F2F7] p-3">
      <Textarea
        onChange={handleChange}
        maxLength={maxLength}
        className="bg-surface-sub text-text-chatbot min-h-0 w-full overflow-y-auto rounded-lg pb-10 text-base [scrollbar-width:thin]"
        placeholder="더 궁금한 것이 있다면 이어서 질문해 보세요."
      />
      <div className="absolute right-8 bottom-5 flex w-20 items-center justify-end gap-2 bg-white py-1">
        <span className="text-text-light text-sm font-medium">
          <span className="text-primary">{text.length}</span>/{maxLength}
        </span>
        <SendHorizontal size={14} className="text-text-light" />
      </div>
    </div>
  )
}
