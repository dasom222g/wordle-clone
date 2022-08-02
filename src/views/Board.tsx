import React, { FC, MutableRefObject, useEffect, useRef } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import BoardLine from '../components/BoardLine'
import { WordDataListType } from '../lib/type'

interface Board {
  input: string
  currentIndex: number
  wordDataList: WordDataListType[]
  isFocus: boolean
  keyboardRef: MutableRefObject<KeyboardReactInterface | null>
  handleInputChange: (value: string, resultWordDataList: WordDataListType[]) => void
  handleSubmit: () => void
}

const Board: FC<Board> = ({
  input,
  currentIndex,
  wordDataList,
  isFocus,
  handleInputChange,
  handleSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { value } = e.target
    value = value.toUpperCase()
    const resultWordDataList = wordDataList.map((wordData, index) => {
      const isCurrentItem = Number(currentIndex) === index
      const { word } = wordData
      return {
        ...wordData,
        wordList: isCurrentItem
          ? wordData.wordList.map((word, index) => ({ ...word, data: value[index] || '' }))
          : wordData.wordList,
        word: isCurrentItem ? value : word,
        isCurrentItem,
      }
    })
    handleInputChange(value, resultWordDataList)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    e.key === 'Enter' && handleSubmit()
  }

  useEffect(() => {
    const { current } = inputRef
    current?.focus()
  }, [isFocus])

  return (
    <div className="h-full flex justify-center items-center">
      <input
        className="absolute w-0 h-0 overflow-hidden"
        ref={inputRef}
        name="board"
        maxLength={5}
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className="w-87.5 mx-auto grid grid-rows-6 gap-2">
        {wordDataList.map((wordData) => (
          <BoardLine key={wordData.id} wordList={wordData.wordList} />
        ))}
      </div>
    </div>
  )
}

export default Board
