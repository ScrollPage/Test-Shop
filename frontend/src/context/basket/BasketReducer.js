import {
    SET_LOADING_BASKET,
    FETCH_BASKET_SUCCESS,
    SET_PARAMS,
    SET_FLAG,
    REMOVE_ITEM_TO_BASKET,
    ADD_ITEM_TO_BASKET,
    CLEAR_ITEM_TO_BASKET
} from '../types'

const handlers = {
    [SET_FLAG]: (state) => ({ ...state, flag: !state.flag }),
    [SET_LOADING_BASKET]: (state) => ({ ...state, loading: true }),
    [FETCH_BASKET_SUCCESS]: (state, { payload }) => ({ ...state, loading: false, basket: payload.basket, price: payload.price, count: payload.count }),
    [SET_PARAMS]: (state, { payload }) => ({ ...state, price: payload.price, count: payload.count }),
    [REMOVE_ITEM_TO_BASKET]: (state, { item, amount }) => ({
        ...state,
        price: state.price - item.price * amount < 0 ? 0 : state.price - item.price * amount,
        count: state.count - amount < 0 ? 0 : state.count - amount,
        basket: state.basket
            .filter(x => {
                if (x.product.id === item.id && x.amount === amount) {
                    return false
                }
                return true
            })
            .map(x => x.product.id === item.id ? { amount: x.amount - amount, id: x.id, product: x.product } : x)
    }),
    [ADD_ITEM_TO_BASKET]: (state, { item, amount }) => ({
        ...state,
        price: state.price + item.price * amount,
        count: state.count + amount,
        basket: state.basket
            .map(x => x.product.id === item.id ? { amount: x.amount + 1, id: x.id, product: x.product } : x)
    }),
    [CLEAR_ITEM_TO_BASKET]: (state) => ({ ...state, basket: [], price: 0, count: 0 }),
    DEFAULT: state => state
}

export const BasketReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}