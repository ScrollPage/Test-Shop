import React, { useState, useContext } from 'react'
import { AlertContext } from '../context/alert/AlertContext'
import { ItemsContext } from '../context/items/ItemsContext'

export const Search = () => {

    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const { setSearch, setCurrentPage } = useContext(ItemsContext)

    const onSubmit = event => {
        console.log(value)
        if (event.key !== 'Enter') {
            return
        }

        if (value.trim()) {
            setSearch(value)
            setCurrentPage(1)
            alert.hide()

        } else {
            console.log('Пусто')
            alert.show('Введите поисковый запрос!', 'primary')
        }
    }

    return (
        <div className="input-group mt-4">
            <input
                onChange={event => setValue(event.target.value)}
                value={value}
                onKeyPress={onSubmit}
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
