const focusIndicator = {
  focus: 'focus',
  blur: 'blur',
} as const

export type FocusIndicatorType = typeof focusIndicator[keyof typeof focusIndicator] // 'focus' | 'blur'

const evaluationIndicator = {
  absent: 'absent', // gray
  present: 'present', // yellow
  correct: 'correct', // green
} as const

export type EvaluationIndicatorType =
  | typeof evaluationIndicator[keyof typeof evaluationIndicator]
  | null // 'absent' | 'present' | 'current'
export interface WordListType {
  id: number
  data: string
}

export interface WordDataListType {
  id: number
  wordList: WordListType[]
  word: string
  isCurrentItem: boolean
}
