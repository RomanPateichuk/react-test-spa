import React, {ChangeEvent, useState} from "react";
import s from "./EditableSpanTitle.module.css"

export type EditableSpanType = {
    title: string
    onChangeEditableSpan: (value: string) => void
}

export const EditableSpanTitle: React.FC<EditableSpanType> = React.memo(({title, onChangeEditableSpan}) => {
    const [editMode, setEditMode] = useState(false)
    const [inputMode, setInputMode] = useState(title)

    const makeEditMode = () => {
        setEditMode(true)
    }

    const makeWievMode = () => {
        setEditMode(false)
        onChangeEditableSpan(inputMode)
    }

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMode(e.currentTarget.value)
    }

    return (<>
            {editMode ? <input className={s.inputEditable}
                               value={inputMode}
                               type="text"
                               onBlur={makeWievMode}
                               onChange={changeInputValue} autoFocus/>
                : <span className={s.spanEditable} onDoubleClick={makeEditMode}>{title}</span>}
        </>
    )
})
