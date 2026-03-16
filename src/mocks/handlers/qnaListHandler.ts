import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'
import {
  createQnaFiltersFromApiParams,
  filterQnaList,
} from '@/features/qna-list/lib/filterQnaList'
import { mockCategories } from '@/mocks/data/category-mock'
import { mockQuestions } from '@/mocks/data/qna-list-mock'
import type { AnswerStatus } from '@/types'
import { delay, http, HttpResponse } from 'msw'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

// query string으로 전달된 page/size 값을 양의 정수로 변환하고, 잘못된 값이면 기본값을 사용한다.
function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback
  }

  return parsed
}

// QnA 질문 목록 조회 API
export const qnaListHandlers = [
  http.get(toMswApiUrl(QNA_API.questions), async ({ request }) => {
    await delay(700)

    const requestUrl = new URL(request.url)
    const searchKeyword = requestUrl.searchParams.get('search_keyword') ?? ''
    const answerStatus = requestUrl.searchParams.get(
      'answer_status'
    ) as AnswerStatus | null
    const sort = requestUrl.searchParams.get('sort') ?? 'latest'
    const rawCategoryId = requestUrl.searchParams.get('category_id')
    const categoryId = rawCategoryId ? Number(rawCategoryId) : null
    const page = parsePositiveInt(
      requestUrl.searchParams.get('page'),
      DEFAULT_PAGE
    )
    const size = parsePositiveInt(
      requestUrl.searchParams.get('size'),
      DEFAULT_SIZE
    )

    const filteredQuestions = filterQnaList(
      mockQuestions,
      createQnaFiltersFromApiParams({
        search_keyword: searchKeyword,
        answer_status: answerStatus,
        sort,
        category_id: categoryId,
      }),
      mockCategories
    )

    const startIndex = (page - 1) * size
    const endIndex = startIndex + size

    return HttpResponse.json({
      count: filteredQuestions.length,
      next:
        endIndex < filteredQuestions.length
          ? `${toMswApiUrl(QNA_API.questions)}?page=${page + 1}&size=${size}`
          : null,
      previous:
        page > 1
          ? `${toMswApiUrl(QNA_API.questions)}?page=${page - 1}&size=${size}`
          : null,
      results: filteredQuestions.slice(startIndex, endIndex),
    })
  }),
]
