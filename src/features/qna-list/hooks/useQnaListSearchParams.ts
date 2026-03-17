import { useSearchParams } from 'react-router'

import type { QnaFilters } from '@/features/qna-list'

// 기본 필터 값
// URL에 아무 파라미터가 없을 때 사용되는 초기 상태
const DEFAULT_FILTERS: QnaFilters = {
  search: '',
  tab: 'all',
  sort: 'latest',
  category: null,
}

// 문자열 파라미터를 "양수 정수"로 안전하게 변환하는 함수
// 잘못된 값이면 null 반환
function parsePositiveInt(value: string | null): number | null {
  if (!value) return null

  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return null
  }

  return parsed
}

// URLSearchParams → QnaFilters 형태로 변환
// URL에 없는 값은 DEFAULT_FILTERS 기준으로 채움
function getFiltersFromSearchParams(searchParams: URLSearchParams): QnaFilters {
  return {
    search: DEFAULT_FILTERS.search,
    tab: searchParams.get('tab') ?? DEFAULT_FILTERS.tab,
    sort: searchParams.get('sort') ?? DEFAULT_FILTERS.sort,
    category: parsePositiveInt(searchParams.get('category')),
  }
}

// URL에서 page 값을 읽어서 페이지 번호로 변환
// 잘못된 값이면 기본값 1 반환
function getPageFromSearchParams(searchParams: URLSearchParams): number {
  return parsePositiveInt(searchParams.get('page')) ?? 1
}

// 필터 업데이트 시 사용할 파라미터 타입
// nextFilters : 다음 필터 상태
// nextPage : 다음 페이지 (선택)
type UpdateFiltersParams = {
  nextFilters: QnaFilters
  nextPage?: number
}

export default function useQnaListSearchParams() {
  // 현재 URL의 search params 읽기
  const [searchParams, setSearchParams] = useSearchParams()

  // URL → 필터 상태로 변환
  const filters = getFiltersFromSearchParams(searchParams)

  // URL → 페이지 번호
  const page = getPageFromSearchParams(searchParams)

  // 필터 또는 페이지가 변경될 때 URL 파라미터 업데이트
  const updateFilters = ({
    nextFilters,
    nextPage = page,
  }: UpdateFiltersParams) => {
    const nextParams = new URLSearchParams()

    // 기본값이 아닌 경우만 URL에 저장
    if (nextFilters.tab !== DEFAULT_FILTERS.tab) {
      nextParams.set('tab', nextFilters.tab)
    }

    if (nextFilters.sort !== DEFAULT_FILTERS.sort) {
      nextParams.set('sort', nextFilters.sort)
    }

    if (nextFilters.category !== null) {
      nextParams.set('category', String(nextFilters.category))
    }

    // 페이지는 1보다 클 때만 저장
    if (nextPage > 1) {
      nextParams.set('page', String(nextPage))
    }

    setSearchParams(nextParams)
  }

  // 모든 필터 초기화 (URL 파라미터 제거)
  const resetFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  return {
    defaultFilters: DEFAULT_FILTERS,
    filters,
    page,
    updateFilters,
    resetFilters,
  }
}
