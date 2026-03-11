// import { useParams } from 'react-router-dom'
import QnaDetailHeader from './components/QnaDetailHeader'
import { mockQuestion } from './mock'

export default function QnaDetailPage() {
  // 임시 데이터용 questionId, 실제로는 API에서 받아올 예정
  //   const { questionId } = useParams()

  // 지금은 mock 데이터 사용
  const question = mockQuestion

  const handleShare = () => {
    const url = window.location.href

    navigator.clipboard.writeText(url)
    alert('링크가 복사되었습니다.')
  }

  return (
    <main className="mx-auto w-full max-w-[960px] px-6 py-10">
      {/* 질문 헤더 */}
      <QnaDetailHeader question={question} onShare={handleShare} />

      {/* 답변 영역 (추후 구현) */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">답변 0개</h2>

        <div className="mt-6 rounded-xl border border-gray-200 p-6 text-center text-gray-500">
          아직 등록된 답변이 없습니다.
        </div>
      </section>
    </main>
  )
}
