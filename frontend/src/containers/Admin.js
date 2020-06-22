import React, { useEffect, useContext, useState } from 'react'
import * as R from 'ramda'
import { ItemsContext } from '../context/items/ItemsContext'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import useReactRouter from 'use-react-router'
import { CloseOutlined } from'@ant-design/icons';

export const Admin = () => {

    const { history } = useReactRouter()
    const { fetchItemsAdmin, items, loading, deleteItem, flag } = useContext(ItemsContext)

    useEffect(() => {
        fetchItemsAdmin()
        //eslint-disable-next-line
    }, [flag])

    const [ search, setSearch ]= useState('')

    const applySearch = (item) => R.contains(
        search.toUpperCase(), item.name.toUpperCase()
    )

    const renderItems = () => {
        return items
        .filter((item) => applySearch(item))
        .map((item, index) => {
            return (
                <div key={index} className="admin-product">
                    <div className="product-number">
                        {item.id}
                    </div>
                    <div className="product-number">
                        {item.categoryId}
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
                        <Link to={`edit/${item.id}`}>Изменить</Link>
                    </div>
                    <div 
                        className="product-close"
                        onClick={() => deleteItem(item.id)}
                    >
                        <CloseOutlined />
                    </div>
                </div>
            )
        }
        )
    }

    return (
        <div className="container">
            <div className="admin">
                <div className="admin-header">
                    <div className="input-group">
                        <input
                            onChange={event => setSearch(event.target.value)}
                            value={search}
                            type="text"
                            className="form-control"
                            placeholder="Поиск..."
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2" onClick={() => setSearch('')}>Очистить</span>
                        </div>
                    </div>
                    <Button onClick={() => history.push("/add")} type="primary">Добавить товар</Button>
                </div>
                <div className="admin-product">
                    <div className="product-number">
                        id
                    </div>
                    <div className="product-number">
                        cat
                    </div>
                    <div className="product-field">
                        Название
                    </div>
                    <div className="product-field">
                        Цена
                    </div>
                    <div className="product-field">
                        Описание
                    </div>
                </div>
                {loading
                    ? <p>Загрузка...</p>
                    : items.length === 0
                        ? <p>Товаров нет</p>
                        : renderItems()}
            </div>
        </div>
    )
}
