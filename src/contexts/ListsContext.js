import { createContext, useReducer, useCallback } from 'react'
import useDataFetching from '../hooks/useDataFetching'


export const ListsContext = createContext()

// 1 - definir un etat initial
const initialState = {
    lists: [],
    list: {},
    loading: false,
    error: ''
}

// 2 - definir des actions
// charger les listes ==> CHARGEMENT_LISTES ==> remplir tableau listes

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_LISTS_SUCCESS':
            return {
                ...state,
                lists: action.payload,
                loading: true
            };
        case 'GET_LISTS_ERROR':
            return {
                ...state,
                lists: [],
                loading: false,
                error: action.payload
            };
        case 'GET_LIST_SUCCESS':
            return {
                ...state,
                list: action.payload,
                loading: true
            };
        case 'GET_LIST_ERROR':
            return {
                ...state,
                list: {},
                loading: false,
                error: action.payload
            };
        default:
            return state
    }
}

export const ListsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchLists = useCallback(
        async () => {
            try {
                const data = await fetch(`http://localhost:8000/lists`);
                const result = await data.json();

                if (result) {
                    dispatch({ type: 'GET_LISTS_SUCCESS', payload: result })
                }
            } catch (error) {
                dispatch({ type: 'GET_LISTS_ERROR', payload: error.message })
            }
        }, []
    )

    const fetchList = useCallback(
        async (listId) => {
            try {
                const data = await fetch(`http://localhost:8000/lists/${listId}`);
                const result = await data.json();

                if (result) {
                    dispatch({ type: 'GET_LIST_SUCCESS', payload: result })
                }
            } catch (error) {
                dispatch({ type: 'GET_LIST_ERROR', payload: error.message })
            }
        }, []
    )

    return (

        <ListsContext.Provider value={{ ...state, fetchLists, fetchList }}>{children}</ListsContext.Provider>
    )
}

export default ListsContextProvider