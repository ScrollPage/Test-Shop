import React, { useContext } from 'react'
import { AlertContext } from '../context/alert/AlertContext'
import { ItemsContext } from '../context/items/ItemsContext'

export const Search = () => {

    const { search, setSearch, setCurrentPage } = useContext(ItemsContext)

    return (
        <div className="input-group mt-4">
            <input
                onChange={event => {setSearch(event.target.value); setCurrentPage(1);}}
                value={search === null ? '' : search}
                type="text"
                className="form-control"
                placeholder="..."
                aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">Search</span>
            </div>
        </div>
    )
}
