// 목록 조회 query string의 page/size 값을 양의 정수로 변환하고, 잘못된 값이면 기본값을 반환한다.
export function parsePositiveInt(
  value: string | null,
  fallback: number
): number {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback
  }

  return parsed
}
