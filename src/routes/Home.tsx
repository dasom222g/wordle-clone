import React, { FC, useEffect, useRef } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { EvaluationIndicatorType, FocusIndicatorType, WordDataListType } from '../lib/type'
import {
  boardListState,
  currentRowState,
  evaluationListState,
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

  const setInput = useSetRecoilState(inputState)

  const [wordDataList, setWordDataList] = useRecoilState(wordDataListState)

  const [currentRow, setCurrentRow] = useRecoilState(currentRowState)

  const solution = useRecoilValue(solutionState)

  const [boardList, setBoardList] = useRecoilState(boardListState)
  const [evaluationList, setEvaluationList] = useRecoilState(evaluationListState)

  const handleFocus = (type: FocusIndicatorType): void => {
    setIsFocus(type === 'focus')
  }
  const handelKeyChange = (
    value: string,
    currentRow: number,
    resultWordDataList: WordDataListType[],
  ): void => {
    setInput(value)
    setCurrentRow(currentRow)
    setWordDataList(resultWordDataList)
  }

  const handleSubmit = (): void => {
    checkCorrect(currentRow)
  }

  const checkCorrect = (currentRow: number): void => {
    const submitWord = wordDataList[currentRow].word
    const submitWordList = Array.from(submitWord)
    const isExist = solutionList.some((item) => item.toUpperCase() === submitWord)
    // 허용가능한 단어에 없는경우 에러
    if (!isExist) {
      alert('Not in wordList')
      // TODO : animate-wiggle 처리
      return
    }
    // 정답 체크
    const correctCheckList: EvaluationIndicatorType[] = submitWordList.map((word, index) =>
      word === solution[index] ? 'correct' : null,
    )
    const resultEvaluationList: EvaluationIndicatorType[] = correctCheckList.map((check, index) => {
      return !check
        ? Array.from(solution).some((word) => word === submitWord[index])
          ? 'present'
          : 'absent'
        : check
    })
    setBoardList((prev) => prev.map((item, index) => (index === currentRow ? submitWord : item)))
    setEvaluationList((prev) =>
      prev.map((item, index) => (index === currentRow ? resultEvaluationList : item)),
    )
  }

  useEffect(() => {
    console.log('boardList', boardList)
    console.log('wordDataList', wordDataList)
    console.log('evaluationList', evaluationList)
  }, [boardList, wordDataList, evaluationList])

  return (
    <div
      onFocus={() => handleFocus('focus')}
      onBlur={() => handleFocus('blur')}
      className="max-w-125 mx-auto h-full flex flex-col p-4">
      <Borad isFocus={isFocus} keyboardRef={keyboardRef} />
      <KeyboardWrapper
        keyboardRef={keyboardRef}
        wordDataList={wordDataList}
        boardList={boardList}
        handleKeyChange={handelKeyChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Home
