import React from "react";
import s from "./Note.module.css"
import {Button} from "../Button/Button";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {createHashtagAC} from "../../redux/header-reducer";
import {AppRootType} from "../../redux/store";
import {NotesListsType} from "../../redux/list-reducer";
import {NotesType} from "../../redux/note-reducer";
import Tooltip from '@mui/material/Tooltip';


type NoteType = {
    text: string
    filter: string[]
    listId: string
    deleteNote: (listId: string, noteId: string) => void,
    noteId: string
    onChangeEditableSpanNote: (idList: string, idNote: string, title: string, filter: string[]) => void
}

export const Note: React.FC<NoteType> = React.memo(({
                                                        text,
                                                        filter,
                                                        deleteNote,
                                                        listId,
                                                        noteId,
                                                        onChangeEditableSpanNote
                                                    }) => {

    const lists = useSelector<AppRootType, NotesListsType[]>(state => state.lists)
    const notes = useSelector<AppRootType, NotesType>(state => state.notes)
    const dispatch = useDispatch()

    const onChangeTitleNote = (title: string, filter: string[]) => {
        onChangeEditableSpanNote(listId, noteId, title, filter)
    }

    const createTagButton = (el: string) => {
        dispatch(createHashtagAC(el, lists, notes))
    }

    return (
        <div>
            <Tooltip disableFocusListener disableTouchListener title="double click on the text to edit">
                <li className={s.note}>
                    <div className={s.noteContainer}>
                        <EditableSpan title={text} onChangeEditableSpan={onChangeTitleNote}/>
                        <Button onClick={() => deleteNote(listId, noteId)}>
                            {"delete"}
                        </Button>
                    </div>
                </li>
            </Tooltip>
            <div>
                {filter.map((el, index) => <button key={index} className={s.buttonTag}
                                                   onClick={() => createTagButton(el)}>{el}</button>)}
            </div>
        </div>
    )
})


