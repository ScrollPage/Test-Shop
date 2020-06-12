import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Routes'
import { Header } from './components/Navigation/Header'
import { Alert } from './components/Alert'
import { AlertState } from './context/alert/AlertState'
import { ItemsState } from './context/items/ItemsState'
import { BasketState } from './context/basket/BasketState';
import { AuthState } from './context/auth/AuthState'

// import setGlobalCSRF from './helpers/setGlobalCSRF';

// setGlobalCSRF(window.__csrf_token);

export function App() {
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, [])

    return (
        <AuthState>
            <AlertState>
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
            </AlertState>
        </AuthState>
    )
}
