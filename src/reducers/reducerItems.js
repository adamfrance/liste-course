export const initialState = {
    items: [],
    loading: false,
    error: ''
}

export const reducerItems = (state, action) => {
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
        case 'DELETE_ITEM_SUCCESS':
            const newList = state.items.filter(item => item.id !== action.payload)
            return {
                ...state,
                items : [...newList],
                error: ''
            }
        case 'UPDATE_ITEM_SUCCESS' : 
            const editedItem = action.payload
            const listItems = [...state.items]
            const idEditedItem = editedItem.id
            const listWithoutEditedItem = listItems.filter( function(item) {
                return idEditedItem.indexOf(item.id) === -1
            })
            return {
                ...state,
                items : [editedItem, ...listWithoutEditedItem],
                error: ''
            }
        default:
            return state
    }
}