import type { ReactNode } from 'react'

import { Button } from '@/components'
import { cn } from '@/utils'

type PopupProps = {
  isOpen: boolean
  content: ReactNode
  onConfirm: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
  buttonClassName?: string
}

export default function Popup({
  isOpen,
  content,
  onConfirm,
  onCancel,
  confirmLabel = '확인',
  cancelLabel = '취소',
  buttonClassName,
}: PopupProps) {
  if (!isOpen) return null
  return (
    <div
      onClick={onCancel}
      className="bg-bg-overlay/50 fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-default shadow-modal h-auto w-80 rounded-xl p-[clamp(16px,4vw,28px)] sm:w-107"
      >
        <p className="text-text-modal mb-13 text-[clamp(0.75rem,3vw,1rem)] whitespace-pre-line">
          {content}
        </p>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button
              onClick={onCancel}
              variant="outline"
              size="md"
              rounded="full"
              className={cn('whitespace-nowrap', buttonClassName)}
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            onClick={onConfirm}
            variant="primary"
            size="md"
            rounded="full"
            className={cn('whitespace-nowrap', buttonClassName)}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
