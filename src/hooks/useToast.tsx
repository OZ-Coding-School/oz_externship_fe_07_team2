import { toast } from 'react-hot-toast'

import { Toast } from '@/components'
import type { ToastType } from '@/types'

export function useToast() {
  const showToast = (type: ToastType, message: string) => {
    toast.custom(() => <Toast type={type} message={message} />)
  }

  return {
    success: (msg: string) => showToast('success', msg),
    error: (msg: string) => showToast('error', msg),
  }
}
