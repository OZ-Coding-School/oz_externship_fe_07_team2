import { toMswApiUrl } from '@/constants/apiPath'
import { QNA_API } from '@/constants/qna'
import type { QnaListResponse } from '@/features/qna-list'
import {
  createQnaFiltersFromApiParams,
  filterQnaList,
} from '@/features/qna-list/lib/filterQnaList'
import { parsePositiveInt } from '@/features/qna-list/lib/parsePositiveInt'
import { mockCategories } from '@/mocks/data/category-mock'
import { mockQuestions } from '@/mocks/data/qna-list-mock'
import type { AnswerStatus } from '@/types'
import { delay, http, HttpResponse } from 'msw'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10
const qnaListApiUrl = toMswApiUrl(QNA_API.questions)

function parseQnaListParams(url: URL) {
  return {
    searchKeyword: url.searchParams.get('search_keyword') ?? '',
    answerStatus: url.searchParams.get('answer_status') as AnswerStatus | null,
    sort: url.searchParams.get('sort') ?? 'latest',
    categoryId: url.searchParams.get('category_id')
      ? Number(url.searchParams.get('category_id'))
      : null,
    page: parsePositiveInt(url.searchParams.get('page'), DEFAULT_PAGE),
    size: parsePositiveInt(url.searchParams.get('size'), DEFAULT_SIZE),
  }
}

function buildPageUrl(currentParams: URLSearchParams, page: number): string {
  const nextParams = new URLSearchParams(currentParams)
  nextParams.set('page', String(page))

  return `${qnaListApiUrl}?${nextParams.toString()}`
}

// QnA 질문 목록 조회 API
export const qnaListHandlers = [
  http.get(qnaListApiUrl, async ({ request }) => {
    await delay(700)

    const requestUrl = new URL(request.url)
    const { searchKeyword, answerStatus, sort, categoryId, page, size } =
      parseQnaListParams(requestUrl)

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
          ? buildPageUrl(requestUrl.searchParams, page + 1)
          : null,
      previous:
        page > 1 ? buildPageUrl(requestUrl.searchParams, page - 1) : null,
      results: filteredQuestions.slice(startIndex, endIndex),
    } satisfies QnaListResponse)
  }),
]
