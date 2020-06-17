import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from '../context/basket/BasketContext'


export const BasketCart = () => {

    const { price, count } = useContext(BasketContext)

    return (
        <Link to="/basket" className="btn btn-lg btn-block btn-outline-primary">
            {count} товаров - {price}&nbsp;₽
        </Link>
    )
}
