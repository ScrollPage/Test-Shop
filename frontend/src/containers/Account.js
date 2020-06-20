import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Orders } from '../components/Orders'
import { Info } from '../components/Info'
import { Change } from '../components/Change'
import useReactRouter from 'use-react-router'

export const Account = () => {

    const { history } = useReactRouter()
    const path = history.location.pathname

    const renderLinks = () => (
        <div className="account-links">
            <Link to="/account/orders" className={path === "/account/orders" ? "nav-link active" : "nav-link"}>Заказы</Link>
            <Link to="/account/info" className={path === "/account/info" ? "nav-link active" : "nav-link"}>Информация</Link>
            <Link to="/account/change" className={path === "/account/change" ? "nav-link active" : "nav-link"}>Сменить пароль</Link>
            {/* <Link>Выход</Link> */}
        </div>
    )

    return (
        <div className="account">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3 mt-4">
                        {renderLinks()}
                    </div>
                    <div className="col-md-9">
                        <Switch>
                            <Route path="/account/orders" component={Orders}></Route>
                            <Route path="/account/info" component={Info}></Route>
                            <Route path="/account/change" component={Change}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}
