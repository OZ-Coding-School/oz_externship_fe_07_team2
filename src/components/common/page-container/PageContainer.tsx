import { cn } from '@/utils'

type PageContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-236 pt-27', className)}>
      {children}
    </div>
  )
}
