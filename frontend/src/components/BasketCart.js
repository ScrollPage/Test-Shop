import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BasketContext } from '../context/basket/BasketContext'

export const BasketCart = () => {

    const { price, count, fetchBasket } = useContext(BasketContext)

    useEffect(() => {
        fetchBasket()
    // eslint-disable-next-line
    }, [price, count])

    return (
        <Link to="/basket" className="btn btn-lg btn-block btn-outline-primary">
            {count} товаров - {price}&nbsp;₽
        </Link>
    )
}
