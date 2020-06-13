import React, {createContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export const AuthState = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <AuthContext.Provider value={{currentUser}}>
           {children}
         </AuthContext.Provider>
    )
} 

AuthState.propTypes = {
    children: PropTypes.element
}

