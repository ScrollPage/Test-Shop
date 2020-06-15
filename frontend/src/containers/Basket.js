import React, { useContext, useEffect } from 'react'
// import { BasketContext } from '../context/basket/BasketContext'
import useReactRouter from 'use-react-router'
import { Button } from 'antd'
import { BasketItem } from '../components/BasketItem' 
import { BasketContext } from '../context/basket/BasketContext'
import { Loader } from '../components/Loader'

export const Basket = () => {

    useEffect(() => {
        fetchBasket()
    }, [])

    const { clearItemToBasket, fetchBasket, basket, loading } = useContext(BasketContext)
    const { history } = useReactRouter()

    const renderSidebar = () => (
        <div className="basket-sidebar">
            <div className="total-price text-center">
                <h4>ИТОГО: 4800$</h4>
            </div>
            <Button className="mb-2" onClick={() => history.push("/items")}>Вернуться в каталог</Button>
            <Button danger className="mb-2" onClick={() => clearItemToBasket()}>Очистить корзину</Button>
            <Button type="primary" className="mb-2">Оформить заказ</Button>
        </div>
    )

    // const data = basket.items;

    return (
        <div className="basket">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-9 mt">
                        <div className="basket-items">
                            <div className="basket-title">
                                <h4>4 ТОВАРА В КОРЗИНЕ</h4>
                                {loading
                                ? <Loader />
                                : basket.length === 0
                                ? <p>Корзина пуста</p>
                                : basket.map(item => (
                                    <BasketItem key={item.id} data={item}/>
                                ))}
                            </div>
                            {}
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    )
}
