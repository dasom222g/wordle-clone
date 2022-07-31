import React, { FC } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

const KeyboardWrapper: FC = () => {
  const onKeyPress = (input: string): void => {
    console.log('onKeyPress', input)
  }
  const onChange = (input: string): void => {
    console.log('onChange', input)
  }

  return (
    <div>
      <Keyboard
        layoutName={'shift'}
        layout={{
          default: ['q w e r t y u i o p ', 'a s d f g h j k l', '{enter} z x c v b n m {bksp}'],
          shift: ['Q W E R T Y U I O P', 'A S D F G H J K L', '{enter} Z X C V B N M {bksp}'],
        }}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onRender={() => console.log('Rendered')}
      />
    </div>
  )
}

export default KeyboardWrapper
