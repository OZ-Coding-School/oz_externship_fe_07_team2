import type { QnaQuestion } from '../types'
import { Avatar, Button, CategoryPath } from '@/components'
import { Link } from 'lucide-react'

type QnaDetailHeaderProps = {
  question: QnaQuestion
  onShare?: () => void
}

export default function QnaDetailHeader({
  question,
  onShare,
}: QnaDetailHeaderProps) {
  const {
    category_name,
    sub_category_name,
    title,
    content,
    author,
    view_count,
    created_at,
  } = question

  const categoryPath = [
    category_name,
    ...(sub_category_name ? sub_category_name.split(' > ') : []),
  ]

  return (
    <header className="border-border-line pb-10">
      <CategoryPath path={categoryPath} variant="detail" className="mb-4" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="text-primary text-6xl leading-none font-bold">
            Q.
          </span>

          <h1 className="text-text-main text-3xl leading-snug font-bold break-words">
            {title}
          </h1>
        </div>

        <div className="m-4 flex shrink-0 items-center gap-2">
          <Avatar src={author.avatar_url} alt={author.name} size="md" />
          <span className="text-text-sub text-sm font-semibold">
            {author.name}
          </span>
        </div>
      </div>

      <div className="border-border-line flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2"></div>

            <div className="text-text-light flex items-center gap-2 text-sm">
              <span>조회수 {view_count}</span>
              <span>·</span>
              <span>{created_at}</span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-text-chatbot border-border-line bg-surface-default flex gap-1 rounded-full border px-3 py-3 text-xs hover:bg-gray-100"
        >
          <Link className="h-4 w-4" />
          공유하기
        </Button>
      </div>

      <div className="text-text-primary pt-6 text-base leading-7 break-words whitespace-pre-line">
        {content}
      </div>
    </header>
  )
}
