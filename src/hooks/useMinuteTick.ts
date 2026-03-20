import { useEffect, useState } from 'react'

const ONE_MINUTE = 60 * 1000

export function useMinuteTick() {
  const [minuteTick, setMinuteTick] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMinuteTick((prevTick) => prevTick + 1)
    }, ONE_MINUTE)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return minuteTick
}
