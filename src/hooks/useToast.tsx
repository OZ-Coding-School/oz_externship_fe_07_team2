import { toast } from 'react-hot-toast'

export function useToast() {
  return {
    success: (msg: string) => toast.success(msg),
    error: (msg: string) => toast.error(msg),
  }
}
