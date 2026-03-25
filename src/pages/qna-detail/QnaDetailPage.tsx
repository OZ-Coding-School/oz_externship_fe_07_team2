import { useParams } from 'react-router-dom'

import { EmptyState, Loading } from '@/components'
import AuthGuard from '@/components/auth/AuthGuard'
import {
  QnaAnswer,
  QnaDetailAnswer,
  QnaDetailHeader,
} from '@/features/qna-detail'
import { useToast } from '@/hooks/useToast'
// import { mockUsers } from '@/mocks/data/qna-detail-mock'
import { useQnaDetailQuery } from '@/queries'
import { useAuthStore } from '@/store'

export default function QnaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const questionId = Number(id)
  const isValidQuestionId = Number.isFinite(questionId) && questionId > 0
  const { success } = useToast()

  const {
    data: question,
    isPending,
    isError,
  } = useQnaDetailQuery(questionId, {
    enabled: isValidQuestionId,
  })

  const currentUser = useAuthStore((s) => s.user)
  const isQuestionAuthor = !!question && currentUser?.id === question.author.id
  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    success('링크가 복사되었습니다.')
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

      <AuthGuard>
        {!isQuestionAuthor && <QnaAnswer questionId={questionId} />}
      </AuthGuard>

      {question.answers.length > 0 ? (
        <QnaDetailAnswer answers={question.answers} />
      ) : (
        <EmptyState type="emptyState" />
      )}
    </div>
  )
}
