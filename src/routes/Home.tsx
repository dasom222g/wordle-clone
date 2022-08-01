import React, { FC, useEffect, useRef } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import { useRecoilState, useRecoilValue } from 'recoil'
import { EvaluationIndicatorType, FocusIndicatorType, WordDataListType } from '../lib/type'
import {
  boardListState,
  currentRowState,
  inputState,
  isFocusState,
  solutionState,
  wordDataListState,
} from '../state/dataState'
import Borad from '../views/Board'
import KeyboardWrapper from '../views/KeyboardWrapper'
import { solutionList } from '../lib/utils'

const Home: FC = () => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const [isFocus, setIsFocus] = useRecoilState(isFocusState)

  const [input, setInput] = useRecoilState(inputState)

  const [wordDataList, setWordDataList] = useRecoilState(wordDataListState)

  const [currentRow, setCurrentRow] = useRecoilState(currentRowState)

  const solution = useRecoilValue(solutionState)

  const [boardList, setBoardList] = useRecoilState(boardListState)

  const handleFocus = (type: FocusIndicatorType): void => {
    setIsFocus(type === 'focus')
  }
  const handelKeyChange = (value: string, resultWordDataList: WordDataListType[]): void => {
    setInput(value)
    setWordDataList(resultWordDataList)
  }

  const handelInputChange = (value: string, resultWordDataList: WordDataListType[]): void => {
    keyboardRef.current?.setInput(value)
    setInput(value)
    setWordDataList(resultWordDataList)
  }

  const handleSubmit = (): void => {
    checkBoard()
  }

  const checkBoard = (): void => {
    const submitWord = wordDataList[currentRow].word
    const isExist = solutionList.some((item) => item.toUpperCase() === submitWord)
    // 허용가능한 단어에 없는경우 에러
    if (!isExist) {
      alert('Not in wordList')
      // TODO : animate-wiggle 처리
      return
    }
    // 정답 체크
    const resultWordDataList = wordDataList.map((wordData, index) => {
      const isCurrentRow = index === currentRow
      const { wordList } = wordData
      return {
        ...wordData,
        wordList: isCurrentRow
          ? wordList.map((word, index) => ({ ...word, evaluation: checkCorrect(word.data, index) }))
          : wordData.wordList,
      }
    })
    console.log('resultWordDataList', resultWordDataList)
    setWordDataList(resultWordDataList)
    setBoardList((prev) => prev.map((item, index) => (index === currentRow ? submitWord : item)))
    setInput('')
  }

  const checkCorrect = (targetWord: string, targetIndex: number): EvaluationIndicatorType => {
    // 존재여부 체크
    const solutionWordList = Array.from(solution)
    const result: EvaluationIndicatorType =
      solutionWordList[targetIndex] === targetWord
        ? 'correct'
        : checkExist(solutionWordList, targetWord)
    console.log('targetWord', result)
    return result
  }

  const checkExist = (solutionWordList: string[], targetWord: string): EvaluationIndicatorType => {
    const result: EvaluationIndicatorType = solutionWordList.some(
      (solutionWord) => solutionWord === targetWord,
    )
      ? 'present'
      : 'absent'
    return result
  }

  useEffect(() => {
    console.log('boardList', boardList)
    // console.log('wordDataList', wordDataList)
  }, [boardList])

  useEffect(() => {
    const currentIndex = boardList.findIndex((board) => board === '')
    setCurrentRow(currentIndex)
  }, [boardList, setCurrentRow])

  return (
    <div
      onFocus={() => handleFocus('focus')}
      onBlur={() => handleFocus('blur')}
      className="max-w-125 mx-auto h-full flex flex-col p-4">
      <Borad
        input={input}
        currentIndex={currentRow}
        wordDataList={wordDataList}
        isFocus={isFocus}
        keyboardRef={keyboardRef}
        handleInputChange={handelInputChange}
      />
      <KeyboardWrapper
        keyboardRef={keyboardRef}
        currentIndex={currentRow}
        wordDataList={wordDataList}
        handleKeyChange={handelKeyChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Home
