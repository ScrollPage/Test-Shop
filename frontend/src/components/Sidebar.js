import React from 'react'
import { Search } from './Search'
import { Category } from './Category'
import { SliderUI } from './SliderUI'

export const Sidebar = () => {
    return (
        <div>
            <Search />
            <Category />
            <SliderUI />
        </div>
    )
}

