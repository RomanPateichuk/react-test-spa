import {addLIstActionType, removeLIstActionType} from "./list-reducer";
import {v1} from "uuid";

export type NotesType = {
    [id: string]: NoteType[]
}

export type NoteType = {
    id: string;
    text: string;
    filter: string[]
}

const initialState: NotesType = {}

export type changeNoteActionType = {
    type: "CHANGE-NOTE",
    idList: string
    id: string,
    title: string
    filter: string[]
}

type removeNoteActionType = {
    type: "REMOVE-NOTE",
    idList: string,
    id: string,
}

type addNoteActionType = {
    type: "ADD-NOTE",
    idList: string,
    id: string,
    text: string,
    filter: string[]
}

type ActionType =
    removeLIstActionType
    | addLIstActionType
    | changeNoteActionType
    | removeNoteActionType
    | addNoteActionType

export const noteReducer = (state: NotesType = initialState, action: ActionType): NotesType => {
    switch (action.type) {
        case "ADD-LIST":
            return {...state, [action.id]: []}

        case "REMOVE-LIST":
            const copy = {...state}
            delete copy[action.id]
            return copy

        case "CHANGE-NOTE":
            const newNotesLists = state[action.idList].map(note => note.id === action.id ? {
                ...note,
                text: action.title,
                filter: [...note.filter = action.filter]
            } : note)
            return {...state, [action.idList]: newNotesLists}

        case "REMOVE-NOTE":
            const filterNotes = state[action.idList].filter(note => note.id !== action.id)
            return {...state, [action.idList]: [...filterNotes]}

        case "ADD-NOTE":
            const newNote = {id: action.id, text: action.text, filter: action.filter}
            return {...state, [action.idList]: [newNote, ...state[action.idList]]}

        default:
            return state
    }

}

export const changeNoteAC = (idList: string, id: string, title: string, filter: string[]): changeNoteActionType => {
    return {
        type: "CHANGE-NOTE",
        idList: idList,
        id: id,
        title: title,
        filter: filter
    }
}

export const removeNoteAC = (idList: string, id: string): removeNoteActionType => {
    return {
        type: "REMOVE-NOTE",
        idList: idList,
        id: id,
    }
}

export const addNoteAC = (idList: string, text: string, filter: string[]): addNoteActionType => {
    return {
        type: "ADD-NOTE",
        idList: idList,
        id: v1(),
        text: text,
        filter: filter
    }
}





