import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

import { Drower } from './Drower'
import { MenuToggle } from './MenuToggle'
import firebase from '../../config/firebase'
import { AlertContext } from '../../context/alert/AlertContext'
import { AuthContext } from '../../context/auth/AuthState'

export const Header = () => {

    const { currentUser } = useContext(AuthContext)
    const { show } = useContext(AlertContext)
    const [menu, setMenu] = useState(false)

    const onLogout = () => {
        firebase.logout()
        show('Вы успешно вышли!', 'success')
    }

    return (
        <div className="header">
            <div className="cont">
                <div className="ro">
                    <div className="header-logo">
                        <NavLink exact to="/" className="nav-link">Shop</NavLink>
                    </div>
                    <div className="header-body">
                        <div className="header-item">
                            <NavLink exact to="/" className="nav-link">Главная</NavLink>
                        </div>
                        <div className="header-item">
                            <NavLink exact to="/items" className="nav-link">Каталог</NavLink>
                        </div>
                        <div className="header-item">
                            <NavLink to="/about" className="nav-link">О нас</NavLink>
                        </div>
                        <div className="header-item">
                            {currentUser !== null
                                ? <Button size="small" type="link" danger onClick={onLogout}>Выйти</Button>
                                : <NavLink to="/log" className="nav-link">Войти</NavLink>
                            }
                        </div>
                    </div>
                </div>
                <Drower isOpen={menu} onClose={() => setMenu(!menu)}/>
                <MenuToggle isOpen={menu} isToggle={() => setMenu(!menu)}/>
            </div>
        </div>
    )
}