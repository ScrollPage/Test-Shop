import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import { BasketContext } from '../context/basket/BasketContext'
import { AuthContext } from '../context/auth/AuthState'


export const BasketCart = () => {

    const { basket } = useContext(BasketContext)
    const { currentUser } = useContext(AuthContext)

    return (
        <Fragment>
            <h3>Корзина{currentUser !== null ? currentUser.displayName : null  }</h3>
            <Link to="/basket" className="btn btn-lg btn-block btn-outline-primary">
                {basket.length} товаров - {R.sum(basket)}&nbsp;₽
            </Link>
        </Fragment>
    )
}
