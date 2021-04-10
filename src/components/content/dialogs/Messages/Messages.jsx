import React from "react"
import s from "./messages.module.css"

const Message = (props) => {
    return (
        <div className={s.message}>
            {props.value}
        </div>
    )
}

export default Message