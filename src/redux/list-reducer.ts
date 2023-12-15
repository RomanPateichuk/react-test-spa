import {v1} from "uuid";


export type removeLIstActionType = {
    type: "REMOVE-LIST",
    id: string
}

export type addLIstActionType = {
    type: "ADD-LIST",
    id: string,
    title: string
}

export type changeListTitleActionType = {
    type: "CHANGE-LIST-TITLE",
    id: string,
    title: string
}

export type changeFilterActionType = {
    type: "CHANGE-FILTER",
    id: string,
    notes: string[]
}

type ActionType = removeLIstActionType | addLIstActionType | changeListTitleActionType | changeFilterActionType

export type NotesListsType = {
    id: string,
    title: string
}

const initialState: NotesListsType[] = []

export const listReducer = (state: NotesListsType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD-LIST":
            return [...state, {id: action.id, title: action.title}]

        case "REMOVE-LIST":
            return state.filter(list => list.id !== action.id)

        case "CHANGE-LIST-TITLE":
            return state.map(list => list.id === action.id ? {...list, title: action.title} : list)

        default:
            return state
    }
}


export const removeLIstAC = (listId: string): removeLIstActionType => {
    return {
        type: "REMOVE-LIST",
        id: listId
    }
}

export const addLIstAC = (title: string): addLIstActionType => {
    return {
        type: "ADD-LIST",
        id: v1(),
        title: title
    }
}

export const changeListTitleAC = (id: string, title: string): changeListTitleActionType => {
    return {
        type: "CHANGE-LIST-TITLE",
        id: id,
        title: title
    }
}




