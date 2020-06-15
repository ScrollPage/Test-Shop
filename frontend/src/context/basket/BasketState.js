import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { ADD_ITEM_TO_BASKET } from '../types'
import { BasketContext } from './BasketContext'
import { BasketReducer } from './BasketReducer'
import store from 'store'
import axios from 'axios'
// import $ from 'jquery'
export const BasketState = ({ children }) => {

    const [state, dispatch] = useReducer(BasketReducer,
        store.get('store') === undefined ? [] : store.get('store')
    )

    // function getCookie(name) {
    //     var cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         var cookies = document.cookie.split(';');
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = cookies[i].trim();
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }

    const addItemToBasket = (item) => {
        dispatch({ type: ADD_ITEM_TO_BASKET, payload: item })
        console.log(item.id, store.get('email'))
        // axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.withCredentials = true
        const options = {
            method: 'POST',
            url: "http://localhost:8000/cart/add",
            data: {uid: item.id, amount: 1, email: store.get('email')}
            // headers: { 'xsrfCookieName': 'csrftoken', 'xsrfHeaderName': 'X-CSRFToken'},
            // withCredentials: true
        }



        // axios.post("http://localhost:8000/cart/add", 
        // {
        //     uid: item.id, amount: 1, email: store.get('email')
        // })
        //     .then((response) => {
        //         console.log(response.data)
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        axios(options)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });



        
            // $.ajax({
            //     type: "POST",
            //     url: "http://localhost:8000/cart/add",
            //     data: {
            //         csrfmiddlewaretoken: getCookie('csrftoken'),
            //         'uid': item.id, 
            //         'amount': 1, 
            //         'email': store.get('email') 
            //     },
            //     dataType: "text",

            //     success: function (data) {
            //         if (data) {
            //             console.log(data)
            //         }
            //     }
            // });
    }

    return (
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