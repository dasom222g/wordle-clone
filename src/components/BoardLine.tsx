import React, { FC } from 'react'
import { WordListType } from '../lib/type'

interface BoardLineProp {
  wordList: WordListType[]
}

const BoardLine: FC<BoardLineProp> = ({ wordList }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {wordList.map((word) => (
        <div
          key={word.id}
          className={`border-${word.evaluation ? '0' : '2'} border-gray-400 ${
            word.data && 'border-gray-900'
          } ${word.evaluation && `text-white bg-wordle-${word.evaluation}`}`}>
          <div className="w-full h-0 pb-full relative">
            <span className="absolute w-full h-full inline-flex justify-center items-center text-3xl">
              {word.data}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BoardLine
