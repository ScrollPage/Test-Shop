import {
    AUTH_LOGOUT, AUTH_SUCCESS, FETCH_ACCOUNT_SUCCESS, SET_LOADING
} from '../types'

const handlers = {
    [AUTH_SUCCESS]: (state, {payload}) => ({...state, token: payload}),
    [SET_LOADING]: (state) => ({...state, loading: true}),
    [FETCH_ACCOUNT_SUCCESS]: (state, {payload}) => ({
        ...state, 
        email: payload.email, 
        firstName: payload.first_name, 
        lastName: payload.last_name, 
        number: payload.phone_number,
        loading: false
    }),
    [AUTH_LOGOUT]: (state) => ({...state, token: null}),
    DEFAULT: state => state 
}

export const AuthReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}