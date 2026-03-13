import type { QnaQuestionDetail } from '../types'
import { Avatar, Button, CategoryPath } from '@/components'
import { formatRelativeTime } from '@/utils/formatRelativeTime'

import { Link } from 'lucide-react'

type QnaDetailHeaderProps = {
  question: QnaQuestionDetail
  onShare?: () => void
}

export default function QnaDetailHeader({
  question,
  onShare,
}: QnaDetailHeaderProps) {
  const { category, title, content, author, view_count, created_at } = question

  const avatarSrc = author.profile_image_url ?? undefined

  return (
    <header className="border-border-line pb-5">
      <CategoryPath path={category.names} variant="detail" className="mb-4" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="text-primary text-6xl leading-none font-bold">
            Q.
          </span>

          <h1 className="text-text-main text-3xl leading-snug font-bold break-words">
            {title}
          </h1>
        </div>

        <div className="m-4 flex shrink-0 items-center gap-2">
          <Avatar src={avatarSrc} alt={author.nickname} size="md" />{' '}
          <span className="text-text-sub text-sm font-semibold">
            {author.nickname}
          </span>
        </div>
      </div>

      <div className="border-border-line flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2"></div>

            <div className="text-text-light flex items-center gap-2 pt-3 text-sm">
              <span>조회수 {view_count}</span>
              <span>·</span>
              <span>{formatRelativeTime(created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-text-primary pt-6 pb-16 text-base leading-7 break-words whitespace-pre-line">
        {content}
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" rounded="full" onClick={onShare}>
          <Link className="h-4 w-4" />
          공유하기
        </Button>
      </div>
    </header>
  )
}
