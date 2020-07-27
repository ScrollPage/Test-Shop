import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import store from 'store'
import qs from 'qs';
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'
import { AlertContext } from '../alert/AlertContext'
import { AUTH_SUCCESS, AUTH_LOGOUT, FETCH_ACCOUNT_SUCCESS, SET_LOADING } from '../types'
import {localhost} from '../../config'

export const AuthState = ({ children }) => {

    const { show } = useContext(AlertContext)

    const initialState = {
        token: store.get('token') === undefined ? null : store.get('token'),
        email: null,
        firstName: null,
        lastName: null,
        number: null,
        loading: false
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const authLogin = async (email, password) => {
        await axios.post(`${localhost}/account/login`, {
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
                fetchAccount()

                show('Вы успешно вошли!', 'success')
                console.log(response.data)
            })
            .catch((error) => {
                show('Неверный логин или пароль!', 'warning')
                console.log(error);
            });
    }

    const authRegister = async (email, firstName, lastName, number, password) => {
        await axios.post(`${localhost}/account/register`, {
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
        store.remove('isAdmin')
        dispatch({
            type: AUTH_LOGOUT
        })
    }

    const fetchAccount = async () => {
        try {
            const response = await axios.get(`${localhost}/account/api/${store.get('email')}`)
            fetchAccountSuccess(response.data[0])
            store.set('isAdmin', response.data[0].is_superuser)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchAccountSuccess = (info) => dispatch({ type: FETCH_ACCOUNT_SUCCESS, payload: info })

    const changeAccount = async (email, firstName, lastName, number) => {
        setLoading()
        const data = { email, first_name: firstName, last_name: lastName, phone_number: number }
        const options = {
            method: 'PUT',
            url: `${localhost}/account/data_change/${store.get('email')}`,
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                store.set('email', email)
                fetchAccountSuccess(data)
                show('Вы успешно сменили данные!', 'success')
            })
            .catch((error) => {
                console.log(error);
                show('Что-то пошло не так!', 'warning')
            });
    }

    const changePassword = async (password) => {
        const data = { email: store.get('email'), password }
        const options = {
            method: 'POST',
            url: `${localhost}/acc/password_change`,
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                console.log(response.data)
                show('Вы успешно сменили пароль!', 'success')
            })
            .catch((error) => {
                console.log(error);
                show('Что-то пошло не так!', 'warning')
            });
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    const { token, firstName, lastName, number, email, loading } = state

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
            changeAccount,
            changePassword,
            token, firstName, lastName, number, email, loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.element
}

