import React from "react";

import s from "./Main.module.css"
import {NoteList} from "../NoteList/NoteList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../redux/store";
import {addNoteAC, NotesType, removeNoteAC} from "../../redux/note-reducer";
import {NotesListsType, removeLIstAC} from "../../redux/list-reducer";
import {removeHashtagAC} from "../../redux/header-reducer";


export const Main: React.FC = React.memo(() => {

    const lists = useSelector<AppRootType, NotesListsType[]>(state => state.lists)
    const filteredLists = useSelector<AppRootType, NotesListsType[]>(state => state.header.filteredList)
    const notes = useSelector<AppRootType, NotesType>(state => state.notes)
    const headerTags = useSelector<AppRootType, string[]>(state => state.header.hashtags)

    const dispatch = useDispatch()


    const deleteNote = (listId: string, noteId: string) => {
        dispatch(removeNoteAC(listId, noteId))
    }
    const addNote = (listId: string, text: string, filter: string[]) => {
        dispatch(addNoteAC(listId, text, filter))
    }
    const deleteList = (listId: string) => {
        dispatch(removeLIstAC(listId))
    }
    const removeTagButton = (el: string) => {
        dispatch(removeHashtagAC(el, lists, notes))
    }

    const newLists = filteredLists.length !== 0 ? filteredLists : lists

    return (
        <main className={s.main}>
            <div className={s.mainTags}>
                {headerTags.map((el, index) => <button key={index} className={s.buttonTag}
                                                       onClick={() => removeTagButton(el)}>{el}</button>)}
            </div>
            <div className={s.mainContaier}>
                {newLists.map((list) =>
                    <NoteList
                        notes={list}
                        key={list.id}
                        notesList={notes[list.id]}
                        listId={list.id}
                        addNote={addNote}
                        deleteNote={deleteNote}
                        deleteList={deleteList}
                    />
                )}
            </div>
        </main>
    )
})
