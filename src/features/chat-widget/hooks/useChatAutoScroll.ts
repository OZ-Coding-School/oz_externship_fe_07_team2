import { useEffect, useRef, useState } from 'react'

type UseChatAutoScrollParams = {
  latestMessageKey: string
  isStreaming?: boolean
  scrollToLatestKey?: number
}

const BOTTOM_THRESHOLD = 24

export default function useChatAutoScroll({
  latestMessageKey,
  isStreaming = false,
  scrollToLatestKey = 0,
}: UseChatAutoScrollParams) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const isAutoFollowingRef = useRef(true)
  const isProgrammaticScrollRef = useRef(false)
  const programmaticScrollTimeoutRef = useRef<number | null>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  const updateBottomState = () => {
    const element = containerRef.current

    if (!element) return false

    const isNearBottom =
      element.scrollTop + element.clientHeight >=
      element.scrollHeight - BOTTOM_THRESHOLD

    setShowScrollButton(!isNearBottom)
    return isNearBottom
  }

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (!bottomRef.current) return

    isProgrammaticScrollRef.current = true
    if (programmaticScrollTimeoutRef.current !== null) {
      window.clearTimeout(programmaticScrollTimeoutRef.current)
    }
    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
      updateBottomState()
      programmaticScrollTimeoutRef.current = null
    }, 500)

    bottomRef.current.scrollIntoView({
      block: 'end',
      behavior,
    })
    setShowScrollButton(false)
  }

  // 새 요청이 시작되면 다시 자동 추적
  useEffect(() => {
    if (scrollToLatestKey === 0) return

    isAutoFollowingRef.current = true
    const frameId = window.requestAnimationFrame(() => {
      scrollToBottom('smooth')
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [scrollToLatestKey])

  // 자동 추적 중이면 새 답변을 따라감
  useEffect(() => {
    if (!isAutoFollowingRef.current) return

    const behavior: ScrollBehavior = isStreaming ? 'auto' : 'auto'
    scrollToBottom(behavior)
  }, [isStreaming, latestMessageKey])

  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) {
      return
    }

    const isNearBottom = updateBottomState()

    if (!isNearBottom) {
      // 사용자가 직접 위로 올리면 자동 추적 중단
      isAutoFollowingRef.current = false
    }
  }

  useEffect(
    () => () => {
      if (programmaticScrollTimeoutRef.current !== null) {
        window.clearTimeout(programmaticScrollTimeoutRef.current)
      }
    },
    []
  )

  return {
    containerRef,
    bottomRef,
    showScrollButton,
    handleScroll,
    scrollToBottom: () => {
      isAutoFollowingRef.current = true
      scrollToBottom('smooth')
    },
  }
}
