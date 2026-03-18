import { useEffect, useState } from 'react'

export function useResponsiveDirection() {
  const [direction, setDirection] = useState<'row' | 'column'>('row')

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) =>
      setDirection(e.matches ? 'column' : 'row')

    setDirection(mq.matches ? 'column' : 'row')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return direction
}
