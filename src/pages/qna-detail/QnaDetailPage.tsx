// import { useParams } from 'react-router-dom'
import { EmptyState } from '@/components'
import {
  QnaAnswer,
  QnaDetailAnswer,
  QnaDetailHeader,
} from '@/features/qna-detail'
import { mockQuestionDetail, mockUsers } from '@/mocks/data/qna-detail-mock'

export default function QnaDetailPage() {
  // 임시 데이터용 questionId, 실제로는 API에서 받아올 예정
  //   const { questionId } = useParams()

  // TODO: 회원일 경우 질문자와 답변자에 따라 다른 UI 보여주기

  // 지금은 mock 데이터 사용
  const question = mockQuestionDetail

  // TODO: API에서 현재 로그인한 사용자 정보 받아오기

  const currentUser = mockUsers.member
  // const currentUser = mockUsers.guest
  // const currentUser = mockUsers.questionAuthor
  // null
  // const currentUser = null

  const isLoggedIn = Boolean(currentUser)
  const isQuestionAuthor = currentUser?.id === question.author.id
  const shouldShowAnswerEditor = isLoggedIn && !isQuestionAuthor

  const handleShare = () => {
    const url = window.location.href

    navigator.clipboard.writeText(url)
    alert('링크가 복사되었습니다.')
  }

  return (
    <div className="px-8 py-10">
      {/* 질문 헤더 */}
      <QnaDetailHeader
        question={question}
        onShare={handleShare}
        isQuestionAuthor={isQuestionAuthor}
      />
      {/* 답변 작성 영역 */}
      {shouldShowAnswerEditor && <QnaAnswer nickname={currentUser.nickname} />}

      {/* 답변 카드 */}
      {question.answers.length > 0 ? (
        <QnaDetailAnswer answers={question.answers} />
      ) : (
        <EmptyState type="emptyState" />
      )}
    </div>
  )
}
