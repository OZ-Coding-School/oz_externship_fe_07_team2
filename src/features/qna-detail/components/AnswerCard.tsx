import { MessageCircle } from 'lucide-react'

import { Avatar, Button, Input, ModalButton } from '@/components'
import { useCommentSort } from '@/hooks'
import type { SortType } from '@/hooks/useCommentSort'
import { useMinuteTick } from '@/hooks/useMinuteTick'
import type { QnaAnswer } from '@/types'
import { cn, formatTimeAgo } from '@/utils'

import { useAnswerCommentForm } from '../hooks/useAnswerCommentForm'

type AnswerCardProps = {
  questionId: number
  answer: QnaAnswer
  variant?: 'default' | 'adopted'
  className?: string
  canAdopt?: boolean
  onAdopt?: (answerId: number) => void
  isAdoptPending?: boolean
  currentUserId?: number | null
  onEdit?: () => void
  editButtonLabel?: string
}

export default function AnswerCard({
  questionId,
  answer,
  className,
  canAdopt,
  onAdopt,
  isAdoptPending,
  currentUserId,
  onEdit,
  editButtonLabel = '답변 수정하기',
}: AnswerCardProps) {
  useMinuteTick()
  const { content, created_at, updated_at, is_adopted, author, comments } =
    answer
  const {
    commentText,
    setCommentText,
    localComments,
    isSubmitDisabled,
    commentButtonLabel,
    handleSubmitComment,
  } = useAnswerCommentForm({
    questionId,
    answerId: answer.id,
    initialComments: comments,
  })

  const isOwnAnswer = currentUserId !== undefined && currentUserId === author.id
  const isAdoptedCard = is_adopted
  const { sortType, setSortType, sortOptions, sortedComments } =
    useCommentSort(localComments)

  const adoptButtonLabel = isAdoptPending ? '채택 중...' : '채택하기'

  const handleAdoptClick = () => {
    if (!onAdopt) return

    onAdopt(answer.id)
  }

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
        <div className="mb-5 flex items-start gap-3">
          <Avatar
            src={
              author.profile_img_url ?? author.profile_image_url ?? undefined
            }
            alt={author.nickname}
            size="md"
          />

          <div className="flex flex-1 items-center justify-between">
            {/* 왼쪽 영역 */}
            <div className="min-w-0">
              <p className="text-text-main text-sm font-semibold">
                {author.nickname}
                {currentUserId === author.id && (
                  <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-500">
                    내 답변
                  </span>
                )}
              </p>
            </div>

            {/* 오른쪽 영역 */}
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={onEdit}
                >
                  {editButtonLabel}
                </Button>
              )}

              {canAdopt && !is_adopted && onAdopt && (
                <Button
                  variant="primary"
                  size="sm"
                  rounded="full"
                  disabled={isAdoptPending}
                  onClick={handleAdoptClick}
                >
                  {adoptButtonLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div
          className="text-text-main text-sm leading-7 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="border-border-line mt-6 border-b pb-2 text-right">
          <span className="text-text-light text-xs">
            {updated_at
              ? `수정됨 ${formatTimeAgo(updated_at)}`
              : formatTimeAgo(created_at)}
          </span>
        </div>

        {!isOwnAnswer && (
          <div className="border-border-line mt-3 flex items-center gap-2 rounded-xl border p-3">
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요."
              className="flex-1 rounded-xl border bg-transparent text-sm placeholder:text-sm"
            />

            <Button
              size="sm"
              rounded="full"
              disabled={isSubmitDisabled}
              onClick={handleSubmitComment}
            >
              {commentButtonLabel}
            </Button>
          </div>
        )}

        {localComments.length > 0 && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-text-main flex items-center gap-2 text-sm font-semibold">
                <MessageCircle size={16} />
                <span>댓글 {localComments.length}개</span>
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
                      src={
                        comment.author.profile_img_url ??
                        comment.author.profile_image_url ??
                        undefined
                      }
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
