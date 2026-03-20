import { createContext } from 'react'

export type ChatEntryData = {
  questionId: number
  questionTitle: string
  questionContent: string
  answerContent: string
}

//열림 상태 공통화
type ToggleState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

// 채팅 UI 상태 (열림 상태 + 채팅 전용 상태)
type ChatState = ToggleState & {
  isEntryMode: boolean
  setEntryMode: (value: boolean) => void
  entryData: ChatEntryData | null
  setEntryData: (value: ChatEntryData | null) => void
}

// 전체 UI 상태 Context 타입
export type ChatWidgetContextValue = {
  chat: ChatState
  detail: ToggleState
}

export const ChatWidgetContext = createContext<ChatWidgetContextValue | null>(
  null
)
