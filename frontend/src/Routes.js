import React from 'react'
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

export const Routes = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter >
            <Switch location={location} key={location.pathname}>
                <Route path="/" component={Main} exact />
                <Route path="/items" component={Items} exact />
                <Route path="/items/:id" component={Item} />
                <Route path="/basket" component={Basket} />
                <Route path="/reg" component={Reg} />
                <Route path="/log" component={Log} />
                <Route path="/about" component={About} />
                <Redirect to={"/"} />
            </Switch>
        </AnimatePresence>
    )
}