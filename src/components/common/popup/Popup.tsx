import type { ReactNode } from 'react'

type PopupProps = {
  isOpen: boolean
  content: ReactNode
  onConfirm: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
}
/*
 * TODO: Button 공통컴포넌트 merge 후 삭제 예정
 */
const buttonStyle = {
  cancel: 'bg-primary-100 text-primary rounded-full px-6 py-3 font-semibold',
  confirm: 'bg-primary text-surface-sub rounded-full px-6 py-3 font-semibold',
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
          {/* Button 공통컴포넌트 merge 후 변경 예정 */}
          {onCancel && (
            <button onClick={onCancel} className={buttonStyle.cancel}>
              {cancelLabel}
            </button>
          )}
          <button onClick={onConfirm} className={buttonStyle.confirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
