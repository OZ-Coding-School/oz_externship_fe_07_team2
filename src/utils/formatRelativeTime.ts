export function formatRelativeTime(dateString: string) {
  const now = new Date()
  const created = new Date(dateString)

  const diff = now.getTime() - created.getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (hours < 24) {
    return `${hours}시간 전`
  }

  if (days < 7) {
    return `${days}일 전`
  }

  return created.toLocaleDateString('ko-KR')
}
