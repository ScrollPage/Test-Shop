import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { Drower } from './Drower'
import { MenuToggle } from './MenuToggle'

import { AuthContext } from '../../context/auth/AuthContext'

export const Header = () => {

    const [menu, setMenu] = useState(false)
    const { token, onLogout } = useContext(AuthContext)
    const isAuthenticated = !!token

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
                        {
                            isAuthenticated
                                ? <div className="header-item">
                                    <NavLink to="/account" className="nav-link">Личный кабинет</NavLink>
                                </div>
                                : null
                        }
                        <div className="header-item">
                            <NavLink to="/account" className="nav-link">Личный кабинет</NavLink>
                        </div>
                        <div className="header-right">
                            <div className="header-item">
                                <NavLink to="/basket" className="nav-link">Корзина</NavLink>
                            </div>
                            <div className="header-item">
                                {
                                    isAuthenticated
                                        ? <NavLink exact to="/" className="nav-link active-none" onClick={() => onLogout()}>Выйти</NavLink>
                                        : <NavLink to="/log" className="nav-link">Войти</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Drower isOpen={menu} onClose={() => setMenu(!menu)} />
                <MenuToggle isOpen={menu} isToggle={() => setMenu(!menu)} />
            </div>
        </div>
    )
}