import React, { FC, useRef } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FocusIndicatorType } from '../lib/type'
import { isFocusState, solutionState, wordDataListState } from '../state/dataState'
import Borad from '../views/Board'
import KeyboardWrapper from '../views/KeyboardWrapper'
import { solutionList } from '../lib/utils'

const Home: FC = () => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const [isFocus, setIsFocus] = useRecoilState(isFocusState)
  const wordDataList = useRecoilValue(wordDataListState)

  const solution = useRecoilValue(solutionState)

  const handleFocus = (type: FocusIndicatorType): void => {
    setIsFocus(type === 'focus')
  }

  const handleSubmit = (currentRow: number): void => {
    checkCorrect(currentRow)
  }

  const checkCorrect = (currentRow: number): void => {
    const submitWord = wordDataList[currentRow].word
    const isExist = solutionList.some((item) => item.toUpperCase() === submitWord)
    // 허용가능한 단어에 없는경우 에러
    if (!isExist) {
      console.error('error')
      // TODO : animate-wiggle 처리
      return
    }
    console.log('solution', solution)
  }

  return (
    <div
      onFocus={() => handleFocus('focus')}
      onBlur={() => handleFocus('blur')}
      className="max-w-125 mx-auto h-full flex flex-col p-4">
      <Borad isFocus={isFocus} keyboardRef={keyboardRef} />
      <KeyboardWrapper keyboardRef={keyboardRef} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Home
