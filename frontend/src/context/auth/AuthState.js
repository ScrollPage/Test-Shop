import React, {createContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import store from 'store'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../types'

export const AuthState = ({children}) => {

    const initialState = {
        token: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)



    const authSucces = (token) => dispatch({type: AUTH_SUCCESS, payload: token})

    const autoLogout = (time) => setTimeout(() => {dispatch(logout())}, time * 1000)

    const logout = () => {
        store.remove('token')
        store.remove('expirationDate')
        return {
            type: AUTH_LOGOUT
        }
    }

    const { token } = state

    return (
        <AuthContext.Provider value={{
            authSucces,
            autoLogout,
            logout,
            token
        }}>
           {children}
         </AuthContext.Provider>
    )
} 

AuthState.propTypes = {
    children: PropTypes.element
}

