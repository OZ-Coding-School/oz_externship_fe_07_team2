import { Button, ModalButton, Pagination, TabButton } from '@/components'
import {
  FilterSidebar,
  QnaCard,
  QnaListHeader,
  useDebounce,
} from '@/features/qna-list'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { mockQuestions } from './mock'

/**
 * TODO
 * - filter 로직 hook 분리 (search / tab / category / sort)
 * - pagination 로직 hook 분리
 */

export default function QnaListPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('latest')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  // const questionsList = mockQuestions
  const [page, setPage] = useState(1)

  //페이지네이션 테스트용 지울 예정
  const questionsList = [...Array(100)].map((_, i) => {
    const base = i < 50 ? mockQuestions[0] : mockQuestions[1]

    return {
      ...base,
      id: i + 1,
    }
  })

  const PAGE_SIZE = 10 // 페이지 수

  //전체 페이지 수 계산
  const totalPages = Math.ceil(questionsList.length / PAGE_SIZE)

  // 현재 페이지에 해당하는 질문 목록만 잘라서 가져옴
  // 시작 index: (현재페이지 - 1) * PAGE_SIZE
  // 끝 index: 현재페이지 * PAGE_SIZE
  // 예: page = 2, PAGE_SIZE = 5
  // → slice(5, 10) → 6~10번째 데이터
  const paginatedQuestions = questionsList.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  const SORT_OPTIONS = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
  ]

  const tabs = [
    { value: 'all', label: '전체' },
    { value: 'answered', label: '답변완료' },
    { value: 'pending', label: '답변 대기중' },
  ]

  //확인용 지울 예정
  useEffect(() => {
    console.log('debouncedSearch:', debouncedSearch)
  }, [debouncedSearch])

  return (
    <>
      <QnaListHeader value={search} onChange={setSearch} />

      <section className="flex flex-1 flex-col gap-5">
        <div className="border-border-line flex w-full justify-between border-b [&>div]:border-b-0">
          <TabButton tabs={tabs} value={tab} onValueChange={setTab} />

          <div className="flex items-center gap-3 pb-4">
            <ModalButton
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
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
        <div>
          {paginatedQuestions.map((list) => (
            <div key={list.id}>
              <QnaCard question={list} />
            </div>
          ))}
        </div>

        {/*필터 클릭시 사이드바*/}
        <FilterSidebar
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </section>
      <div className="my-8 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
