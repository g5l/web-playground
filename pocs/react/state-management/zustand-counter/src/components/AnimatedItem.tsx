import { useEffect, useRef } from 'react'
import { useTransientStore } from '../stores/transientStore'

// Slow version - re-renders on each state change
export const AnimatedItemSlow = ({ id, offset }: { id: string; offset: number }) => {
  const coords = useTransientStore((state) => state.coordinates[id] || { x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate3d(${coords.x}px, ${offset}px, 0)`
    }
  }, [coords, offset])

  return <div ref={ref} className="animated-item" />
}

// Fast version - uses transient updates
export const AnimatedItemFast = ({ id, offset }: { id: string; offset: number }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = useTransientStore.subscribe(
      (state) => {
        const coords = state.coordinates[id] || { x: 0, y: 0 }
        if (ref.current) {
          ref.current.style.transform = `translate3d(${coords.x}px, ${offset}px, 0)`
        }
      }
    )

    return () => unsubscribe()
  }, [id, offset])

  return <div ref={ref} className="animated-item" />
} 