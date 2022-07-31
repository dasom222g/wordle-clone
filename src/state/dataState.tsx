import { atom } from 'recoil'

export const isFocusState = atom<boolean>({
  key: 'isFocusState',
  default: false,
})
