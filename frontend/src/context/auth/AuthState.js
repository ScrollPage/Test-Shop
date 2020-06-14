import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import store from 'store'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'
import { AlertContext } from '../alert/AlertContext'
import { AUTH_SUCCESS, AUTH_LOGOUT } from '../types'

export const AuthState = ({ children }) => {

    const { show } = useContext(AlertContext)

    const initialState = {
        token: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const authLogin = (email, password) => {
        axios.post("http://localhost:8000/account/login", {
            username: email, password
        })
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + 60 * 1000)
                store.set('token', response.data.token)
                store.set('expirationDate', expirationDate)

                authSuccess(response.data.token)
                autoLogout(60)
                show('Вы успешно вошли!', 'success')
                console.log(response.data)
            })
            .catch((error) => {
                show('Неверный логин или пароль!', 'warning')
                console.log(error);
            });
    }

    const authRegister = (email, firstName, lastName, number, password) => {
        axios.post("http://localhost:8000/account/register", {
            email: email, first_name: firstName, last_name: lastName, phone_number: number, password: password
        })
            .then((response) => {
                show('На ваш E-mail пришло письмо с подтверждением!', 'success')
            })
            .catch((error) => {
                show('Пользователь с такими данными уже существует!', 'warning')
                console.log(error);
            });
    }

    const authSuccess = (token) => dispatch({ type: AUTH_SUCCESS, payload: token })

    const autoLogout = (time) => setTimeout(() => { logout() }, time * 1000)

    const onLogout = () => { show('Вы успешно вышли!', 'success'); logout();}

    const autoLogin = () => {
        const token = store.get('token')
        if (!token) {
            logout()
        } else {
            const expirationDate = new Date(store.get('expirationDate'))
            if (expirationDate <= new Date()) {
                logout()
            } else {
                authSuccess(token)
                autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
            }
        }
    }

    const logout = () => {
        store.remove('token')
        store.remove('expirationDate')
        dispatch({
            type: AUTH_LOGOUT
        })
    }

    const { token } = state

    return (
        <AuthContext.Provider value={{
            onLogout,
            autoLogin,
            authLogin,
            authRegister,
            authSuccess,
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

