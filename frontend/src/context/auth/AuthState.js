import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import store from 'store'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'
import { AlertContext } from '../alert/AlertContext'
import { AUTH_SUCCESS, AUTH_LOGOUT, FETCH_ACCOUNT_SUCCESS } from '../types'

export const AuthState = ({ children }) => {

    const { show } = useContext(AlertContext)

    const initialState = {
        token: store.get('token') === undefined ? null : store.get('token'),
        email: "",
        firstName: "",
        lastName: "",
        number: ""
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const authLogin = async (email, password) => {
        await axios.post("http://localhost:8000/account/login", {
            username: email, password
        })
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24)
                store.set('token', response.data.token)
                store.set('expirationDate', expirationDate)
                store.set('email', email)
                store.remove('count')
                store.remove('price')
                store.remove('basket')

                authSuccess(response.data.token)
                autoLogout(3600 * 1000)
                show('Вы успешно вошли!', 'success')
                console.log(response.data)
            })
            .catch((error) => {
                show('Неверный логин или пароль!', 'warning')
                console.log(error);
            });
    }

    const authRegister = async (email, firstName, lastName, number, password) => {
        await axios.post("http://localhost:8000/account/register", {
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

    const onLogout = () => { show('Вы успешно вышли!', 'success'); logout(); }

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
        store.remove('email')
        store.remove('count')
        store.remove('price')
        store.remove('basket')
        store.remove('search')
        store.remove('ordering')
        dispatch({
            type: AUTH_LOGOUT
        })
    }

    const fetchAccount = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/account/api/${store.get('email')}`)
            fetchAccountSuccess(response.data[0])
        } catch(e) {
            console.log(e)
        }
    }

    const fetchAccountSuccess = (info) => dispatch({type: FETCH_ACCOUNT_SUCCESS, payload: info}) 

    const { token, firstName, lastName, number, email } = state

    return (
        <AuthContext.Provider value={{
            onLogout,
            autoLogin,
            authLogin,
            authRegister,
            authSuccess,
            autoLogout,
            logout,
            fetchAccount,
            token, firstName, lastName, number, email
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.element
}

