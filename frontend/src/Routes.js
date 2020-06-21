import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import store from 'store'

import { Main } from './containers/Main';
import { Items } from './containers/Items';
import { Item } from './containers/Item';
import { Basket } from './containers/Basket';
import { Reg } from './containers/Reg';
import { Log } from './containers/Log';
import { About } from './containers/About';
import { Account } from './containers/Account';
import { Admin } from './containers/Admin';
import { Edit } from './containers/Edit';
import { Logout } from './components/Navigation/Logout';
import { AuthContext } from './context/auth/AuthContext';

export const Routes = () => {

    const { token } = useContext(AuthContext)
    const isAuthenticated = !!token
    
    let routes = (
        <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/items" component={Items} exact />
            <Route path="/items/:id" component={Item} />
            <Route path="/basket" component={Basket} />
            <Route path="/reg" component={Reg} />
            <Route path="/log" component={Log} />
            <Route path="/about" component={About} />
            <Redirect to={"/"} />
        </Switch>
    )

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/items" component={Items} exact />
                <Route path="/items/:id" component={Item} />
                <Route path="/basket" component={Basket} />
                <Route path="/reg" component={Reg} />
                <Route path="/log" component={Log} />
                <Route path="/about" component={About} />
                <Route path="/logout" component={Logout} />
                <Route path="/account" component={Account} />
                {store.get('isAdmin') ? <Route path="/admin" component={Admin} /> : null}
                {store.get('isAdmin') ? <Route path="/edit/:id" component={Edit} /> : null}
                <Redirect to={"/"} />
            </Switch>
        )
    }
    return (
        routes
    )
}