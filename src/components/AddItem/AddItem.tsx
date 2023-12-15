import s from "./AddItem.module.css";
import {Button} from "../Button/Button";
import React, {ChangeEvent, useState} from "react";


type AddItemType = {
    handlerAdd: (text: string,filter:string[]) => void
}

export const AddItem: React.FC<AddItemType> = React.memo(({handlerAdd}) => {

    const [text, setText] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }


    const createTags = () => {
        return text.split(" ").filter(w => w.includes("#"))
    }

    const onChangeText = () => {
        if (text.trim() !== "") {
            handlerAdd(text,createTags())
            setText("")
        }
    }

    return (
        <div className={s.control}>
            <input className={s.input} type="text" value={text} onChange={onChangeHandler}/>
            <Button onClick={onChangeText}>{"add"}</Button>
        </div>
    )
})
