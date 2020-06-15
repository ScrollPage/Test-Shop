import {
    SET_LOADING_BASKET, 
    FETCH_BASKET_SUCCESS, 
    SET_PARAMS,
    SET_FLAG
} from '../types'

const handlers = {
    [SET_FLAG]: (state) => ({...state, flag: !state.flag}),
    [SET_LOADING_BASKET]: (state) => ({...state, loading: true}),
    [FETCH_BASKET_SUCCESS]: (state, {payload}) => ({...state, loading: false, basket: payload}),
    [SET_PARAMS]: (state, {payload}) => ({...state, price: payload.price, count: payload.count}),
    DEFAULT: state => state 
}

export const BasketReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}