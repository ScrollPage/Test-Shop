import React, { useContext, useEffect } from 'react'
import { BasketContext } from '../context/basket/BasketContext'
import useReactRouter from 'use-react-router'


export const BasketCart = () => {

    const { history } = useReactRouter()
    const { price, count, fetchBasket } = useContext(BasketContext)

    useEffect(() => {
        fetchBasket()
    // eslint-disable-next-line
    }, [price, count])

    return (
        <div className="basket-cart" onClick={() => history.push('/basket')}>
            <p>{count} товаров</p>
            <p>{price}&nbsp;₽</p>
        </div>
    )
}
