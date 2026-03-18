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
    <div
      className={cn(
        'mx-auto flex min-h-screen w-full max-w-236 flex-col px-4 pt-27',
        className
      )}
    >
      {children}
    </div>
  )
}
