import { cn } from '@/utils'

type IconBtnProps = {
  title?: string
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
}

export const IconBtn = ({
  title,
  onClick,
  active,
  disabled,
  children,
}: IconBtnProps) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      'flex h-8 w-8 shrink-0 items-center justify-center rounded',
      'hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30',
      '[&>svg]:block',
      active && 'bg-gray-100'
    )}
  >
    {children}
  </button>
)

export const Divider = () => (
  <div className="bg-border-line mx-1 h-5 w-px shrink-0" />
)

export const Group = ({
  children,
  withDivider = true,
}: {
  children: React.ReactNode
  withDivider?: boolean
}) => (
  <>
    <div className="flex shrink-0 items-center gap-1">{children}</div>
    {withDivider && <Divider />}
  </>
)
