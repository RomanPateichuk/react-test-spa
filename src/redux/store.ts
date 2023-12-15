import {combineReducers, createStore} from "redux";
import {listReducer} from "./list-reducer";
import {noteReducer} from "./note-reducer";
import {headerReducer} from "./header-reducer";


const rootReducer = combineReducers({
    lists: listReducer,
    notes: noteReducer,
    header: headerReducer
})

let preloadedState;
const persistedTodosString = localStorage.getItem("state")
if (persistedTodosString) {
    preloadedState = JSON.parse(persistedTodosString)
}

export type AppRootType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer,
    preloadedState
)

store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()))
})

// @ts-ignore
window.store = store
