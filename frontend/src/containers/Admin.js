import React, { useEffect, useContext } from 'react'
import * as R from 'ramda'
import { ItemsContext } from '../context/items/ItemsContext'
import { Link } from 'react-router-dom'

export const Admin = () => {

    const { fetchItemsAdmin, items, loading } = useContext(ItemsContext)

    useEffect(() => {
        fetchItemsAdmin()
    }, [])

    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <div key={index} className="admin-product">
                    <div className="product-number">
                        {item.id}
                    </div>
                    <div className="product-field">
                        {item.name}
                    </div>
                    <div className="product-field">
                        {item.price}
                    </div>
                    <div className="product-field">
                        {`${R.take(20, item.description)}...`}
                    </div>
                    <div className="product-edit">
                        <Link to={`edit/${item.id}`}>Edit</Link>
                    </div>
                </div>
            )
        }
        )
    }

    return (
        <div className="container">
            <div className="admin">
                {loading
                    ? <p>Загрузка...</p>
                    : items.length === 0
                        ? <p>Товаров нет</p>
                        : renderItems()}
            </div>
        </div>
    )
}
