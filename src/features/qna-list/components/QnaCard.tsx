import { AnswerBadge, Avatar, CategoryPath } from '@/components'
import type { QnaQuestion } from '@/features/qna-list'
import { cn, formatTimeAgo } from '@/utils'

type QnaCardProps = {
  question: QnaQuestion
}

export default function QnaCard({ question }: QnaCardProps) {
  const hasThumbnail = Boolean(question.thumbnail_img_url)
  const isAnswered = question.answer_count > 0
  const date = formatTimeAgo(question.created_at)

  return (
    <div
      className={cn(
        'hover:bg-surface-sub flex flex-col p-10 md:h-52.75 md:flex-row md:items-stretch md:gap-6 md:p-6'
      )}
    >
      <div className="flex flex-1 flex-col">
        <CategoryPath path={question.category.names} variant="list" />

        <h3 className="text-text-main mt-5 line-clamp-1 max-w-full text-lg font-semibold">
          {question.title}
        </h3>

        <p className="text-text-light mt-5 line-clamp-2 text-sm">
          {question.content_preview}
        </p>

        <div className="mt-5 flex items-center justify-between text-sm md:mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <AnswerBadge
                size={'sm'}
                variant={isAnswered ? 'answered' : 'unanswered'}
              />
              <span>답변 {question.answer_count}</span>
            </div>
            <span className="text-text-light">
              조회수 {question.view_count}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Avatar src={question.author.profile_image_url ?? undefined} />
            <span>{question.author.nickname}</span>

            <span className="text-text-light">{date}</span>
          </div>
        </div>
      </div>

      {hasThumbnail && (
        <div className="order-first mb-5 w-full shrink-0 md:order-0 md:mb-0 md:w-57">
          <img
            src={question.thumbnail_img_url!}
            alt="thumbnail"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      )}
    </div>
  )
}
