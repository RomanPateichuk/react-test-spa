import React, {ChangeEvent, useState} from "react";
import s from "./EditableSpan.module.css"


export type EditableSpanType = {
    title: string
    onChangeEditableSpan: (value: string, filter: string[]) => void
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo(({title, onChangeEditableSpan}) => {
    const [editMode, setEditMode] = useState(false)
    const [inputMode, setInputMode] = useState(title)

    const createTags = () => {
        return inputMode.split(" ").filter(w => w.includes("#"))
    }

    const makeEditMode = () => {
        setEditMode(true)
    }

    const makeWievMode = () => {
        setEditMode(false)
        onChangeEditableSpan(inputMode, createTags())
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
                : <HilightSpan makeEditMode={makeEditMode} title={title}/>}
        </>
    )
})

export type HilightSpanSpanType = {
    title: string
    makeEditMode: () => void
}

export const HilightSpan: React.FC<HilightSpanSpanType> = React.memo(({title, makeEditMode}) => {


    return (<>
            <span className={s.spanEditable} onDoubleClick={makeEditMode}>{
                title.split(" ")
                    .map((word, index) => word.includes("#") ?
                        <span className={s.spanEditableHilight} key={index}>{word + " "}</span>
                        : <span key={index}>{word + " "}</span>)
            }</span>
        </>
    )
})
