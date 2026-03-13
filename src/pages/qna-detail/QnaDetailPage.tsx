// import { useParams } from 'react-router-dom'
import { EmptyState } from '@/components'
import QnaDetailHeader from './components/QnaDetailHeader'
import { mockQuestionDetail } from './mock'
import AnswerCard from './components/QnaDetailAnswer'

export default function QnaDetailPage() {
  // 임시 데이터용 questionId, 실제로는 API에서 받아올 예정
  //   const { questionId } = useParams()

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
      <AnswerCard answers={question.answers} />

      {/* 답변이 없을 때 */}
      {question.answers.length === 0 && <EmptyState type="emptyState" />}
    </div>
  )
}
