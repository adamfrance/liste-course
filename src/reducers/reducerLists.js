export const initialState = {
    lists: [],
    list: {},
    loading: false,
    error: ''
}

// 2 - definir des actions
// charger les listes ==> CHARGEMENT_LISTES ==> remplir tableau listes

export const reducerLists = (state, action) => {
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