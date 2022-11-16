import { createContext, useReducer, useCallback } from 'react'
import { reducerLists, initialState } from '../reducers/reducerLists'



export const ListsContext = createContext()

// 1 - definir un etat initial


export const ListsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducerLists, initialState)

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