import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AiAnswerUiState = {
  // questionId별 AI 답변 카드 열림 여부를 저장합니다.
  openByQuestionId: Record<number, boolean>
  // 특정 질문의 AI 답변 카드를 엽니다.
  openDetail: (questionId: number) => void
  // 특정 질문의 AI 답변 카드를 닫습니다.
  closeDetail: (questionId: number) => void
}

// 상세 페이지에서 AI 답변 카드의 열림/닫힘 상태를 전역으로 관리합니다.
// persist를 사용해 새로고침 후에도 questionId 기준 UI 상태를 유지합니다.
export const useAiAnswerUiStore = create<AiAnswerUiState>()(
  persist(
    (set) => ({
      openByQuestionId: {},
      openDetail: (questionId) =>
        set((state) => ({
          openByQuestionId: {
            ...state.openByQuestionId,
            [questionId]: true,
          },
        })),
      closeDetail: (questionId) =>
        set((state) => ({
          openByQuestionId: {
            ...state.openByQuestionId,
            [questionId]: false,
          },
        })),
    }),
    {
      name: 'ai-answer-ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
