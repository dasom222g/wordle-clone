import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import { FocusIndicatorType } from '../lib/type'
import { isFocusState } from '../state/dataState'
import Borad from '../views/Borad'
import KeyboardWrapper from '../views/KeyboardWrapper'

const Home: FC = () => {
  const [isFocus, setIsFocus] = useRecoilState(isFocusState)

  const handleFocus = (type: FocusIndicatorType): void => {
    setIsFocus(type === 'focus')
  }
  return (
    <div
      onFocus={() => handleFocus('focus')}
      onBlur={() => handleFocus('blur')}
      className="max-w-125 mx-auto h-full">
      <Borad isFocus={isFocus} />
      <KeyboardWrapper />
    </div>
  )
}

export default Home
