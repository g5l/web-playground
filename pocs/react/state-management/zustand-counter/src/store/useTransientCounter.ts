import { create } from 'zustand'

interface TransientState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useTransientCounter = create<TransientState>()((set, get) => ({
  count: 0,
  increment: () => {
    const currentCount = get().count
    set({ count: currentCount + 1 }, false)
  },
  decrement: () => {
    const currentCount = get().count
    set({ count: currentCount - 1 }, false)
  },
})) 