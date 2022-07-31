import { atom } from 'recoil'
import { EvaluationIndicatorType, WordDataListType } from '../lib/type'
import {
  initialBoardList,
  initialEvaluationList,
  initialSolution,
  initialWordDataList,
} from './initialState'

export const isFocusState = atom<boolean>({
  key: 'isFocusState',
  default: false,
})

export const wordDataListState = atom<WordDataListType[]>({
  key: 'wordDataListState',
  default: initialWordDataList,
})

export const boardListState = atom<string[]>({
  key: 'boardListState',
  default: initialBoardList,
})

export const evaluationListState = atom<EvaluationIndicatorType[][]>({
  key: 'evaluationListState',
  default: initialEvaluationList,
})

export const inputState = atom<string>({
  key: 'inputState',
  default: '',
})

export const solutionState = atom<string>({
  key: 'solutionState',
  default: initialSolution,
})
