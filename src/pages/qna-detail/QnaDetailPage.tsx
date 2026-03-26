import { useParams } from 'react-router-dom'

import { EmptyState, Loading } from '@/components'
import AuthGuard from '@/components/auth/AuthGuard'
import {
  QnaAnswer,
  QnaDetailAnswer,
  QnaDetailHeader,
} from '@/features/qna-detail'
<<<<<<< HEAD
<<<<<<< HEAD
import { useToast } from '@/hooks/useToast'
// import { mockUsers } from '@/mocks/data/qna-detail-mock'
=======
>>>>>>> 4f9accf (feat: connect question api (#102))
import { useQnaDetailQuery } from '@/queries'
=======
import { useAdoptAnswerMutation, useQnaDetailQuery } from '@/queries'
>>>>>>> 8c1a1b7 (feat: compare user role (#102))
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

  const myAnswer =
    question?.answers.find((answer) => answer.author.id === currentUser?.id) ??
    null

  const otherAnswers = question?.answers.filter(
    (answer) => answer.author.id !== currentUser?.id
  )

  const isUserRole = currentUser?.role === 'USER'
  const canAdoptAnswer = isQuestionAuthor && isUserRole

  const { mutate: adoptMutate, isPending: isAdoptPending } =
    useAdoptAnswerMutation()

  const handleAdopt = (answerId: number) => {
    if (!question) return

    adoptMutate({
      questionId,
      answerId,
    })
  }

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
        {!isQuestionAuthor && (
          <QnaAnswer questionId={questionId} myAnswer={myAnswer} />
        )}
      </AuthGuard>

      {question.answers.length > 0 ? (
        <QnaDetailAnswer
          answers={question.answers}
          currentUserId={currentUser?.id}
          canAdoptAnswer={canAdoptAnswer}
          onAdopt={handleAdopt}
          isAdoptPending={isAdoptPending}
        />
      ) : (
        <EmptyState type="emptyState" />
      )}
    </div>
  )
}
