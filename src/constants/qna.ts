export const QNA_API = {
  categories: '/qna/categories',

  questions: {
    base: '/qna/questions',
    answers: (id: number) => `/qna/questions/${id}/answers`,
  },

  answers: {
    base: '/qna/answers',
    detail: (id: number) => `/qna/answers/${id}`,
    comments: (id: number) => `/qna/answers/${id}/comments`,
    adopt: (id: number) => `/qna/answers/${id}/adopt`,
  },

  presignedUrl: '/qna/questions/presigned-url',
} as const
