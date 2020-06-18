import React, { useContext, useEffect } from 'react'
// import { BasketContext } from '../context/basket/BasketContext'
import useReactRouter from 'use-react-router'
import { Button } from 'antd'
import { BasketItem } from '../components/BasketItem'
import { BasketContext } from '../context/basket/BasketContext'
import store from 'store'
import { motion, AnimatePresence } from 'framer-motion'

export const Basket = () => {

    const containerVar = {
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const { removeItemToBasket, clearItemToBasket, addItemToBasket, fetchBasket, basket, loading, price, count } = useContext(BasketContext)
    const { history } = useReactRouter()

    useEffect(() => {
        fetchBasket()
        console.log('asdasd')
    // eslint-disable-next
    }, [])

    useEffect(() => {
        store.set('count', count)
        store.set('price', price)
        store.set('basket', basket)
    }, [count, price, basket])

    const renderSidebar = () => (
        <div className="basket-sidebar">
            <motion.div
                className="total-price text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 1 }}
            >
                <h4>ИТОГО:&nbsp;{price}&nbsp;Р</h4>
            </motion.div>
            <Button className="mb-2" onClick={() => history.push("/items")}>Вернуться в каталог</Button>
            <Button danger className="mb-2" onClick={() => clearItemToBasket()}>Очистить корзину</Button>
            <Button type="primary" className="mb-2">Оформить заказ</Button>
        </div>
    )

    const renderItems = () => (
        <AnimatePresence>
            <motion.div
                variants={containerVar}
                initial="hidden"
                animate="show"
                exit="hidden"
            >
                {basket.map(item => (
                    <BasketItem key={item.id} data={item} remove={removeItemToBasket} add={addItemToBasket} />
                ))}
            </motion.div>
        </AnimatePresence>
    )

    return (
        <div className="basket">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-9 mt">
                        <div className="basket-items">
                            <div className="basket-title">
                                <motion.h4
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }} transition={{ duration: 1 }}
                                >{count}&nbsp;{count === 1 ? 'ТОВАР' : count % 10 >= 5 || count === 0 ? 'ТОВАРОВ' : 'ТОВАРА'}&nbsp;В КОРЗИНЕ</motion.h4>
                                {
                                    loading 
                                        ? <p>Корзина пуста</p>
                                        : basket.length === 0
                                            ? <p>Корзина пуста</p>
                                            : renderItems()}
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
