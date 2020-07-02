import React from 'react'
import Img from '../assets/player.jpg'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import useReactRouter from 'use-react-router'
import { animated } from 'react-spring'

export const BasketItem = ({ data, remove, add, props }) => {

    const { history } = useReactRouter()

    return (
        <animated.div className="basket-item" style={props}>
            <div className="basket-img">
                <img
                    src={Img}
                    alt={data.name}
                    onClick={() => history.push(`/items/${data.product.id}`)}
                />
            </div>
            <div className="basket-info">
                <div className="basket-up">
                    <div className="basket-price">
                        <p>{data.product.price * data.amount}&nbsp;Р</p>
                    </div>
                    <div className="basket-name">
                        <p onClick={() => history.push(`/items/${data.product.id}`)}>{data.product.name}</p>
                    </div>
                </div>
                <div className="basket-amount">
                    <p>Количество:</p>
                    <Button onClick={() => remove(data.product)}>-</Button>
                    <p>{data.amount}</p>
                    <Button onClick={() => add(data.product)}>+</Button>
                </div>
            </div>
            <div className="basket-delete" onClick={() => remove(data.product, data.amount)}>
                <CloseOutlined />
            </div>
        </animated.div>
    )
}
