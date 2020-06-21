import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Drower } from './Drower'
import { MenuToggle } from './MenuToggle'
import { BasketContext } from '../../context/basket/BasketContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

export const Header = () => {

    const [menu, setMenu] = useState(false)
    const { token } = useContext(AuthContext)
    const { count } = useContext(BasketContext)
    const isAuthenticated = !!token

    return (
        <div className="header">
            <div className="cont">
                <div className="ro">
                    <div className="header-logo">
                        <div className="header-item">
                            <NavLink to="/basket" className="nav-link nav-shipping"><ShoppingCartOutlined /></NavLink>
                            {count === 0 ? null : <p>{count}</p>}
                        </div>
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
                                    <NavLink to="/account/info" className="nav-link">Личный кабинет</NavLink>
                                </div>
                                : null
                        }
                        <div className="header-right">
                            <motion.div 
                                className="header-item"
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <NavLink to="/basket" className="nav-link nav-shipping"><ShoppingCartOutlined /></NavLink>
                                <AnimatePresence>{count === 0 ? null : <motion.p transition={{duration: 1}} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>{count}</motion.p>}</AnimatePresence>
                            </motion.div>
                            <div className="header-item">
                                {
                                    isAuthenticated
                                        ? null
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