import type { QnaQuestion } from '../types'
import { Avatar } from '@/components'
import { Link } from 'lucide-react'

type QnaDetailHeaderProps = {
  question: QnaQuestion
  onShare?: () => void
}

export default function QnaDetailHeader({ question }: QnaDetailHeaderProps) {
  const {
    category,
    subCategory,
    title,
    content,
    author,
    viewCount,
    createdAt,
  } = question

  return (
    <header className="border-border-line pb-10">
      <div className="flex flex-col gap-6">
        <div className="text-text-sub flex items-center gap-2 text-sm">
          <span className="text-primary font-medium">{category}</span>
          {subCategory && (
            <>
              <span>{'>'}</span>
              <span>{subCategory}</span>
            </>
          )}
        </div>

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
            <Avatar src={author.avatarUrl} alt={author.name} size="md" />
            <span className="text-text-sub text-sm font-semibold">
              {author.name}
            </span>
          </div>
        </div>

        <div className="border-border-line flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2"></div>

              <div className="text-text-light flex items-center gap-2 text-sm">
                <span>조회수 {viewCount}</span>
                <span>·</span>
                <span>{createdAt}</span>
              </div>
            </div>
          </div>

          <button className="text-text-chatbot border-border-line flex gap-1 rounded-full border px-3 py-3 text-xs hover:bg-gray-100">
            <Link className="ml-1" size={16} />
            공유하기
          </button>
        </div>

        <div className="text-text-primary text-base leading-7 whitespace-pre-line">
          {content}
        </div>
      </div>
    </header>
  )
}
