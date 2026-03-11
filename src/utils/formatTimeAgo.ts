export function formatTimeAgo(dateString: string) {
  const created = new Date(dateString)
  const now = new Date()

  const diff = Math.floor((now.getTime() - created.getTime()) / 1000)

  if (diff < 0) return '방금 전'

  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) return '방금 전'
  if (diff < hour) return `${Math.floor(diff / minute)}분 전`
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`
  if (diff < week) return `${Math.floor(diff / day)}일 전`
  if (diff < month) return `${Math.floor(diff / week)}주 전`
  if (diff < year) return `${Math.floor(diff / month)}개월 전`

  return `${Math.floor(diff / year)}년 전`
}
