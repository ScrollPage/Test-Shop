// import React, {createContext, useEffect, useState} from 'react'
// import PropTypes from 'prop-types'
// import firebase from '../../config/firebase'

// export const AuthContext = createContext()

// export const AuthState = ({children}) => {

//     const [currentUser, setCurrentUser] = useState(null)

//     useEffect(() => {
//         firebase.authChange(setCurrentUser)
//     }, [])

//     return (
//         <AuthContext.Provider value={{currentUser}}>
//             {children}
//         </AuthContext.Provider>
//     )
// } 

// AuthState.propTypes = {
//     children: PropTypes.element
// }

