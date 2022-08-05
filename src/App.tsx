import { useEffect, useRef, useState } from 'react';
import { MOUNT_KEYBOARD } from './@types/events';
import './App.css';
import { KeyboardSingleton } from './CustomKeyboard/Keyboard';
import TextArea, { ITextAreaValidationRules } from './TextArea/TextArea';
import { GlobalEvent } from './utils/event-emitter';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import useBoolean from './useBoolean/useBoolean';
import CustomKeyboard from './CustomKeyboard/CustomKeyboard';

function App() {

  //#region textArea

  const [textArea, setTextArea] = useState<string>('')

  let validationRuls: ITextAreaValidationRules[] = [{ name: "required" }]

  //#endregion

  //#region keyboard

  let keyboard = KeyboardSingleton.getInstance()

  useEffect(() => {
    KeyboardSingleton.clear()
    GlobalEvent.get().subscribe(MOUNT_KEYBOARD, KeyboardSingleton.clear)
    return () => {
      GlobalEvent.get().unsubscribe(MOUNT_KEYBOARD, KeyboardSingleton.clear)
    }
  }, [])

  const [keyboardVisibility,
    setKeyboardVisibility,
    setTrueKeyboardVisibility,
    setFalseKeyboardVisibility,
    toggleKeyboardVisibility] = useBoolean(false)

  const keyContainerRef = useRef<HTMLButtonElement>(null)

  //#endregion

  return (
    <>
      <div className="App">
        <div className='container'>
          <TextArea
            onFocus={() => { keyboard.onChangeHandlerCallBackSetter = (value) => setTextArea(value) }}
            value={textArea}
            onChange={setTextArea}
            validation={validationRuls}
            groupName="textArea"
          />
          <button ref={keyContainerRef} onClick={toggleKeyboardVisibility}>
            <KeyboardIcon />
          </button>
          {keyboardVisibility && <CustomKeyboard
            onKeyboardCloseIconClickHandler={setFalseKeyboardVisibility}
            visibility={keyboardVisibility}
            keyContainerDetails={keyContainerRef.current?.getBoundingClientRect()}
          />}
        </div>
      </div>
      <p>open the keyboard first, then focus on textArea</p>
    </>
  );
}

export default App;
