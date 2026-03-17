import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'
import { mockCategories } from '@/mocks/data/category-mock'
import { http, HttpResponse } from 'msw'

// 카테고리 목록 조회 API
export const qnaCategoryHandlers = [
  http.get(toMswApiUrl(QNA_API.categories), () => {
    return HttpResponse.json({
      categories: mockCategories,
    })
  }),
]
