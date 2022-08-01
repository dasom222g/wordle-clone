import { EvaluationIndicatorType, WordDataListType, WordListType } from '../lib/type'

export const initialWordList: WordListType[] = [
  {
    id: 1,
    data: '',
  },
  {
    id: 2,
    data: '',
  },
  {
    id: 3,
    data: '',
  },
  {
    id: 4,
    data: '',
  },
  {
    id: 5,
    data: '',
  },
]

export const initialWordDataList: WordDataListType[] = [
  {
    id: 1,
    wordList: initialWordList,
    word: '',
    isCurrentItem: false,
  },
  {
    id: 2,
    wordList: initialWordList,
    word: '',
    isCurrentItem: false,
  },
  {
    id: 3,
    wordList: initialWordList,
    word: '',
    isCurrentItem: false,
  },
  {
    id: 4,
    wordList: initialWordList,
    word: '',
    isCurrentItem: false,
  },
  {
    id: 5,
    wordList: initialWordList,
    word: '',
    isCurrentItem: false,
  },
  {
    id: 6,
    wordList: initialWordList,
    word: '',
    isCurrentItem: false,
  },
]

export const initialBoardList = ['', '', '', '', '', '']

export const emptyList: EvaluationIndicatorType[] = [null, null, null, null, null]

export const initialEvaluationList = [
  emptyList,
  emptyList,
  emptyList,
  emptyList,
  emptyList,
  emptyList,
]

export const initialSolution = 'UPSET'
