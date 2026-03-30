export type QueueItem = {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}
