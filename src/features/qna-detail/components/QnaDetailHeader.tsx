import { Link } from 'lucide-react'

import { Avatar, Button, CategoryPath } from '@/components'
import type { QnaQuestionDetail } from '@/types'
import { formatTimeAgo } from '@/utils'

type QnaDetailHeaderProps = {
  question: QnaQuestionDetail
  onShare?: () => void
  isQuestionAuthor?: boolean
}

export default function QnaDetailHeader({
  question,
  onShare,
  isQuestionAuthor,
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

      <div className="border-border-line border-b pb-4">
        <div className="text-text-light flex w-full items-center justify-between pt-3 text-sm">
          <div className="flex items-center gap-2">
            <span>조회수 {view_count}</span>
            <span>·</span>
            <span>{formatTimeAgo(created_at)}</span>
          </div>
          {/* 글 작성자 수정 버튼 */}
          {/* TODO: 글 수정 페이지로 이동 */}
          {isQuestionAuthor && (
            <span className="text-text-highlight shrink-0">수정</span>
          )}
        </div>
      </div>

      <div className="text-text-primary pt-6 pb-16 text-base leading-7 break-words whitespace-pre-line">
        {content}
      </div>
      <div className="border-border-line flex justify-end border-b p-4">
        <Button variant="ghost" size="sm" rounded="full" onClick={onShare}>
          <Link className="h-4 w-4" />
          공유하기
        </Button>
      </div>
      <div></div>
    </header>
  )
}
