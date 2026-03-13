import AnswerCard from './AnswerCard'
import type { QnaAnswer } from '../types'
import { AnswerBadge } from '@/components'

type QnaDetailAnswerProps = {
  answers: QnaAnswer[]
}

export default function QnaDetailAnswer({ answers }: QnaDetailAnswerProps) {
  const sortedAnswers = [...answers].sort(
    (a, b) => Number(b.is_adopted) - Number(a.is_adopted)
  )

  return (
    <section className="">
      <div className="border-border-line mb-12 border-b" />
      <div className="mb-4 flex items-center gap-3">
        <AnswerBadge variant={'detail'} size={'md'} className="my-4" />
        <h2 className="text-text-main text-xl font-bold">
          {answers.length}개의 답변이 있어요
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {sortedAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            variant={answer.is_adopted ? 'adopted' : 'default'}
          />
        ))}
      </div>
    </section>
  )
}
