import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import useReactRouter from 'use-react-router'
import { motion } from 'framer-motion'
import StarRatings from 'react-star-ratings'

export const Card = ({ item, addItemToBasket }) => {

    const [rating, setRating] = useState(Math.random() * 10 / 2)

    const changeRating = (newRating, name) => {
        setRating(newRating)
    }

    const { history } = useReactRouter()
    const shortDescription = `${R.take(20, item.description)}...`

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="col-sm-6 col-lg-4 book-list"
            key={item.id}
        >
            <motion.div
                className="card mb-3"
                whileHover={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.4)', zIndex: 1 }}
            >
                <div className="card-img" >
                    <img
                        src={`https://picsum.photos/id/${item.id}/150/150`}
                        alt={item.name}
                        onClick={() => history.push(`/items/${item.id}`)}
                    />
                </div>
                <hr />
                <div className="card-body">
                    <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        starHoverColor="gold"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="1px"
                    />
                    <p className="rating">{rating.toFixed(1)}</p>
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
                            onClick={() => addItemToBasket(item)}
                        >Купить сейчас</Button>
                        <Button
                            className="mt-2"
                            onClick={() => history.push(`/items/${item.id}`)}
                        >Инфо</Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

Card.propTypes = {
    addItemToBasket: PropTypes.func,
    item: PropTypes.object
}