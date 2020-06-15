import React, {useReducer} from 'react'
import PropTypes from 'prop-types'
import {ADD_ITEM_TO_BASKET} from '../types'
import {BasketContext} from './BasketContext'
import {BasketReducer} from './BasketReducer'
import store from 'store'
import axios from 'axios'

export const BasketState = ({children}) => {

    const [state, dispatch] = useReducer(BasketReducer, 
        store.get('store') === undefined ? [] : store.get('store')
    )

    const addItemToBasket = (item) => {
        dispatch({type: ADD_ITEM_TO_BASKET, payload: item})
        console.log(item.id, store.get('email'))
        axios.post("http://localhost:8000/cart/add", {
            uid: item.id, amount: 1, email: store.get('email')
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <BasketContext.Provider value={{
            addItemToBasket, basket: state
        }}>
            {children}
        </BasketContext.Provider>
    )
}

BasketState.propTypes = {
    children: PropTypes.element
}