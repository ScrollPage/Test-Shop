import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import {
    FETCH_BASKET_SUCCESS,
    SET_LOADING_BASKET,
    SET_FLAG,
    REMOVE_ITEM_TO_BASKET,
    ADD_ITEM_TO_BASKET,
    CLEAR_ITEM_TO_BASKET
} from '../types'
import { BasketContext } from './BasketContext'
import { BasketReducer } from './BasketReducer'
import store from 'store'
import axios from 'axios'
import qs from 'qs';
import {localhost} from '../../config'

export const BasketState = ({ children }) => {

    const initialState = {
        loading: false,
        basket: store.get('basket') === undefined ? [] : store.get('basket'),
        price: store.get('price') === undefined ? 0 : store.get('price'),
        count: store.get('count') === undefined ? 0 : store.get('count'),
        flag: false
    }

    const [state, dispatch] = useReducer(BasketReducer, initialState)

    const fetchBasket = async () => {
        setLoading()
        try {
            const url = `${localhost}/cart/api/get_order/${store.get('email')}`
            const response = await axios.get(url)
            const data = response.data[0]
            fetchBasketSuccess(data.items, data.total_price, data.total_count)  
        } catch (e) {
            console.log(e)
        }

    }

    const fetchBasketSuccess = (basket, price, count) => dispatch({ type: FETCH_BASKET_SUCCESS, payload: {basket, price, count} })

    const setLoading = () => dispatch({ type: SET_LOADING_BASKET })

    const setFlag = () => dispatch({ type: SET_FLAG })

    const addItemToBasket = async (item, amount = 1) => {
        const data = { uid: item.id, amount: amount, email: store.get('email') }
        const options = {
            method: 'POST',
            url: `${localhost}/cart/add`,
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                if (response.data !== 'added') {
                    store.set('email', response.data)
                }
                addItemToBasketSuccess(item, amount)
                setFlag()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeItemToBasket = async (item, amount = 1) => {
        const data = { uid: item.id, amount: amount, email: store.get('email') }
        const options = {
            method: 'POST',
            url: `${localhost}/cart/remove`,
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                removeItemToBasketSuccess(item, amount)
                setFlag()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const clearItemToBasket = async () => {
        const data = { email: store.get('email') }
        const options = {
            method: 'POST',
            url: `${localhost}/cart/clear`,
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                clearItemToBasketSuccess()
                setFlag()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeItemToBasketSuccess = (item, amount) => dispatch({ type: REMOVE_ITEM_TO_BASKET, item, amount })

    const addItemToBasketSuccess = (item, amount) => dispatch({ type: ADD_ITEM_TO_BASKET, item, amount })

    const clearItemToBasketSuccess = () => dispatch({type: CLEAR_ITEM_TO_BASKET})

    const { loading, basket, price, count, flag } = state

    return (
        <BasketContext.Provider value={{
            addItemToBasket,
            removeItemToBasket,
            clearItemToBasket,
            fetchBasket,
            setFlag,
            loading, basket, price, count, flag
        }}>
            {children}
        </BasketContext.Provider>
    )
}

BasketState.propTypes = {
    children: PropTypes.element
}