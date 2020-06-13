import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/auth/AuthContext'

export const Logout = () => {

    const { logout } = useContext(AuthContext)

    useEffect(() => {
        logout()
    // eslint-disable-next-line
    }, [])

    return <Redirect to="/" exact/>
}
