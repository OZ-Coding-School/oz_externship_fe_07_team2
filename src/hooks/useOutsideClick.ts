import { useEffect, useRef, type RefObject } from 'react'

function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void
) {
  const onOutsideClickRef = useRef(onOutsideClick)

  useEffect(() => {
    onOutsideClickRef.current = onOutsideClick
  }, [onOutsideClick])

  useEffect(() => {
    const handleOutsideClick = (e: PointerEvent) => {
      if (!ref.current) return

      if (!ref.current.contains(e.target as Node)) {
        onOutsideClickRef.current()
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
    }
  }, [ref])
}

export default useOutsideClick
