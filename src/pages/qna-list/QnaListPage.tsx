import {
  Button,
  EmptyState,
  ModalButton,
  Pagination,
  TabButton,
} from '@/components'
import {
  FilterSidebar,
  QnaCard,
  QnaListHeader,
  useDebounce,
  useQnaFilters,
  useQnaListSearchParams,
} from '@/features/qna-list'
import { mockQuestions } from '@/mocks/data/qna-list-mock'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

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
  const questionsList = mockQuestions

  const filteredQuestions = useQnaFilters(questionsList, {
    ...filters,
    search: debouncedSearch,
  })

  //전체 페이지 수 계산
  const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE)

  const currentPage = Math.min(page, Math.max(totalPages, 1))
  // 현재 페이지에 해당하는 질문 목록만 잘라서 가져옴
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const hasNoResults = filteredQuestions.length === 0

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
        {hasNoResults ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <EmptyState type="searchEmpty" />
          </div>
        ) : (
          paginatedQuestions.map((list) => (
            <QnaCard key={list.id} question={list} keyword={debouncedSearch} />
          ))
        )}

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

      {!hasNoResults && (
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
