import React, { useEffect, useContext, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import store from 'store'
import { Button } from 'antd'
import { Loader } from '../components/Loader'
import { BasketCart } from '../components/BasketCart'
import { ItemsContext } from '../context/items/ItemsContext'
import { BasketContext } from '../context/basket/BasketContext'
import StarRatings from 'react-star-ratings'
import { Comments } from '../components/Comments'

export const Item = () => {

    const { history } = useReactRouter()
    const { fetchItemById, item, loading, setRated, flag } = useContext(ItemsContext)
    const { addItemToBasket, removeItemToBasket } = useContext(BasketContext)
    const match = useRouteMatch('/items/:id')

    const [ amount, setAmount ] = useState(0)
    const [ rating, setRating ] = useState(0)
    const [ reviews, setReviews ] = useState(0)

    useEffect(() => {
        fetchItemById(match.params.id)
        // eslint-disable-next-line
    }, [match.params.id, flag])

    useEffect(() => {
        if (item !== null) {
            setRating(item.rating)
            setReviews(item.reviews)
        }
        
    }, [item])

    const changeRating = (newRating, name) => {
        setRating(newRating)
        setRated(item.id, store.get('email'), newRating)
        // setReviews(reviews+1)
    }

    const renderSidebar = () => {
        return (
            <div className="mt-4">
                <BasketCart />
                <h4 className="mt-4 mb-4">{item.name}</h4>
                <p>Выберите количество:</p>
                <div className="item-amount">
                    <Button onClick={() => amount === 0 ? null : setAmount(amount - 1)}>-</Button>
                    <p>{amount}</p>
                    <Button onClick={() => setAmount(amount + 1)}>+</Button>
                </div>
                <Button className="mb-4" size="large" type="primary" onClick={() => amount === 0 ? null : addItemToBasket(item, amount)}>Добавить в корзину</Button>
                <Button className="item-delete mb-4" size="large" type="primary" onClick={() => removeItemToBasket(item)}>Удалить из корзины</Button>
            </div>
        )
    }


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-9">
                    <div>
                        <Button className="mb-3" onClick={() => history.push('/items')}>Вернуться назад</Button>
                        {!item || loading
                            ? <Loader />
                            :
                            <div className="jumbotron text-center">
                                <img
                                    // src={require(`..${item.image}`)}
                                    // src={require(`../uploads/${item.image}`)}
                                    // src={`..${item.image}`}
                                    // src={require("../uploads/Lumia1520-Front-Back-png.png")}
                                    // src={getImage()}
                                    src={`https://picsum.photos/id/${item.id}/300/300`}
                                    style={{ height: '250px' }}
                                    className="mb-4"
                                    alt={item.name}>
                                </img>
                                <p className="lead">{item.description}</p>
                                <hr className="my-4"></hr>
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
                                <p className="rating">{item.rating}</p>
                                <p className="review">Всего оценок:&nbsp;{reviews}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-md-3">
                    {item && renderSidebar()}
                </div>
            </div>
            <Comments item={item}/>
        </div>

    )
}
