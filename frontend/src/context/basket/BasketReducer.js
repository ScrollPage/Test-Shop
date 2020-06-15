import {
    SET_LOADING_BASKET, 
    FETCH_BASKET_SUCCESS
} from '../types'

const handlers = {
    [SET_LOADING_BASKET]: (state) => ({...state, loading: true}),
    [FETCH_BASKET_SUCCESS]: (state, {payload}) => ({...state, loading: false, basket: payload}),
    DEFAULT: state => state 
}

export const BasketReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}