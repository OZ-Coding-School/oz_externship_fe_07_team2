import type { QnaAiAnswer } from '@/types'

// 임시용 AI 답변 로컬 저장소 유틸입니다.
// 상세 API 응답에 ai_answer가 없거나 새로고침 전 상태를 유지해야 할 때 사용합니다.
const AI_ANSWER_STORAGE_KEY = 'qna-ai-answer'

const getStorageKey = (questionId: number) =>
  `${AI_ANSWER_STORAGE_KEY}:${questionId}`

// questionId 기준으로 저장된 AI 답변을 조회합니다.
export const getStoredAiAnswer = (questionId: number): QnaAiAnswer | null => {
  try {
    const value = localStorage.getItem(getStorageKey(questionId))
    return value ? (JSON.parse(value) as QnaAiAnswer) : null
  } catch {
    return null
  }
}

// 생성되거나 조회한 AI 답변을 questionId 기준으로 저장합니다.
export const setStoredAiAnswer = (aiAnswer: QnaAiAnswer) => {
  try {
    localStorage.setItem(
      getStorageKey(aiAnswer.question_id),
      JSON.stringify(aiAnswer)
    )
  } catch {
    // localStorage 사용 불가 시 무시
  }
}
