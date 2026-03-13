import { MessageCircle } from 'lucide-react'
import { Avatar, ModalButton } from '@/components'
import { cn, formatTimeAgo } from '@/utils'
import { useCommentSort } from '@/hooks'
import type { QnaAnswer } from '../types'

type AnswerCardProps = {
  answer: QnaAnswer
  variant?: 'default' | 'adopted'
  className?: string
}

export default function AnswerCard({
  answer,
  variant = 'default',
  className,
}: AnswerCardProps) {
  const { content, created_at, is_adopted, author, comments } = answer

  const isAdoptedCard = variant === 'adopted' || is_adopted
  const { sortType, setSortType, sortOptions, sortedComments } =
    useCommentSort(comments)

  return (
    <article
      className={cn(
        'bg-surface-default border-border-line relative rounded-2xl border px-5 py-6',
        isAdoptedCard && 'border-primary',
        className
      )}
    >
      {isAdoptedCard && (
        <span className="bg-primary absolute -top-3 left-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white">
          질문자 채택
        </span>
      )}

      <div className={cn(isAdoptedCard && 'pt-2')}>
        <div className="mb-5 flex items-center gap-3">
          <Avatar
            src={author.profile_image_url ?? undefined}
            alt={author.nickname}
            size="md"
          />

          <div className="min-w-0">
            <p className="text-text-main text-sm font-semibold">
              {author.nickname}
            </p>
          </div>
        </div>

        <div className="text-text-main text-sm leading-7 whitespace-pre-line">
          {content}
        </div>

        <div className="border-border-line mt-6 border-b pb-2 text-right">
          <span className="text-text-light text-xs">
            {formatTimeAgo(created_at)}
          </span>
        </div>
        {comments.length > 0 && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-text-main flex items-center gap-2 text-sm font-semibold">
                <MessageCircle size={16} />
                <span>댓글 {comments.length}개</span>
              </div>

              <ModalButton
                value={sortType}
                options={sortOptions}
                onChange={(value) => setSortType(value as 'latest' | 'oldest')}
                className="w-auto"
              />
            </div>

            <div className="border-border-line flex flex-col divide-y">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="mb-2 flex items-center gap-2">
                    <Avatar
                      src={comment.author.profile_image_url ?? undefined}
                      alt={comment.author.nickname}
                      size="sm"
                    />
                    <span className="text-text-main text-sm font-medium">
                      {comment.author.nickname}
                    </span>
                    <span className="text-text-light text-xs">
                      {formatTimeAgo(comment.created_at)}
                    </span>
                  </div>

                  <p className="text-text-main text-sm leading-6 whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
