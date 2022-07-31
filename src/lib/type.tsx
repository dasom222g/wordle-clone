const focusIndicator = {
  focus: 'focus',
  blur: 'blur',
} as const

export type FocusIndicatorType = typeof focusIndicator[keyof typeof focusIndicator] // 'focus' | 'blur'
