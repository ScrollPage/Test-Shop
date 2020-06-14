import React, {useReducer} from 'react'
import PropTypes from 'prop-types'
import {ADD_ITEM_TO_BASKET} from '../types'
import {BasketContext} from './BasketContext'
import {BasketReducer} from './BasketReducer'
import store from 'store'

export const BasketState = ({children}) => {

    const [state, dispatch] = useReducer(BasketReducer, 
        store.get('store') === undefined ? [] : store.get('store')
    )

    const addItemToBasket = (item) => dispatch({type: ADD_ITEM_TO_BASKET, payload: item})

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