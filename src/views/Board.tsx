import React, { FC, MutableRefObject, useEffect, useRef } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import { useRecoilState, useRecoilValue } from 'recoil'
import { wordDataListState, inputState, boardListState } from '../state/dataState'
import BoardLine from '../components/BoardLine'

interface Board {
  isFocus: boolean
  keyboardRef: MutableRefObject<KeyboardReactInterface | null>
}

const Board: FC<Board> = ({ isFocus, keyboardRef }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const boardList = useRecoilValue(boardListState)
  const [wordDataList, setWordDataList] = useRecoilState(wordDataListState)
  const [input, setInput] = useRecoilState(inputState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let { value } = e.target
    value = value.toUpperCase()
    const isCurrentIndex = wordDataList.findIndex((wordData) => wordData.isCurrentItem)
    const currentIndex =
      isCurrentIndex !== -1 ? isCurrentIndex : boardList.findIndex((board) => board === '')
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
    keyboardRef.current?.setInput(value)
    setInput(value)
    setWordDataList(resultWordDataList)
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
