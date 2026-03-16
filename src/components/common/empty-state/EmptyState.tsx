import { ERROR_CONTENT } from '@/constants/error'

type EmptyStateProps = {
  type: keyof typeof ERROR_CONTENT
}

export default function EmptyState({ type }: EmptyStateProps) {
  const { image, title, description } = ERROR_CONTENT[type]
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img src={image} alt="empty 상태 페이지" />
      <div className="text-text-light text-center">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}
