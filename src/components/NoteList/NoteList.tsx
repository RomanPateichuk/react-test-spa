import React from "react";

import s from "./NoteList.module.css"
import {Note} from "../Note/Note";
import {Button} from "../Button/Button";
import {AddItem} from "../AddItem/AddItem";
import {EditableSpanTitle} from "../EditableSpanTitle/EditableSpanTitle";
import {changeNoteAC, NoteType} from "../../redux/note-reducer";
import {changeListTitleAC, NotesListsType} from "../../redux/list-reducer";
import {useDispatch} from "react-redux";


type NoteListType = {
    notes: NotesListsType,
    notesList: NoteType[],
    listId: string,
    addNote: (listId: string, text: string, filter: string[]) => void
    deleteNote: (listId: string, noteId: string) => void
    deleteList: (listId: string) => void
}


export const NoteList: React.FC<NoteListType> = React.memo(({
                                                                notes,
                                                                notesList,
                                                                listId,
                                                                addNote,
                                                                deleteNote,
                                                                deleteList,
                                                            }) => {

    const dispath = useDispatch()

    const addNoteHandler = (text: string, filter: string[]) => {
        addNote(listId, text, filter)
    }

    const onChangeEditableSpanList = (title: string) => {
        dispath(changeListTitleAC(listId, title))
    }

    const onChangeEditableSpanNote = (idList: string, idNote: string, title: string, filter: string[]) => {
        dispath(changeNoteAC(idList, idNote, title, filter))
    }


    return (
        <div className={s.noteList}>
            <div className={s.controlHeader}>
                <EditableSpanTitle title={notes.title} onChangeEditableSpan={onChangeEditableSpanList}/>
                <Button onClick={() => deleteList(listId)}>{"delete"}</Button>
            </div>
            <AddItem handlerAdd={addNoteHandler}/>
            <ul>
                {notesList.map((note) => <Note
                        text={note.text}
                        key={note.id}
                        deleteNote={deleteNote}
                        listId={listId}
                        noteId={note.id}
                        filter={note.filter}
                        onChangeEditableSpanNote={onChangeEditableSpanNote}
                    />
                )}
            </ul>
        </div>)
})
