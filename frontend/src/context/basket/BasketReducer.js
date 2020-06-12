import {
    ADD_ITEM_TO_BASKET
} from '../types'

const handlers = {
    [ADD_ITEM_TO_BASKET]: (state, {payload}) => ([...state, payload]),
    DEFAULT: state => state 
}

export const BasketReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}