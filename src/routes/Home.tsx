import React, { FC, useEffect, useRef, useState } from 'react'
import { KeyboardReactInterface } from 'react-simple-keyboard'
import { useRecoilState } from 'recoil'
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
  shareTextState,
  solutionState,
  wordDataListState,
} from '../state/dataState'
import Borad from '../views/Board'
import KeyboardWrapper from '../views/KeyboardWrapper'
import { solutionList } from '../lib/utils'
import Modal from '../components/Modal'
import { initialBoardList, initialNoti, initialWordDataList } from '../state/initialState'
import Toast from '../components/Toast'

const Home: FC = () => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const [isFocus, setIsFocus] = useRecoilState(isFocusState)

  const [input, setInput] = useRecoilState(inputState)

  const [wordDataList, setWordDataList] = useRecoilState(wordDataListState)

  const [currentRow, setCurrentRow] = useRecoilState(currentRowState)

  const [solution, setSolution] = useRecoilState(solutionState)

  const [boardList, setBoardList] = useRecoilState(boardListState)

  const [shareText, setShareText] = useRecoilState(shareTextState)

  const [modalData, setModalData] = useState<NotiType>(initialNoti)

  const [toastData, setToastData] = useState<NotiType>(initialNoti)

  const [isCorrect, setIsCorrect] = useState(false)

  const [disabled, setDisabled] = useState(false)

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
    // ??????????????? ????????? ???????????? ??????
    if (!isExist) {
      const newData = {
        message: 'Not in wordList',
        isOpen: true,
      }
      setToastData(newData)
      return
    }
    // ?????? ??????
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
    // ???????????? ??????
    const solutionWordList = Array.from(solution.toUpperCase())
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

  const initData = (): void => {
    setWordDataList(initialWordDataList)
    setBoardList(initialBoardList)
    setIsCorrect(false)
  }

  const setRandomSoultion = (): void => {
    // ?????? ???????????? ????????????
    const num = Math.floor(Math.random() * solutionList.length + 1)
    const randomSolution = solutionList[num]
    setSolution(randomSolution)
    localStorage.setItem('CORRECT', randomSolution)
    // ????????? ?????????
    initData()
  }

  const handleCorrectReply = (): void => {
    setRandomSoultion()
    // ????????? ?????????
    setModalData(initialNoti)
    initData()
  }

  const handleModalClose = (): void => {
    // modal ????????? ?????????
    setModalData(initialNoti)
    setDisabled(true)
  }

  const setCopyText = (): string => {
    const date = new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0]
    const time = new Date().toTimeString().split(' ')[0]
    const evaluationList = wordDataList.map((wordData) =>
      wordData.wordList.map((word) => word.evaluation),
    )

    const titleText = `Wordle ${date} ${time} ${currentRow + 1}/${wordDataList.length}`
    const tileText = evaluationList
      .map((evaluation) =>
        evaluation
          .map((item) =>
            item ? (item === 'absent' ? '???' : item === 'present' ? '????' : '????') : '',
          )
          .join(''),
      )
      .filter((text) => text.length)
      .join('\n')

    return titleText + '\n\n' + tileText
  }

  // Life cycle

  useEffect(() => {
    const currentIndex = boardList.findIndex((board) => board === '')
    setCurrentRow(currentIndex)
  }, [boardList, setCurrentRow])

  useEffect(() => {
    // ??? ????????? input ?????????
    setInput('')
    keyboardRef.current?.setInput('')
    // ?????? ??? ????????? ??????
    if (currentRow < 0 && !isCorrect) {
      setModalData((data) => ({ ...data, message: 'End!', isOpen: true }))
      setShareText(setCopyText())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow, setInput])

  useEffect(() => {
    // ?????? ????????? ??????
    if (!isCorrect) return
    setModalData((data) => ({ ...data, message: 'Bingo!', isOpen: true }))
    setShareText(setCopyText())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect])

  useEffect(() => {
    setRandomSoultion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        disabled={disabled}
        handleInputChange={handelInputChange}
        handleSubmit={handleSubmit}
      />
      <KeyboardWrapper
        keyboardRef={keyboardRef}
        currentIndex={currentRow}
        wordDataList={wordDataList}
        disabled={disabled}
        handleKeyChange={handelKeyChange}
        handleSubmit={handleSubmit}
      />
      {modalData.isOpen && (
        <Modal
          data={modalData}
          shareText={shareText}
          handleModalClose={handleModalClose}
          handleCorrectReply={handleCorrectReply}
        />
      )}
      <Toast data={toastData} />
    </div>
  )
}

export default Home
