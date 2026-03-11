export function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisible = 10

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const start = Math.max(1, currentPage - 4)
  const end = Math.min(totalPages, start + maxVisible - 1)
  const adjustedStart = Math.max(1, end - maxVisible + 1)

  return Array.from(
    { length: end - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  )
}
