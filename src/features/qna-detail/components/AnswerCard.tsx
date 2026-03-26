import { useEffect, useState } from 'react'

import { MessageCircle } from 'lucide-react'

import { Avatar, Button, Input, ModalButton } from '@/components'
import { useCommentSort } from '@/hooks'
import type { SortType } from '@/hooks/useCommentSort'
import { useAuthStore } from '@/store'
import type { QnaAnswer } from '@/types'
import { cn, formatTimeAgo } from '@/utils'

type AnswerCardProps = {
  answer: QnaAnswer
  variant?: 'default' | 'adopted'
  className?: string
  canAdopt?: boolean
  onAdopt?: (answerId: number) => void
  isAdoptPending?: boolean
  currentUserId?: number | null
}

export default function AnswerCard({
  answer,
  className,
  canAdopt,
  onAdopt,
  isAdoptPending,
  currentUserId,
}: AnswerCardProps) {
  const { content, created_at, is_adopted, author, comments } = answer
  const currentUser = useAuthStore((s) => s.user)

  const [commentText, setCommentText] = useState('')
  const [localComments, setLocalComments] = useState(comments)

  useEffect(() => {
    setLocalComments(comments)
  }, [comments])

  const isOwnAnswer = currentUserId !== undefined && currentUserId === author.id
  const isAdoptedCard = is_adopted
  const { sortType, setSortType, sortOptions, sortedComments } =
    useCommentSort(localComments)

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
              {author.nickname}{' '}
              {currentUserId === author.id && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-500">
                  내 답변
                </span>
              )}
            </p>
          </div>
        </div>
        <div
          className="text-text-main text-sm leading-7 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="border-border-line mt-6 border-b pb-2 text-right">
          <span className="text-text-light text-xs">
            {formatTimeAgo(created_at)}
          </span>
        </div>

        {canAdopt && !is_adopted && onAdopt && (
          <div className="mt-3 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              rounded="full"
              disabled={isAdoptPending}
              onClick={() => onAdopt(answer.id)}
            >
              {isAdoptPending ? '채택 중...' : '채택하기'}
            </Button>
          </div>
        )}

        {!isOwnAnswer && (
          <div className="border-border-line mt-3 flex items-center gap-2 rounded-xl border p-3">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="개인정보를 공유 및 오남용하거나, 명예 훼손, 무단 광고, 불법 정보, 불건전 정보 모니터링 후 삭제될 수 있습니다."
              className="flex-1 rounded-xl border bg-transparent text-sm placeholder:text-sm"
            />

            <Button
              size="sm"
              rounded="full"
              disabled={!commentText.trim()}
              onClick={() => {
                setCommentText('')
              }}
            >
              등록
            </Button>
          </div>
        )}

        {localComments.length > 0 && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-text-main flex items-center gap-2 text-sm font-semibold">
                <MessageCircle size={16} />
                <span>댓글 {comments.length}개</span>
              </div>

              <ModalButton
                value={sortType}
                options={sortOptions}
                onChange={(value: SortType) => setSortType(value)}
                className="w-auto"
              />
            </div>

            <div className="border-border-line divide-border-line flex flex-col divide-y">
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
