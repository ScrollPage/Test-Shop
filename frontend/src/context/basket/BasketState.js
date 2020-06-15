import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { FETCH_BASKET_SUCCESS, SET_LOADING_BASKET, SET_PARAMS, SET_FLAG } from '../types'
import { BasketContext } from './BasketContext'
import { BasketReducer } from './BasketReducer'
import store from 'store'
import axios from 'axios'
import qs from 'qs';
export const BasketState = ({ children }) => {

    const initialState = {
        loading: false,
        basket: [], 
        price: 0, 
        count: 0,
        flag: false
    } 

    const [state, dispatch] = useReducer(BasketReducer, initialState)

    const fetchBasket = async () => {
        setLoading()
        try {
            const url = `http://localhost:8000/cart/api/get_order/${store.get('email')}`
            const response = await axios.get(url)
            const data = response.data[0]
            console.log(data) 
            fetchBasketSuccess(data.items)
            setParams(data.total_price, data.total_count)
        } catch(e) {
            console.log(e)
        } 

    }

    const fetchBasketSuccess = (basket) => dispatch({ type: FETCH_BASKET_SUCCESS, payload: basket })

    const setLoading = () => dispatch({ type: SET_LOADING_BASKET }) 

    const setFlag = () => dispatch({ type: SET_FLAG }) 

    const setParams = (price, count) => dispatch({ type: SET_PARAMS, payload: { price, count } })

    const addItemToBasket = (item, amount = 1) => {
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
                setFlag()
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
                setFlag()
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
                setFlag()
            })
            .catch((error) => {
                console.log(error);
            });
    }

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