// import { useParams } from 'react-router-dom'
import { EmptyState } from '@/components'
import { QnaDetailHeader, QnaDetailAnswer } from '@/features/qna-detail'
import { mockQuestionDetail } from './mock'

export default function QnaDetailPage() {
  // 임시 데이터용 questionId, 실제로는 API에서 받아올 예정
  //   const { questionId } = useParams()

  // TODO: 회원일 경우 질문자와 답변자에 따라 다른 UI 보여주기

  // 지금은 mock 데이터 사용
  const question = mockQuestionDetail

  const handleShare = () => {
    const url = window.location.href

    navigator.clipboard.writeText(url)
    alert('링크가 복사되었습니다.')
  }

  return (
    <div className="px-8 py-10">
      {/* 질문 헤더 */}
      <QnaDetailHeader question={question} onShare={handleShare} />

      {/* 답변 카드 */}
      {question.answers.length > 0 ? (
        <QnaDetailAnswer answers={question.answers} />
      ) : (
        <EmptyState type="emptyState" />
      )}
    </div>
  )
}
