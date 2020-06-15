import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Orders } from '../components/Orders'
import { Info } from '../components/Info'
import { Change } from '../components/Change'

export const Account = () => {

    const renderLinks = () => (
        <div className="account-links">
            <Link to="/account/orders" className="nav-link">Заказы</Link>
            <Link to="/account/info" className="nav-link">Информация</Link>
            <Link to="/account/change" className="nav-link">Сменить пароль</Link>
            {/* <Link>Выход</Link> */}
        </div>
    )

    return (
        <div className="account">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
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
