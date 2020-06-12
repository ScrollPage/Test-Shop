import React, {useReducer} from 'react'
import PropTypes from 'prop-types'
import {ADD_ITEM_TO_BASKET} from '../types'
import {BasketContext} from './BasketContext'
import {BasketReducer} from './BasketReducer'

export const BasketState = ({children}) => {

    const initialState = []

    const [state, dispatch] = useReducer(BasketReducer, initialState)

    const addItemToBasket = (id) => dispatch({type: ADD_ITEM_TO_BASKET, payload: id})

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