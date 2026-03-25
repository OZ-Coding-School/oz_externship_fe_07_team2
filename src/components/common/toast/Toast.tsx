import type { ReactNode } from 'react'

import { AlertCircleIcon, CheckIcon } from 'lucide-react'

import type { ToastProps, ToastType } from '@/types'
import { cn } from '@/utils'

const TOAST_ICON: Record<ToastType, ReactNode> = {
  success: <CheckIcon size={24} />,
  error: <AlertCircleIcon size={24} />,
}

const TOAST_ICON_BG_COLOR: Record<ToastType, string> = {
  success: 'bg-answer-active',
  error: 'bg-toast-error',
}

const ToastStyle =
  'flex w-fit min-w-62 items-center gap-3 rounded-sm px-3 py-2 shadow-toast animate-fade-in-out-toast bg-surface-sub border border-border-light'

/**
 * Toast UI 컴포넌트
 *
 * @description
 * - 성공(success), 에러(error) 상태에 따라 다른 아이콘, 메세지 렌더링
 * - useToast 훅을 통해 사용
 *
 * @param {ToastType} type - 토스트 타입 ('success' | 'error')
 * @param {string} message - 사용자에게 보여줄 메시지
 *
 * @example
 * const { success, error } = useToast()
 * success('저장되었습니다.')
 */
export default function Toast({ type, message }: ToastProps) {
  return (
    <div className={ToastStyle}>
      {/* 아이콘 영역 */}
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full text-white',
          TOAST_ICON_BG_COLOR[type]
        )}
      >
        {TOAST_ICON[type]}
      </div>

      {/* 메시지 영역 */}
      <span className="text-text-sub text-sm">{message}</span>
    </div>
  )
}
