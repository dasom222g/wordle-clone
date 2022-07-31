import React, { FC, useEffect, useRef, useState } from 'react'

interface Borad {
  isFocus: boolean
}

const Borad: FC<Borad> = ({ isFocus }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [word, setWord] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const lastValue = value ? value[value.length - 1] : ''
    console.log('lastValue', lastValue)
    setWord(value)
  }

  // useEffect(() => {
  //   console.log('word', word)
  // }, [word])

  useEffect(() => {
    const { current } = inputRef
    current?.focus()
  }, [isFocus])

  return (
    <div>
      <input ref={inputRef} name="board" value={word} onChange={handleChange} />
    </div>
  )
}

export default Borad
