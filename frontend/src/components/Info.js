import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'

export const Info = () => {

    const { fetchAccount, email, firstName, lastName, number } = useContext(AuthContext)

    useEffect(() => {
        fetchAccount()
        // eslint-disable-next-line
    }, [email, firstName, lastName, number])

    return (
        <div className="info">
            <h2>Ваши данные</h2>
            <div className="info-body">
                <div className="info-item">
                    <p>E-mail:</p>
                    <p>{email}</p>
                </div>
                <div className="info-item">
                    <p>Имя:</p>
                    <p>{firstName}</p>
                </div>
                <div className="info-item">
                    <p>Фамилия:</p>
                    <p>{lastName}</p>
                </div>
                <div className="info-item">
                    <p>Номер:</p>
                    <p>{number}</p>
                </div>
            </div>
        </div>
    )
}
