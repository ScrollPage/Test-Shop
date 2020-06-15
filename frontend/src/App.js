import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Routes'
import { Header } from './components/Navigation/Header'
import { Alert } from './components/Alert'
import { AlertState } from './context/alert/AlertState'
import { ItemsState } from './context/items/ItemsState'
import { BasketState } from './context/basket/BasketState';
import { AuthState } from './context/auth/AuthState'

// import axios from 'axios'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.withCredentials = true

export function App() {
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, [])

    return (
        <AlertState>
            <AuthState>
                <ItemsState>
                    <BasketState>
                        <BrowserRouter>
                            <div className="App">
                                <Header />
                                <Alert />
                                <div className="Routes">
                                    <Routes />
                                </div>
                            </div>
                        </BrowserRouter>
                    </BasketState>
                </ItemsState>
            </AuthState>
        </AlertState>
    )
}
