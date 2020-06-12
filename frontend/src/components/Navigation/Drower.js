import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

import firebase from '../../config/firebase'
import { AuthContext } from '../../context/auth/AuthState'
import { AlertContext } from '../../context/alert/AlertContext'
import { Backdrop } from './Backdrop'

export function Drower({onClose, isOpen}) {

    const { currentUser } = useContext(AuthContext)
    const { show } = useContext(AlertContext)

    const onLogout = () => {
        onClose()
        firebase.logout()
        show('Вы успешно вышли!', 'success')
    }

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
                        {currentUser !== null
                            ? <Button size="small" type="link" danger onClick={onLogout}>Выйти</Button>
                            : <NavLink to="/log" className="nav-link" onClick={() => onClose()}>Войти</NavLink>
                        }
                    </li>
                </ul>
            </div>
            {
                isOpen 
                ? <Backdrop onClick={() => onClose()}/>
                : null
            }
        </Fragment>
    )
}

Drower.propTypes = {
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
}
