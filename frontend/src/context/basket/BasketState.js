import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { ADD_ITEM_TO_BASKET } from '../types'
import { BasketContext } from './BasketContext'
import { BasketReducer } from './BasketReducer'
import store from 'store'
import axios from 'axios'
import qs from 'qs';
export const BasketState = ({ children }) => {

    const [state, dispatch] = useReducer(BasketReducer,
        store.get('store') === undefined ? [] : store.get('store')
    )

    const addItemToBasket = (item, amount = 1) => {
        dispatch({ type: ADD_ITEM_TO_BASKET, payload: item })
        const data = { uid: item.id, amount: amount, email: store.get('email') }
        console.log(data)
        const options = {
            method: 'POST',
            url: "http://localhost:8000/cart/add",
            data: qs.stringify(data)
        }
        axios(options)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeItemToBasket = (item, amount = 1) => {
        const data = { uid: item.id, amount: amount, email: store.get('email') }
        console.log(data)
        const options = {
            method: 'POST',
            url: "http://localhost:8000/cart/remove",
            data: qs.stringify(data)
        }
        axios(options)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const clearItemToBasket = () => {
        const data = { email: store.get('email') }
        console.log(data)
        const options = {
            method: 'POST',
            url: "http://localhost:8000/cart/clear",
            data: qs.stringify(data)
        }
        axios(options)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <BasketContext.Provider value={{
            addItemToBasket,
            removeItemToBasket,
            clearItemToBasket,
            basket: state
        }}>
            {children}
        </BasketContext.Provider>
    )
}

BasketState.propTypes = {
    children: PropTypes.element
}