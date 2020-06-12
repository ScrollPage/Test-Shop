import React, { useContext, useEffect } from 'react'
import store from 'store'
import { Loader } from '../components/Loader'
import { Paginator } from '../components/Paginator'
import { Card } from '../components/Card'
import { Layout } from './Layout'
import { ItemsContext } from '../context/items/ItemsContext'
import { BasketContext } from '../context/basket/BasketContext'

export const Items = () => {

    const { items, totalItemsCount, pageSize, loading, fetchItems, checkedList, currentPage } = useContext(ItemsContext)
    const { addItemToBasket } = useContext(BasketContext)

    useEffect(() => {
        fetchItems()
        store.set('checkedList', checkedList)
        store.set('currentPage', currentPage)
        // eslint-disable-next-line
    }, [checkedList, currentPage])

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
            <Paginator
                totalItemsCount={totalItemsCount}
                pageSize={pageSize}
                // currentPage={currentPage}
                // pageChanged={pageChanged}
                portionSize={4}
            />
            <div className="card-group row">
                {
                    loading
                        ? <Loader />
                        : items.length === 0 
                            ? <p>Нет товаров по выбранным категориям</p>
                            : renderCards()
                }
            </div>
        </Layout>
    )
}