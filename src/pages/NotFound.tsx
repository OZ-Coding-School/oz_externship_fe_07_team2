import { Button } from '@/components'
import { ERROR_CONTENT } from '@/constants/error'
import { useNavigate } from 'react-router'

type NotFoundPageProps = {
  type: keyof typeof ERROR_CONTENT
}

export default function NonFoundPage({ type }: NotFoundPageProps) {
  const { image, title, description } = ERROR_CONTENT[type]
  const navigate = useNavigate()
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center gap-5">
      <img src={image} alt="404 NofFound 페이지" />
      <div className="text-text-light text-center">
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <Button
        variant="outline"
        className="py-2 text-base font-normal"
        onClick={() => navigate(-1)}
      >
        이전 페이지로 이동
      </Button>
    </div>
  )
}
