import React, {useReducer} from 'react'
import PropTypes from 'prop-types'
import { AlertContext } from './AlertContext'
import { AlertReducer } from './AlertReducer'
import {
    HIDE_ALERT,
    SHOW_ALERT
} from '../types'

export const AlertState = ({children}) => {

    const [state, dispatch] = useReducer(AlertReducer, null)

    const hide = () => dispatch({type: HIDE_ALERT})

    const show = (text, type = 'secondary') => 
    dispatch({
        type: SHOW_ALERT,
        payload: {type, text}
    })

    return (
        <AlertContext.Provider value={{
            hide, show, alert: state
        }}> 
            {children}
        </AlertContext.Provider>
    )
}

AlertState.propTypes = {
    children: PropTypes.element
}

