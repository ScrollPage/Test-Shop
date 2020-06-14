import React, { useContext, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Main } from './containers/Main';
import { Items } from './containers/Items';
import { Item } from './containers/Item';
import { Basket } from './containers/Basket';
import { Reg } from './containers/Reg';
import { Log } from './containers/Log';
import { About } from './containers/About';
import { Account } from './containers/Account';
import { Logout } from './components/Navigation/Logout';
import { AuthContext } from './context/auth/AuthContext';

export const Routes = () => {

    const { autoLogin, token } = useContext(AuthContext)
    const isAuthenticated = !!token

    useEffect(() => {
        autoLogin()
    // eslint-disable-next-line
    }, [])

    const location = useLocation();

    let routes = (
        <Switch location={location} key={location.pathname}>
            <Route path="/" component={Main} exact />
            <Route path="/items" component={Items} exact />
            <Route path="/items/:id" component={Item} />
            <Route path="/basket" component={Basket} />
            <Route path="/reg" component={Reg} />
            <Route path="/log" component={Log} />
            <Route path="/about" component={About} />
            <Route path="/account" component={Account} /> 
            <Redirect to={"/"} />
        </Switch>
    )

    if (isAuthenticated) {
        routes = (
            <Switch location={location} key={location.pathname}>
                <Route path="/" component={Main} exact />
                <Route path="/items" component={Items} exact />
                <Route path="/items/:id" component={Item} />
                <Route path="/basket" component={Basket} />
                <Route path="/reg" component={Reg} />
                <Route path="/log" component={Log} />
                <Route path="/about" component={About} />
                <Route path="/logout" component={Logout} />
                
                <Redirect to={"/"} />
            </Switch>
        )
    }

    return (
        <AnimatePresence exitBeforeEnter >
            {routes}
        </AnimatePresence>
    )
}