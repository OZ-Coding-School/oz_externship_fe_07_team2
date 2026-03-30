export const QNA_API = {
  CATEGORIES: '/qna/categories/',
  QUESTIONS_BASE: '/qna/questions/',
  QUESTION_DETAIL: (id: number | string) => `/qna/questions/${id}/`,
  QUESTION_ANSWERS: (id: number | string) => `/qna/questions/${id}/answers`,
  QUESTION_AI_ANSWER: (id: number | string) => `/qna/questions/${id}/ai-answer`,
  ANSWERS_BASE: '/qna/answers/',
  ANSWER_DETAIL: (id: number | string) => `/qna/answers/${id}`,
  ANSWER_COMMENTS: (id: number | string) => `/qna/answers/${id}/comments`,
  ANSWER_ACCEPT: (id: number | string) => `/qna/answers/${id}/accept`,
  PRESIGNED_URL: '/qna/questions/presigned-url/',
} as const
