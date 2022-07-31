import React, { FC, MutableRefObject, useState } from 'react'
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { WordDataListType } from '../lib/type'
import { boardListState, wordDataListState, inputState } from '../state/dataState'

interface KeyboardWrapperProp {
  keyboardRef: MutableRefObject<KeyboardReactInterface | null>
  handleSubmit: (currentRow: number) => void
}

const KeyboardWrapper: FC<KeyboardWrapperProp> = ({ keyboardRef, handleSubmit }) => {
  const [wordDataList, setWordDataList] = useRecoilState(wordDataListState)
  const boardList = useRecoilValue(boardListState)
  const setInput = useSetRecoilState(inputState)
  const [currentRow, setCurrentRow] = useState(0)

  const handleChange = (value: string): void => {
    const currentIndex = boardList.findIndex((board) => board === '')
    setCurrentRow(currentIndex)
    const resultWordDataList: WordDataListType[] = wordDataList.map((wordData, index) => {
      const isCurrentItem = Number(currentIndex) === index
      return {
        ...wordData,
        wordList: isCurrentItem
          ? wordData.wordList.map((word, index) => ({ ...word, data: value[index] || '' }))
          : wordData.wordList,
        word: isCurrentItem ? wordData.wordList.map((word) => word.data).join('') : wordData.word,
        isCurrentItem,
      }
    })
    setWordDataList(resultWordDataList)
    setInput(value)
  }

  const handleKeyPress = (value: string): void => {
    if (value !== '{enter}') return
    handleSubmit(currentRow)
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
