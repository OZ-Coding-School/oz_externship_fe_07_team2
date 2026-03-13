import { Button, SearchBar } from '@/components'
import { Pencil } from 'lucide-react'

type QnaListHeaderProps = {
  value: string
  onChange: (value: string) => void
}

export default function QnaListHeader({ value, onChange }: QnaListHeaderProps) {
  return (
    <div className="mb-13 flex w-full flex-col gap-4">
      <h1 className="text-text-main text-[32px] leading-[1.3] font-bold">
        질의응답
      </h1>
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          value={value}
          onChange={onChange}
          className="bg-surface-sub w-full max-w-118"
        />
        <Button size="md" rounded="md">
          <Pencil className="mr-2 h-5 w-5" />
          질문하기
        </Button>
      </div>
    </div>
  )
}
