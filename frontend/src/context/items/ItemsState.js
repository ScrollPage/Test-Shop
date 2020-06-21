import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { ItemsContext } from './ItemsContext'
import { ItemsReducer } from './ItemsReducer'
import store from 'store'
import qs from 'qs';

import {
    SET_LOADING,
    FETCH_ITEMS_SUCCESS,
    FETCH_ERROR,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    FETCH_ITEM_BY_ID_SUCCESS,
    SET_CHECKED_LIST,
    SET_SEARCH,
    SET_FLAG_ITEM,
    SET_ORDERING,
    SET_SLIDER,
} from '../types'

export const ItemsState = ({ children }) => {
    const initialState = {
        items: [],
        item: null,
        pageSize: 9,
        currentPage: store.get('currentPage') === undefined ? 1 : store.get('currentPage'),
        totalItemsCount: 0,
        loading: true,
        error: null,
        checkedList: store.get('checkedList') === undefined ? ['Apple', 'Samsung', 'HTC', 'Lenovo', 'Nokia'] : store.get('checkedList'),
        search: store.get('search') === undefined ? null : store.get('search'),
        flag: false,
        min: 13480,
        max: 19060,
        currentMin: store.get('currentMin') === undefined ? 0 : store.get('currentMin'),
        currentMax: store.get('currentMax') === undefined ? 20000 : store.get('currentMax'),
        ordering: store.get('ordering') === undefined ? 0 : store.get('ordering')
    }

    const [state, dispatch] = useReducer(ItemsReducer, initialState)

    const fetchItems = async () => {
        setLoading()
        try {
            let fl = true
            let url = `http://localhost:8000/api/${state.checkedList}/${state.currentPage}/${state.pageSize}/${state.search}/${state.currentMin}/${state.currentMax}/${state.ordering}/`
            let urlLen = `http://localhost:8000/api/len/${state.checkedList}/${state.search}/${state.currentMin}/${state.currentMax}/`

            if (state.checkedList.length === 0) {
                url = `http://localhost:8000/api/null/${state.currentPage}/${state.pageSize}/${state.search}/${state.currentMin}/${state.currentMax}/${state.ordering}/`
                urlLen = `http://localhost:8000/api/len/null/${state.search}/${state.currentMin}/${state.currentMax}/`
                fl = false
            }
            const response = await axios.get(url)

            if (fl) { fetchItemsSuccess(response.data) } else fetchItemsSuccess([])
            const length = await axios.get(urlLen)
            setTotalCount(length.data[0].total)

        } catch (e) {
            fetchError(e)
        }
    }

    const fetchItemById = async id => {
        setLoading()
        try {
            const response = await axios.get(`http://localhost:8000/items/api/id/${id}`)
            fetchItemByIdSuccess(response.data)
        } catch (e) {
            fetchError(e)
        }
    }

    const setRated = async (id, email, rating) => {
        const data = { uid: id, email, rating }
        const options = {
            method: 'POST',
            url: "http://localhost:8000/feedback/rating",
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                setFlag()
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const setComment = async (id, firstName, rating, description) => {
        const data = { uid: id, email: store.get('email'), rating, first_name: firstName, description }
        const options = {
            method: 'POST',
            url: "http://localhost:8000/feedback/comment",
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                setFlag()
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const fetchItemsAdmin = async () => {
        setLoading()
        try {
            const url = 'http://localhost:8000/all/'
            const response = await axios.get(url)
            fetchItemsSuccess(response.data)
        } catch(e) {
            console.log(e)
        }
    }

    const changeItem = async (id, name, price, description) => {
        const data = { name, price, description }
        const options = {
            method: 'PUT',
            url: `http://localhost:8000/product_edit/${id}`,
            data: qs.stringify(data)
        }
        await axios(options)
            .then((response) => {
                setFlag()
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const fetchItemByIdSuccess = (item) => dispatch({ type: FETCH_ITEM_BY_ID_SUCCESS, payload: item })

    const fetchItemsSuccess = (items) => dispatch({ type: FETCH_ITEMS_SUCCESS, payload: items })

    const fetchError = (e) => dispatch({ type: FETCH_ERROR, payload: e })

    const setCurrentPage = (currentPage) => dispatch({ type: SET_CURRENT_PAGE, payload: currentPage })

    const setLoading = () => dispatch({ type: SET_LOADING })

    const setTotalCount = (totalItemsCount) => dispatch({ type: SET_TOTAL_COUNT, payload: totalItemsCount })

    const setCheckedList = (checkedList) => dispatch({ type: SET_CHECKED_LIST, payload: checkedList })

    const setSearch = (search) => dispatch({ type: SET_SEARCH, payload: search })

    const setOrdering = (ordering) => dispatch({ type: SET_ORDERING, payload: ordering })

    const setSlider = (currentMin, currentMax) => dispatch({ type: SET_SLIDER, payload: { currentMin, currentMax } })

    const setFlag = () => dispatch({ type: SET_FLAG_ITEM })

    const { items, item, pageSize, currentPage, totalItemsCount, loading, checkedList, search, flag,
        min, max, currentMin, currentMax, ordering } = state

    return (
        <ItemsContext.Provider value={{
            setSearch,
            fetchItems,
            fetchItemById,
            setCurrentPage,
            setTotalCount,
            setCheckedList,
            setRated,
            setComment,
            setSlider,
            setOrdering,
            fetchItemsAdmin,
            changeItem,
            items, item, pageSize, currentPage, totalItemsCount, loading, checkedList, search, flag,
            min, max, currentMin, currentMax, ordering
        }}>
            {children}
        </ItemsContext.Provider>
    )
}

ItemsState.propTypes = {
    children: PropTypes.element
}

