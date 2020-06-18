import React, { useContext } from 'react'
import { Select } from 'antd';
import { ItemsContext } from '../context/items/ItemsContext'

export const SelectUI = () => {

    const { ordering, setOrdering, setCurrentPage } = useContext(ItemsContext)

    const { Option } = Select;

    function handleChange(value) {
        setOrdering(Number(value))
        setCurrentPage(1)
    }

    return (
        <div className="selectui">
            <p>Сортировать: </p>
            <Select defaultValue={'' + ordering} style={{ width: 200 }} onChange={handleChange}>
                <Option value="0">По умолчанию</Option>
                <Option value="1">По возрастанию цены</Option>
                <Option value="2">По убыванию цены</Option>
                <Option value="3">По рейтингу</Option>
            </Select>
        </div>
    )
}
