import React, { useEffect, useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import { motion } from 'framer-motion'

import { Button } from 'antd'
import { Loader } from '../components/Loader'
import { BasketCart } from '../components/BasketCart'
import { ItemsContext } from '../context/items/ItemsContext'
import { BasketContext } from '../context/basket/BasketContext'

export const Item = () => {

    const { history } = useReactRouter()
    const { fetchItemById, item, loading, totalItemsCount } = useContext(ItemsContext)
    const { addItemToBasket } = useContext(BasketContext)
    const match = useRouteMatch('/items/:id')

    useEffect(() => {
        fetchItemById(match.params.id)
        // eslint-disable-next-line
    }, [match.params.id])

    const renderSidebar = () => {
        return (
            <div className="mt-4">
                <BasketCart />
                <h1 className="display-4 mb-4">{item.name}</h1>
                {/* <p>{item.description}</p> */}
                <Button className="mb-4" size="large" type="primary" onClick={() => addItemToBasket(item.price)}>Добавить в корзину</Button>
            </div>
        )
    }

    const getImage = () => {
        const img = "../assets/player.jpg"
        return require(`${img}`)
    }
    
    return (
        <motion.div
            className="container mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{duration: 0.4}}
        >
            <div className="row">
                <div className="col-md-9">
                    <div>
                        <Button className="mb-3" onClick={() => history.push('/items')}>Вернуться назад</Button>
                        {!item || loading
                            ? <Loader />
                            :
                            <div className="jumbotron text-center">
                                {console.log(item.image)}
                                <img
                                    // src={require(`..${item.image}`)}
                                    // src="assets/player.jpg"
                                    // src={require("../uploads/Lumia1520-Front-Back-png.png")}
                                    // src={getImage(item.image)}
                                    style={{ height: '250px' }}
                                    className="mb-4"
                                    alt={item.name}>
                                </img>
                                <p className="lead">{item.description}</p>
                                <hr className="my-4"></hr>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-md-3">
                    {item && renderSidebar()}
                </div>
            </div>
        </motion.div>

    )
}
