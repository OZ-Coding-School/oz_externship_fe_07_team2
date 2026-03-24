import { http, HttpResponse } from 'msw'

import { API_BASE_URL, toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'
import { mockCategories } from '@/mocks/data/category-mock'

// 카테고리 목록 조회 API
// 카테고리 목록 조회 API - 백엔드 미구현으로 임시 MSW 사용
export const qnaCategoryHandlers = [
  // http.get(`${API_BASE_URL}${QNA_API.categories}`, () => {
  //   return HttpResponse.json({
  //     categories: mockCategories,
  //   })
  // }),
]
