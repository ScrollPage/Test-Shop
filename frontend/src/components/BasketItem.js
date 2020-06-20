import React from 'react'
import Img from '../assets/player.jpg'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion'
import useReactRouter from 'use-react-router'

export const BasketItem = ({ data, remove, add }) => {

    const { history } = useReactRouter()

    const listVar = {
        hidden: {
            x: -100,
            opacity: 0
        },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 10,
                type: "spring",
                stiffness: 120,
                damping: 11
            }
        }
    }

    return (
        <motion.div
            className="basket-item"
            variants={listVar}
            initial="hidden"
            animate="show"
            exit="hidden"
        >
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
        </motion.div>
    )
}
