import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CustomKeyboard.scss"
import "react-simple-keyboard/build/css/index.css";
import { KeyboardSingleton } from "./Keyboard";
import Drag from "../Drag/Drag";
import { GlobalEvent } from "../utils/event-emitter";
import { MOUNT_KEYBOARD } from "../@types/events";

interface IProps {
    visibility: Boolean
    keyContainerDetails?: DOMRect
    onKeyboardCloseIconClickHandler(event: React.MouseEvent<SVGSVGElement, MouseEvent>): void
}

interface IState {
    layoutName: string
    input: string
    mountedClientX: Number
}

class CustomKeyboard extends Component<IProps, IState> {

    dragReference: React.RefObject<HTMLDivElement> = React.createRef()
    dragMouseDown: React.MouseEventHandler<HTMLDivElement> | undefined

    attendedClass = ""
    keyboard = KeyboardSingleton.getInstance()
    keyboardRef: any
    mounted: boolean

    constructor(props: IProps) {
        super(props)
        this.mounted = false
        GlobalEvent.get().emit(MOUNT_KEYBOARD, "")
    }

    componentDidMount() {
        this.mounted = true
        this.setState({
            mountedClientX: this.props.keyContainerDetails!.x + this.props.keyContainerDetails!.width / 2 - 450
        })
    }

    state = {
        layoutName: "default",
        input: "",
        mountedClientX: 0
    };

    onChange = (input: string) => {
        // this.setState({ input });
        this.keyboard.valueSetter = input
    };

    onKeyPress = (button: string) => {
        // console.log("Button pressed", button);
        if (button === "{shift}" || button === "{lock}") this.handleShift();
        button === "{enter}" && this.keyboard.onEnterKeyPress()
    };

    handleShift = () => {
        const layoutName = this.state.layoutName;

        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default"
        });
    };

    render(): React.ReactNode {

        if (this.mounted) {
            this.keyboard.keyboardRefSetter = this.keyboardRef
            this.mounted = false
            this.dragMouseDown = Drag(this.dragReference)
        }

        if (this.props.visibility) {
            this.attendedClass = "keyboard--visible";
        }

        return (
            <div
                ref={this.dragReference}
                style={{ left: this.state.mountedClientX + "px" }}
                className={`keyboard ${this.attendedClass}`}>
                <header onMouseDown={this.dragMouseDown} className="keyboard__header">
                    {/* {this.props.onKeyboardCloseIconClickHandler && <FontAwesomeIcon
                        onClick={this.props.onKeyboardCloseIconClickHandler}
                        icon={faTimes}
                    />} */}
                </header>
                <Keyboard
                    keyboardRef={r => (this.keyboardRef = r)}
                    layoutName={this.state.layoutName}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    buttonTheme={[
                        {
                            class: "hg-button--blue",
                            buttons: "{enter}"
                        }
                    ]}
                />
            </div>
        )
    }
}

export default CustomKeyboard