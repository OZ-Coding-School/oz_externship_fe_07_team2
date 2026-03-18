export const ROUTES_PATHS = {
  QNA_LIST: '/questions',
  QNA_DETAIL: `/questions/:id`,
  QNA_CREATE: '/questions/new',
  QNA_EDIT: '/questions/:id/edit',
  NOT_FOUND: '*',

  // navigate 용
  QNA_DETAIL_URL: (id: number) => `/questions/${id}`,
  QNA_EDIT_URL: (id: number) => `/questions/${id}/edit`,
} as const
