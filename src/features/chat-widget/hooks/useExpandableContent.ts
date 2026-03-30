import { useEffect, useRef, useState } from 'react'

type UseExpandableContentParams = {
  content: string | null | undefined
  collapsedHeightPx: number
  enabled?: boolean
}

export default function useExpandableContent({
  content,
  collapsedHeightPx,
  enabled = true,
}: UseExpandableContentParams) {
  // 실제 렌더링된 본문 높이를 측정하기 위한 ref
  const contentRef = useRef<HTMLDivElement | null>(null)
  // 더보기/접기 토글 상태
  const [isExpanded, setIsExpanded] = useState(false)
  // 본문이 접힘 기준 높이를 넘겼는지 여부
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const element = contentRef.current

    // 측정 대상이 없거나 기능이 비활성화된 경우 상태를 초기화
    if (!element || !content || !enabled) {
      setIsExpanded(false)
      setIsOverflowing(false)
      return
    }

    // 본문이 바뀌면 다시 접힌 상태부터 시작
    setIsExpanded(false)

    const updateOverflow = () => {
      setIsOverflowing(element.scrollHeight > collapsedHeightPx + 1)
    }

    updateOverflow()

    // 본문 높이가 바뀌는 경우를 대비해 ResizeObserver로 overflow 여부를 다시 계산
    const resizeObserver = new ResizeObserver(updateOverflow)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [collapsedHeightPx, content, enabled])

  return {
    contentRef,
    isExpanded,
    setIsExpanded,
    isOverflowing,
  }
}
