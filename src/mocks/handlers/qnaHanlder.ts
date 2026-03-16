import { http, HttpResponse } from 'msw'
//목데이터 import

export const qnaHandlers = [
  /**
   * 카테고리 목록 조회
   * GET /api/v1/qna/categories
   */
  http.get('/api/v1/qna/categories', () => {
    return HttpResponse.json({
      //   categories: mockCategories, //목데이터 가져오기
    })
  }),
]
