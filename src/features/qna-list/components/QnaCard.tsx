import { AnswerBadge, Avatar } from '@/components'
import { formatTimeAgo } from '@/utils'
import type { QnaQuestion } from '../types/qna.type'

type QnaCardProps = {
  question: QnaQuestion
}

export default function QnaCard({ question }: QnaCardProps) {
  const hasThumbnail = Boolean(question.thumbnail_img_url)
  const isAnswered = question.answer_count > 0
  const date = formatTimeAgo(question.created_at)

  return (
    <div
      className={`p-2 md:p-6 ${hasThumbnail ? 'flex flex-col md:flex-row md:gap-6' : ''}`}
    >
      <div className="flex-1">
        <div className="text-text-light text-sm">
          {question.category.names.join(' > ')}
        </div>

        <h3 className="text-text-main mt-1 text-lg font-semibold">
          {question.title}
        </h3>

        <p className="text-text-light mt-5 line-clamp-2 text-sm">
          {question.content_preview}
        </p>

        <div className="mt-9 flex items-center justify-between text-sm">
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
        <div className="order-first mb-4 h-[200px] w-full shrink-0 md:order-0 md:mb-0 md:h-[163px] md:w-[228px]">
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
