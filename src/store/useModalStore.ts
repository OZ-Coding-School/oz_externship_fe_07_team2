import { create } from 'zustand'

type ModalState = {
  isUnauthorizedOpen: boolean
  openUnauthorized: () => void
  closeUnauthorized: () => void
}

export const useModalStore = create<ModalState>()((set) => ({
  isUnauthorizedOpen: false,
  openUnauthorized: () => set({ isUnauthorizedOpen: true }),
  closeUnauthorized: () => set({ isUnauthorizedOpen: false }),
}))
