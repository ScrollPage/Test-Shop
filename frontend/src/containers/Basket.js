import React, { useContext, useEffect } from 'react'
// import { BasketContext } from '../context/basket/BasketContext'
import useReactRouter from 'use-react-router'
import { Button } from 'antd'
import { BasketItem } from '../components/BasketItem' 
import { BasketContext } from '../context/basket/BasketContext'
import { Loader } from '../components/Loader'

export const Basket = () => {

    const { removeItemToBasket, clearItemToBasket, addItemToBasket, fetchBasket, basket, loading, price, count, flag } = useContext(BasketContext)
    const { history } = useReactRouter()

    useEffect(() => {
        fetchBasket()
        console.log(flag)
    }, [flag])
    
    const renderSidebar = () => (
        <div className="basket-sidebar">
            <div className="total-price text-center">
                <h4>ИТОГО:&nbsp;{price}&nbsp;Р</h4>
            </div>
            <Button className="mb-2" onClick={() => history.push("/items")}>Вернуться в каталог</Button>
            <Button danger className="mb-2" onClick={() => clearItemToBasket()}>Очистить корзину</Button>
            <Button type="primary" className="mb-2">Оформить заказ</Button>
        </div>
    )

    return (
        <div className="basket">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-9 mt">
                        <div className="basket-items">
                            <div className="basket-title">
                                <h4>{count}&nbsp;{count === 1 ? 'ТОВАР' : count%10 >= 5 || count === 0 ? 'ТОВАРОВ' : 'ТОВАРА' }&nbsp;В КОРЗИНЕ</h4>
                                {loading
                                ? <Loader />
                                : basket.length === 0
                                ? <p>Корзина пуста</p>
                                : basket.map(item => (
                                    <BasketItem key={item.id} data={item} remove={removeItemToBasket} add={addItemToBasket}/>
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
