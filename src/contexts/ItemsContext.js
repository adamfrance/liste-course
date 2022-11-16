import { createContext, useCallback, useReducer } from 'react'
import { reducerItems, initialState } from '../reducers/reducerItems'



export const ItemsContext = createContext()



export const ItemsContextProvider = ({ children }) => {
    // const [loading, error, data] = useDataFetching('http://localhost:8000/items');

    const [state, dispatch] = useReducer(reducerItems, initialState)

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
    
    const deleteItem = useCallback(async (id) => {
        try {

            dispatch({type: 'DELETE_ITEM_SUCCESS', payload: id})
            await fetch(`http://localhost:8000/items/${id}`, {
                method: 'DELETE',
            })
            } catch {}
    }, [])

    const updateItem = useCallback(async (item) => {
        try {
            const data = await fetch(`http://localhost:8000/items/${item.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item)
            })
            if (data) {
                dispatch({
                    type: 'UPDATE_ITEM_SUCCESS',
                    payload: item
                })
            }
        } catch (error) {
            
        }
    })

    return (

        <ItemsContext.Provider value={{...state, fetchItems, addItem, deleteItem}}>{children}</ItemsContext.Provider>
    )
}

export default ItemsContextProvider