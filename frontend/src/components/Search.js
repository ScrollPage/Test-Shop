import React, { useContext } from 'react'
import { ItemsContext } from '../context/items/ItemsContext'

export const Search = () => {

    const { search, setSearch, setCurrentPage } = useContext(ItemsContext)

    return (
        <div className="input-group">
            <input
                onChange={event => {setSearch(event.target.value); setCurrentPage(1);}}
                value={search === null ? '' : search}
                type="text"
                className="form-control"
                placeholder="Поиск..."
                aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2" onClick={() => setSearch(null)}>Очистить</span>
            </div>
        </div>
    )
}
