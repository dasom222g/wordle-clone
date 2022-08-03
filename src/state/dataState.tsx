import { atom } from 'recoil'
import { WordDataListType } from '../lib/type'
import { initialBoardList, initialSolution, initialWordDataList } from './initialState'

export const isFocusState = atom<boolean>({
  key: 'isFocusState',
  default: false,
})

export const wordDataListState = atom<WordDataListType[]>({
  key: 'wordDataListState',
  default: initialWordDataList,
})

export const currentRowState = atom<number>({
  key: 'currentRowState',
  default: 0,
})

export const boardListState = atom<string[]>({
  key: 'boardListState',
  default: initialBoardList,
})

export const inputState = atom<string>({
  key: 'inputState',
  default: '',
})

export const solutionState = atom<string>({
  key: 'solutionState',
  default: initialSolution,
})

export const shareTextState = atom<string>({
  key: 'shareTextState',
  default: '',
})
