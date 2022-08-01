import React, { FC, MutableRefObject } from 'react'
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import { WordDataListType } from '../lib/type'

interface KeyboardWrapperProp {
  keyboardRef: MutableRefObject<KeyboardReactInterface | null>
  wordDataList: WordDataListType[]
  boardList: string[]
  handleKeyChange: (
    value: string,
    currentRow: number,
    resultWordDataList: WordDataListType[],
  ) => void
  handleSubmit: () => void
}

const KeyboardWrapper: FC<KeyboardWrapperProp> = ({
  keyboardRef,
  wordDataList,
  boardList,
  handleKeyChange,
  handleSubmit,
}) => {
  const handleChange = (value: string): void => {
    const currentIndex = boardList.findIndex((board) => board === '')
    const resultWordDataList: WordDataListType[] = wordDataList.map((wordData, index) => {
      const isCurrentItem = Number(currentIndex) === index
      return {
        ...wordData,
        wordList: isCurrentItem
          ? wordData.wordList.map((word, index) => ({ ...word, data: value[index] || '' }))
          : wordData.wordList,
        word: isCurrentItem ? value : wordData.word,
        isCurrentItem,
      }
    })
    handleKeyChange(value, currentIndex, resultWordDataList)
  }

  const handleKeyPress = (value: string): void => {
    if (value !== '{enter}') return
    handleSubmit()
  }

  return (
    <div>
      <Keyboard
        keyboardRef={(r) => (keyboardRef.current = r)}
        layoutName={'shift'}
        layout={{
          default: ['q w e r t y u i o p ', 'a s d f g h j k l', '{enter} z x c v b n m {bksp}'],
          shift: ['Q W E R T Y U I O P', 'A S D F G H J K L', '{enter} Z X C V B N M {bksp}'],
        }}
        maxLength={5}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default KeyboardWrapper
