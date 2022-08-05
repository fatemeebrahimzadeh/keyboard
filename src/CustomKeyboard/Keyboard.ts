import React from "react"

export class KeyboardSingleton {

    private static instance: KeyboardSingleton
    private mainValue: string = ''
    private keyboardRef: any
    onChangeHandlerCallBack?: (value: string, e?: React.ChangeEvent<any>) => void
    onChangeHandler?: (event?: React.ChangeEvent<any>, propsOnChange?: (value: string, e?: React.ChangeEvent<any>) => void, extrnalValue?: string) => void

    onEnterKeyPress: () => void = () => { }

    static getInstance() {
        if (!KeyboardSingleton.instance) {
            KeyboardSingleton.instance = new KeyboardSingleton()
        }
        return KeyboardSingleton.instance
    }

    static clear() {
        KeyboardSingleton.instance.onChangeHandlerCallBack = () => { }
        KeyboardSingleton.instance.onEnterKeyPress = () => { }
    }

    set valueSetter(value: any) {
        this.mainValue = value.toString()
        this.onChangeHandler && this.onChangeHandler(undefined, this.onChangeHandlerCallBack, value)
    }

    get valueGetter() {
        return this.mainValue
    }

    set keyboardRefSetter(keyboardRef: any) {
        this.keyboardRef = keyboardRef
    }

    get keyboardRefGetter() {
        return this.keyboardRef
    }

    set onChangeHandlerCallBackSetter(onChangeHandlerCallBack: (value: string, e?: React.ChangeEvent<HTMLTextAreaElement>) => void) {
        this.onChangeHandlerCallBack = onChangeHandlerCallBack
    }

    get onChangeHandlerCallBackGetter() {
        return this.onChangeHandlerCallBack
    }

    set onChangeHandlerSetter(onChangeHandler: (event?: React.ChangeEvent<any>, propsOnChange?: (value: string, e?: React.ChangeEvent<any>) => void, extrnalValue?: string) => void) {
        this.onChangeHandler = onChangeHandler
    }

    get onChangeHandlerGetter() {
        return this.onChangeHandler
    }
}
