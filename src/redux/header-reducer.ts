import {NotesListsType, removeLIstActionType} from "./list-reducer";
import {changeNoteActionType, NotesType} from "./note-reducer";

type changeHeaderTitleActionType = {
    type: "CHANGE-HEADER-TITLE",
    title: string
}

type createHashtagActionType = {
    type: "CREATE-HASHTAG",
    text: string
    filteredList: NotesListsType[],
    note: NotesType

}

type removeHashtagActionType = {
    type: "REMOVE-HASHTAG",
    text: string
    list: NotesListsType[],
    note: NotesType
}


type initialStateType = {
    title: string,
    hashtags: string[]
    filteredList: NotesListsType[],
    filteredNote: NotesType
}

const initialState: initialStateType = {
    title: "List",
    hashtags: [],
    filteredList: [],
    filteredNote: {}

}

type ActionType =
    changeHeaderTitleActionType
    | createHashtagActionType
    | removeLIstActionType
    | removeHashtagActionType
    | changeNoteActionType

export const headerReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CHANGE-HEADER-TITLE":
            return {...state, title: action.title}

        case "CREATE-HASHTAG":
            const newListNote = {...action.note}
            let keyList: NotesListsType[] = []
            for (let key in newListNote) {
                const result = newListNote[key].filter(el => el.filter.includes(action.text))
                if (result.length !== 0) {
                    const newList = action.filteredList.filter(el => el.id === key)
                    keyList = [...keyList, ...newList]
                }
            }
            return {
                ...state,
                hashtags: Array.from(new Set([...state.hashtags, action.text])),
                filteredList: Array.from(new Set([...state.filteredList, ...keyList]))
            }

        case "REMOVE-LIST":
            return {...state, filteredList: state.filteredList.filter(list => list.id !== action.id)}

        case "REMOVE-HASHTAG":
            const newLists = {...action.note}
            const newHashtags = [...state.hashtags.filter(el => el !== action.text)]

            let moveKeyList: NotesListsType[] = []

            for (let i = 0; i < action.list.length; i++) {
                const result = newLists[action.list[i].id].filter(el => el.filter.some(el => newHashtags.includes(el)))
                if (result.length !== 0 && newHashtags.length > 0) {
                    moveKeyList = [...moveKeyList, action.list[i]]
                } else if (newHashtags.length === 0) {
                    moveKeyList = [...moveKeyList = []]
                }

            }
            return {...state, hashtags: newHashtags, filteredList: [...state.filteredList = moveKeyList]}

        case "CHANGE-NOTE":
            return {...state, hashtags: [], filteredList: [...state.filteredList = []]}

        default:
            return state
    }

}

export const changeHeaderTitleAC = (title: string): changeHeaderTitleActionType => {
    return {
        type: "CHANGE-HEADER-TITLE",
        title: title
    }
}
export const createHashtagAC = (text: string, list: NotesListsType[], note: NotesType): createHashtagActionType => {
    return {
        type: "CREATE-HASHTAG",
        text: text,
        filteredList: list,
        note: note
    }
}

export const removeHashtagAC = (text: string, list: NotesListsType[], note: NotesType): removeHashtagActionType => {
    return {
        type: "REMOVE-HASHTAG",
        text: text,
        list: list,
        note: note
    }
}


