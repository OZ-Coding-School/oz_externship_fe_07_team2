import { useParams } from 'react-router-dom'

import { EmptyState, Loading } from '@/components'
import {
  QnaAnswer,
  QnaDetailAnswer,
  QnaDetailHeader,
} from '@/features/qna-detail'
import { mockUsers } from '@/mocks/data/qna-detail-mock'
import useQnaDetailQuery from '@/queries/useQnaDetailQuery'

export default function QnaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const questionId = Number(id)
  const isValidQuestionId = Number.isFinite(questionId) && questionId > 0

  const {
    data: question,
    isPending,
    isError,
  } = useQnaDetailQuery(questionId, {
    enabled: isValidQuestionId,
  })

  const currentUser = mockUsers.member
  const isLoggedIn = Boolean(currentUser)

  const isQuestionAuthor = !!question && currentUser?.id === question.author.id

  const shouldShowAnswerEditor = isLoggedIn && !isQuestionAuthor

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('링크가 복사되었습니다.')
  }

  if (!isValidQuestionId) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <EmptyState type="notFound" />
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Loading />
      </div>
    )
  }

  if (isError || !question) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <EmptyState type="notFound" />
      </div>
    )
  }

  return (
    <div className="px-8 py-10">
      <QnaDetailHeader
        question={question}
        onShare={handleShare}
        isQuestionAuthor={isQuestionAuthor}
      />

      {shouldShowAnswerEditor && (
        <QnaAnswer nickname={currentUser?.nickname ?? ''} />
      )}

      {question.answers.length > 0 ? (
        <QnaDetailAnswer answers={question.answers} />
      ) : (
        <EmptyState type="emptyState" />
      )}
    </div>
  )
}
