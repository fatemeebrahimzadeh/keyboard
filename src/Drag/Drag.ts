import React, { FC, useEffect, useRef } from "react"

const Drag = (propsDragReference: React.RefObject<HTMLDivElement>) => {

    let dragReference = propsDragReference

    let pos1: number = 0
    let pos2: number = 0
    let pos3: number = 0
    let pos4: number = 0

    const dragMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    const elementDrag = (event: any) => {
        event.preventDefault();
        // console.log(event)
        // calculate the new cursor position:
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;

        // set the element's new position:
        if (dragReference.current!.offsetLeft - pos1 >= (window.innerWidth - dragReference.current!.offsetWidth)) {
            dragReference.current!.style.left = (window.innerWidth - dragReference.current!.offsetWidth) + "px";
        } else if (dragReference.current!.offsetLeft - pos1 <= 0) {
            dragReference.current!.style.left = 0 + "px";
        } else {
            dragReference.current!.style.left = (dragReference.current!.offsetLeft - pos1) + "px";
        }

        if (dragReference.current!.offsetTop - pos2 <= 0) {
            dragReference.current!.style.top = 0 + "px";
        } else if (dragReference.current!.offsetTop - pos2 >= window.innerHeight - dragReference.current!.offsetHeight) {
            dragReference.current!.style.top = (window.innerHeight - dragReference.current!.offsetHeight) + "px";
        } else {
            dragReference.current!.style.top = (dragReference.current!.offsetTop - pos2) + "px";
        }
    }

    const closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }

    return dragMouseDown
}

export default Drag