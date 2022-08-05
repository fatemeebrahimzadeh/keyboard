import { useEffect, useState } from 'react';
import { MOUNT_KEYBOARD } from './@types/events';
import './App.css';
import { KeyboardSingleton } from './CustomKeyboard/Keyboard';
import TextArea, { ITextAreaValidationRules } from './TextArea/TextArea';
import { GlobalEvent } from './utils/event-emitter';

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
  })

  //#endregion

  return (
    <div className="App">
      <TextArea
        onFocus={() => { keyboard.onChangeHandlerCallBackSetter = (value) => setTextArea(value) }}
        value={textArea}
        onChange={setTextArea}
        validation={validationRuls}
        groupName="textArea"
      />
    </div>
  );
}

export default App;
