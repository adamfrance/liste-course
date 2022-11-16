import { createContext, useCallback, useReducer } from 'react'
import useDataFetching from '../hooks/useDataFetching'
import { v4 as uuidv4 } from 'uuid';

export const ItemsContext = createContext()

const initialState = {
    items: [],
    loading: false,
    error: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_ITEMS_SUCCESS':
            return {
                ...state,
                items: action.payload,
                loading: true
            };
        case 'GET_ITEMS_ERROR':
            return {
                ...state,
                items: [],
                loading: false,
                error: action.payload
            };
        case 'ADD_ITEM_SUCCESS':
            return {
                ...state,
                items: [...state.items, action.payload],
                loading: true
            };
        default:
            return state
    }
}

export const ItemsContextProvider = ({ children }) => {
    // const [loading, error, data] = useDataFetching('http://localhost:8000/items');

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchItems = useCallback(
        async (listId) => {
            try {
                const data = await fetch(`http://localhost:8000/lists/${listId}/items`);
                const result = await data.json();

                if (result) {
                    dispatch({ type: 'GET_ITEMS_SUCCESS', payload: result })
                }
            } catch (error) {
                dispatch({ type: 'GET_ITEMS_ERROR', payload: error.message })
            }
        }, []
    )

    const addItem = useCallback(async (item) => {
        try {
            const data = await fetch(`http://localhost:8000/items`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item)
            })
            if (data) {
                dispatch({
                    type: 'ADD_ITEM_SUCCESS',
                    payload: item
                })
            }
        } catch {}
    }, [])

    return (

        <ItemsContext.Provider value={{...state, fetchItems, addItem}}>{children}</ItemsContext.Provider>
    )
}

export default ItemsContextProvider