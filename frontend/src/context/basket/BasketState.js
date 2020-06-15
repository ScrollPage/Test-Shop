import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { FETCH_BASKET_SUCCESS, SET_LOADING_BASKET } from '../types'
import { BasketContext } from './BasketContext'
import { BasketReducer } from './BasketReducer'
import store from 'store'
import axios from 'axios'
import qs from 'qs';
export const BasketState = ({ children }) => {

    const initialState = {
        loading: false,
        basket: []
    } 

    const [state, dispatch] = useReducer(BasketReducer, initialState)

    const fetchBasket = async () => {
        setLoading()
        try {
            const url = `http://localhost:8000/cart/api/get_order/${store.get('email')}`
            const response = await axios.get(url)
            console.log(response.data[0].items) 
            fetchBasketSuccess(response.data[0].items)
        } catch(e) {
            console.log(e)
        } 

    }

    const fetchBasketSuccess = (basket) => dispatch({ type: FETCH_BASKET_SUCCESS, payload: basket })

    const setLoading = () => dispatch({ type: SET_LOADING_BASKET }) 

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

    const { loading, basket } = state

    return (
        <BasketContext.Provider value={{
            addItemToBasket,
            removeItemToBasket,
            clearItemToBasket,
            fetchBasket,
            loading, basket
        }}>
            {children}
        </BasketContext.Provider>
    )
}

BasketState.propTypes = {
    children: PropTypes.element
}