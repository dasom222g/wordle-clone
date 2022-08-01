import { WordDataListType, WordListType } from '../lib/type'

export const initialWordList: WordListType[] = [
  {
    id: 1,
    data: '',
    evaluation: null,
  },
  {
    id: 2,
    data: '',
    evaluation: null,
  },
  {
    id: 3,
    data: '',
    evaluation: null,
  },
  {
    id: 4,
    data: '',
    evaluation: null,
  },
  {
    id: 5,
    data: '',
    evaluation: null,
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

export const initialSolution = 'UPSET'
