import React from 'react'
import Img from '../assets/player.jpg'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion'

export const BasketItem = ({ data, remove, add }) => {
    return (
        <motion.div
            className="basket-item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="basket-img">
                <img src={Img} alt={data.name} />
            </div>
            <div className="basket-info">
                <div className="basket-up">
                    <div className="basket-price">
                        <p>{data.product.price * data.amount}&nbsp;Р</p>
                    </div>
                    <div className="basket-name">
                        <p>{data.product.name}</p>
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
        </motion.div>
    )
}
