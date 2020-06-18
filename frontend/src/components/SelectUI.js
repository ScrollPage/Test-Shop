import React from 'react'
import { Select } from 'antd';

export const SelectUI = () => {

    const { Option } = Select;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div className="selectui">
            <p>Сортировать: </p>
            <Select defaultValue="sortDefault" style={{ width: 200 }} onChange={handleChange}>
                <Option value="sortDefault">По умолчанию</Option>
                <Option value="SortUpPrice">По возрастанию цены</Option>
                <Option value="sortLowPrice">По убыванию цены</Option>
                <Option value="sortRating">По рейтингу</Option>
            </Select>
        </div>
    )
}
