import React from 'react'
import { Basket } from '../containers/Basket'
import Img from '../assets/player.jpg'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons';

export const BasketItem = ({ data }) => {
    return (
        <div className="basket-item">
            <div className="basket-img">
                <img src={Img} alt={data.name} />
            </div>
            <div className="basket-info">
                <div className="basket-up">
                    <div className="basket-price">
                        <p>{data.price}</p>
                    </div>
                    <div className="basket-name">
                        <p>{data.name}</p>
                    </div>
                </div>
                <div className="basket-amount">
                    <p>Количество:</p>
                    <Button>-</Button>
                    <p>{data.amount}</p>
                    <Button>+</Button>
                </div>
            </div>
            <div className="basket-delete">
                <CloseOutlined />
            </div>
        </div>
    )
}
