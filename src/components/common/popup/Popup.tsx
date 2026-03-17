import type { ReactNode } from 'react'

import { Button } from '@/components'

type PopupProps = {
  isOpen: boolean
  content: ReactNode
  onConfirm: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export default function Popup({
  isOpen,
  content,
  onConfirm,
  onCancel,
  confirmLabel = '확인',
  cancelLabel = '취소',
}: PopupProps) {
  if (!isOpen) return null
  return (
    <div
      onClick={onCancel}
      className="bg-bg-overlay/50 fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface-default shadow-modal h-auto w-107 rounded-xl p-7"
      >
        <p className="text-text-modal mb-13 text-base whitespace-pre-line">
          {content}
        </p>
        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button
              onClick={onCancel}
              variant="outline"
              size="md"
              rounded="full"
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            onClick={onConfirm}
            variant="primary"
            size="md"
            rounded="full"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
