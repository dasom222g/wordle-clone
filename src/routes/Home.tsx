import React, { FC, useEffect, useRef, useState } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  EvaluationIndicatorType,
  FocusIndicatorType,
  NotiType,
  WordDataListType,
} from '../lib/type'
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
import Modal from '../components/Modal'
import { initialNoti } from '../state/initialState'
import Toast from '../components/Toast'

const Home: FC = () => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const [isFocus, setIsFocus] = useRecoilState(isFocusState)

  const [input, setInput] = useRecoilState(inputState)

  const [wordDataList, setWordDataList] = useRecoilState(wordDataListState)

  const [currentRow, setCurrentRow] = useRecoilState(currentRowState)

  const solution = useRecoilValue(solutionState)

  const [boardList, setBoardList] = useRecoilState(boardListState)

  const [modalData, setModalData] = useState<NotiType>(initialNoti)

  const [toastData, setToastData] = useState<NotiType>(initialNoti)

  const [isCorrect, setIsCorrect] = useState(false)

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
      // TODO : animate-wiggle 처리
      setToastData((data) => ({ ...data, message: 'Not in wordList', isOpen: true }))
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
    const checkIsCorrect = resultWordDataList[currentRow].wordList.every(
      (word) => word.evaluation === 'correct',
    )
    checkIsCorrect && setIsCorrect(checkIsCorrect)
    setWordDataList(resultWordDataList)
    setBoardList((prev) => prev.map((item, index) => (index === currentRow ? submitWord : item)))
  }

  const checkCorrect = (targetWord: string, targetIndex: number): EvaluationIndicatorType => {
    // 존재여부 체크
    const solutionWordList = Array.from(solution)
    const result: EvaluationIndicatorType =
      solutionWordList[targetIndex] === targetWord
        ? 'correct'
        : checkExist(solutionWordList, targetWord)
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

  const handleModalClose = (): void => {
    // 데이터 초기화
    setModalData(initialNoti)
  }

  useEffect(() => {
    const currentIndex = boardList.findIndex((board) => board === '')
    setCurrentRow(currentIndex)
  }, [boardList, setCurrentRow])

  useEffect(() => {
    // 답 제출시 input 초기화
    setInput('')
    keyboardRef.current?.setInput('')
  }, [currentRow, setInput])

  useEffect(() => {
    // 최종 정답일 경우
    if (!isCorrect) return
    setModalData((data) => ({ ...data, message: 'Bingo!', isOpen: true }))
  }, [isCorrect])

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
        handleSubmit={handleSubmit}
      />
      <KeyboardWrapper
        keyboardRef={keyboardRef}
        currentIndex={currentRow}
        wordDataList={wordDataList}
        handleKeyChange={handelKeyChange}
        handleSubmit={handleSubmit}
      />
      {modalData.isOpen && <Modal data={modalData} handleModalClose={handleModalClose} />}
      <Toast data={toastData} />
    </div>
  )
}

export default Home
