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
  type QnaFilters,
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

export default function QnaListPage() {
  const initialFilters: QnaFilters = {
    search: '',
    tab: 'all',
    sort: 'latest',
    category: null,
  }

  const [filters, setFilters] = useState<QnaFilters>({
    ...initialFilters,
  })
  const { search, tab, sort } = filters
  const debouncedSearch = useDebounce(search, 300)
  const [page, setPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const questionsList = mockQuestions

  const filteredQuestions = useQnaFilters(questionsList, {
    ...filters,
    search: debouncedSearch,
  })

  const PAGE_SIZE = 10 // 페이지 수

  //전체 페이지 수 계산
  const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE)

  // 현재 페이지에 해당하는 질문 목록만 잘라서 가져옴
  const paginatedQuestions = filteredQuestions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  const hasNoResults = filteredQuestions.length === 0

  const handleResetList = () => {
    setFilters(initialFilters)
    setPage(1)
  }

  return (
    <div className="flex flex-1 flex-col">
      <QnaListHeader
        value={search}
        onChange={(value: string) => {
          setFilters((prev) => ({ ...prev, search: value }))
          setPage(1)
        }}
      />

      <section className="flex h-full flex-1 flex-col gap-5">
        <div className="border-border-line flex w-full justify-between border-b [&>div]:border-b-0">
          <TabButton
            tabs={TABS}
            value={tab}
            onValueChange={(value: string) => {
              setFilters((prev) => ({ ...prev, tab: value }))
              setPage(1)
            }}
          />

          <div className="flex items-center gap-3 pb-4">
            <ModalButton
              value={sort}
              options={SORT_OPTIONS}
              onChange={(value: string) => {
                setFilters((prev) => ({ ...prev, sort: value }))
                setPage(1)
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
            <Button
              variant="outline"
              className="py-2 text-base font-normal"
              onClick={handleResetList}
            >
              전체 질문 보기
            </Button>
          </div>
        ) : (
          paginatedQuestions.map((list) => (
            <QnaCard key={list.id} question={list} keyword={debouncedSearch} />
          ))
        )}

        {/*필터 클릭시 사이드바*/}
        <FilterSidebar
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          appliedCategoryId={filters.category}
          onApply={(categoryId) => {
            // 사이드바에서 전달한 선택값을 그대로 저장시 적용/해제 상태가 일관
            setFilters((prev) => ({
              ...prev,
              category: categoryId,
            }))

            // 필터 변경 시 페이지를 1로 초기화
            setPage(1)
          }}
        />
      </section>

      {!hasNoResults && (
        <div className="my-8 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
