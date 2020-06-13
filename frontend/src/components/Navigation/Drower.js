import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { Backdrop } from './Backdrop'
import { AuthContext } from '../../context/auth/AuthContext'

export function Drower({ onClose, isOpen }) {

    const { token, onLogout } = useContext(AuthContext)
    const isAuthenticated = !!token

    return (
        <Fragment>
            <div className={isOpen ? "drower" : "drower close"}>
                <ul>
                    <li>
                        <NavLink exact to="/" className="nav-link" onClick={() => onClose()}>Главная</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/items" className="nav-link" onClick={() => onClose()}>Каталог</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="nav-link" onClick={() => onClose()}>О нас</NavLink>
                    </li>
                    <li>
                        <NavLink to="/basket" className="nav-link" onClick={() => onClose()}>Корзина</NavLink>
                    </li>
                    <li>
                        {
                            isAuthenticated 
                             ? <NavLink exact to="/" className="nav-link active-none" onClick={() => {onClose(); onLogout();}}>Выйти</NavLink> 
                             : <NavLink to="/log" className="nav-link" onClick={() => {onClose();}}>Войти</NavLink>
                        }
                    </li>
                </ul>
            </div>
            {
                isOpen
                    ? <Backdrop onClick={() => onClose()} />
                    : null
            }
        </Fragment>
    )
}

Drower.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
}
