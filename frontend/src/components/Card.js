import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import useReactRouter from 'use-react-router'
import { motion } from 'framer-motion'

export const Card = ({ item, addItemToBasket }) => {
    const { history } = useReactRouter()
    const shortDescription = `${R.take(20, item.description)}...`

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} className="col-sm-6 col-lg-4 book-list" key={item.id}>
            <div className="card mb-3">
                {/* <img src={`..${item.image}`} alt={item.name} className="card-img-top" />     */}
                <div className="card-body">
                    <strong className="pull-right">{item.price}Р</strong>
                    <h5 className="card-title">
                        <Link to={`/items/${item.id}`}>
                            {item.name}
                        </Link>
                    </h5>
                    <p>{shortDescription}</p>
                    <div className="card-bottom">
                        <Button
                            type="primary"
                            onClick={() => addItemToBasket(item.price)}
                        >Купить сейчас</Button>
                        <Button
                            className="mt-2"
                            onClick={() => history.push(`/items/${item.id}`)}
                        >Инфо</Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

Card.propTypes = {
    addItemToBasket: PropTypes.func,
    item: PropTypes.object
}