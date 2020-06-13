import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import { BasketContext } from '../context/basket/BasketContext'


export const BasketCart = () => {

    const { basket } = useContext(BasketContext)

    return (
        <Link to="/basket" className="btn btn-lg btn-block btn-outline-primary">
            {basket.length} товаров - {R.sum(basket)}&nbsp;₽
        </Link>
    )
}
