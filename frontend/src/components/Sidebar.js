import React from 'react'
import { BasketCart } from './BasketCart'
import { Search } from './Search'
import { Category } from './Category'
import { SliderUI } from './SliderUI'

export const Sidebar = () => {
    return (
        <div>
            <BasketCart />
            <Search />
            <Category />
            <SliderUI />
        </div>
    )
}

