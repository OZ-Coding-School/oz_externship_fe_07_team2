import type { QueueItem } from '@/types'

let isRefreshing = false
let queue: QueueItem[] = []

export const addToQueue = (item: QueueItem) => queue.push(item)

export const flushQueue = (error: unknown, token: string | null) => {
  queue.forEach(({ resolve, reject }) =>
    token ? resolve(token) : reject(error)
  )
  queue = []
}

export const getIsRefreshing = () => isRefreshing
export const setIsRefreshing = (value: boolean) => {
  isRefreshing = value
}
