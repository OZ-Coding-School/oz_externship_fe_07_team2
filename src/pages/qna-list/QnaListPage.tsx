import { useState } from 'react'

import { SlidersHorizontal } from 'lucide-react'

import {
  Button,
  EmptyState,
  Loading,
  ModalButton,
  Pagination,
  TabButton,
} from '@/components'
import {
  FilterSidebar,
  QnaCard,
  QnaListHeader,
  useDebounce,
  useQnaListSearchParams,
} from '@/features/qna-list'
import useQnaListQuery from '@/queries/useQnaListQuery'

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
]

const TABS = [
  { value: 'all', label: '전체' },
  { value: 'answered', label: '답변완료' },
  { value: 'pending', label: '답변 대기중' },
]

const PAGE_SIZE = 10 // 페이지 수

export default function QnaListPage() {
  const { defaultFilters, filters, page, updateFilters } =
    useQnaListSearchParams()
  const { tab, sort } = filters
  const [search, setSearch] = useState(defaultFilters.search)
  const debouncedSearch = useDebounce(search, 300)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const answerStatus =
    tab === 'answered' ? 'answered' : tab === 'pending' ? 'waiting' : undefined

  const { data, isPending, isError } = useQnaListQuery({
    page,
    size: PAGE_SIZE,
    search_keyword: debouncedSearch || undefined,
    category_id: filters.category ?? undefined,
    answer_status: answerStatus,
    sort,
  })

  const questionsList = data?.results ?? []
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const hasNoResults = !isPending && questionsList.length === 0

  // 목록 영역에서만 로딩/에러/빈 상태를 분기하고, 상단 필터 UI는 그대로 유지한다.
  const renderContent = () => {
    //전체 최초 로딩
    if (isPending) {
      return (
        <div className="flex flex-1 items-center justify-center py-20">
          <Loading />
        </div>
      )
    }

    if (isError) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <EmptyState type="notFound" />
        </div>
      )
    }

    //검색 결과 없음
    if (hasNoResults) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <EmptyState type="searchEmpty" />
        </div>
      )
    }

    return questionsList.map((list) => (
      <QnaCard key={list.id} question={list} keyword={debouncedSearch} />
    ))
  }

  return (
    <div className="flex flex-1 flex-col">
      <QnaListHeader
        value={search}
        onChange={(value: string) => {
          setSearch(value)
          updateFilters({
            nextFilters: filters,
            nextPage: 1,
          })
        }}
      />

      <section className="flex h-full flex-1 flex-col gap-5">
        <div className="border-border-line flex w-full justify-between border-b [&>div]:border-b-0">
          <TabButton
            tabs={TABS}
            value={tab}
            onValueChange={(value: string) => {
              updateFilters({
                nextFilters: {
                  ...filters,
                  tab: value,
                },
                nextPage: 1,
              })
            }}
          />

          <div className="flex items-center gap-3 pb-4">
            <ModalButton
              value={sort}
              options={SORT_OPTIONS}
              onChange={(value: string) => {
                updateFilters({
                  nextFilters: {
                    ...filters,
                    sort: value,
                  },
                  nextPage: 1,
                })
              }}
              className="text-modal w-fit p-0 text-base"
              dropdownClassName="w-34.5 right-0 left-auto top-9"
            />

            <Button
              className="text-modal p-0 font-medium"
              variant={'text'}
              onClick={() => setIsFilterOpen(true)}
            >
              필터
              <SlidersHorizontal size={20} className="ml-1" />
            </Button>
          </div>
        </div>

        {/* list 목록 */}
        <div>{renderContent()}</div>

        {/*필터 클릭시 사이드바*/}
        <FilterSidebar
          isFilterOpen={isFilterOpen}
          onFilterClose={() => setIsFilterOpen(false)}
          isAppliedCategory={filters.category}
          onCategoryFilterApply={(categoryId) => {
            updateFilters({
              nextFilters: {
                ...filters,
                category: categoryId,
              },
              nextPage: 1,
            })
          }}
        />
      </section>

      {!isPending && !hasNoResults && !isError && (
        <div className="my-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(nextPage) =>
              updateFilters({
                nextFilters: filters,
                nextPage,
              })
            }
          />
        </div>
      )}
    </div>
  )
}
