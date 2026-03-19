export const CHAT_API = {
  sessions: '/chatbot/sessions',
  support: '/chatbot/support',
  sessionById: (sessionId: string | number) => `/chatbot/sessions/${sessionId}`,
  completions: (sessionId: string | number) =>
    `/chatbot/sessions/${sessionId}/completions`,
} as const
