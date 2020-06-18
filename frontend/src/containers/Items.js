import React, { useContext, useEffect } from 'react'
import store from 'store'
import { Loader } from '../components/Loader'
import { Paginator } from '../components/Paginator'
import { Card } from '../components/Card'
import { Layout } from './Layout'
import { ItemsContext } from '../context/items/ItemsContext'
import { BasketContext } from '../context/basket/BasketContext'
import { SelectUI } from '../components/SelectUI'

export const Items = () => {

    const { items, totalItemsCount, pageSize, loading, fetchItems, checkedList, currentPage, search } = useContext(ItemsContext)
    const { addItemToBasket } = useContext(BasketContext)

    useEffect(() => {
        fetchItems()
        // console.log(search)
        store.set('checkedList', checkedList)
        store.set('currentPage', currentPage)
        store.set('search', search)
        // eslint-disable-next-line
    }, [checkedList, currentPage, search])

    const renderCards = () => {
        return items.map((item, index) => {
            return (
                <Card
                    key={item.id}
                    item={item}
                    addItemToBasket={addItemToBasket}
                    id={index}
                />
            )
        })
    }

    return (
        <Layout>
            <SelectUI />
            <div className="card-group row">
                {
                    loading
                        ? <Loader />
                        : items.length === 0
                            ? <p>Нет товаров по заданному запросу</p>
                            : renderCards()
                }
            </div>
            {
                loading || items.length === 0
                    ? null
                    : <Paginator
                        totalItemsCount={totalItemsCount}
                        pageSize={pageSize}
                        portionSize={4}
                    />
            }
        </Layout>
    )
}