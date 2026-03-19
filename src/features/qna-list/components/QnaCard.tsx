import { useNavigate } from 'react-router'

import { AnswerBadge, Avatar, CategoryPath } from '@/components'
import { ROUTES_PATHS } from '@/constants/url'
import type { QnaListItem } from '@/features/qna-list'
import { cn, formatTimeAgo } from '@/utils'

type QnaCardProps = {
  question: QnaListItem
  keyword: string
}

function highlightText(text: string, keyword: string) {
  if (!keyword) return text

  // 검색어에 정규식 특수문자가 들어와도 안전하게 사용하기 위해 escape 처리
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // 검색어 기준으로 텍스트 분리 (대소문자 구분 없이 전체 매칭)
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

  return parts.map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark className="text-primary bg-transparent" key={i}>
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function QnaCard({ question, keyword }: QnaCardProps) {
  const navigate = useNavigate()
  const hasThumbnail = Boolean(question.thumbnail_img_url)
  const isAnswered = question.answer_count > 0
  const date = formatTimeAgo(question.created_at)

  return (
    <div
      className={cn(
        'hover:bg-surface-sub flex cursor-pointer flex-col p-4 md:h-52.75 md:flex-row md:items-stretch md:gap-6 md:p-6'
      )}
      onClick={() => navigate(ROUTES_PATHS.QNA_DETAIL_URL(question.id))}
    >
      <div className="flex flex-1 flex-col">
        <CategoryPath path={question.category.names} variant="list" />

        <h3 className="text-text-main mt-5 line-clamp-1 max-w-full text-lg font-semibold">
          {highlightText(question.title, keyword)}
        </h3>

        <p className="text-text-light mt-5 line-clamp-2 text-sm">
          {highlightText(question.content_preview, keyword)}
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
