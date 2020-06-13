import {
    AUTH_LOGOUT, AUTH_SUCCESS
} from '../types'

const handlers = {
    [AUTH_SUCCESS]: (state, {payload}) => ({...state, token: payload}),
    [AUTH_LOGOUT]: (state) => ({...state, token: null}),
    DEFAULT: state => state 
}

export const AuthReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}