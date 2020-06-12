import React, { useState, useContext } from 'react'
import { Checkbox } from 'antd';
import { ItemsContext } from '../context/items/ItemsContext'

export const Category = () => {

    const { checkedList, setCheckedList, setCurrentPage } = useContext(ItemsContext)

    const CheckboxGroup = Checkbox.Group;

    const plainOptions = ['Apple', 'Samsung', 'HTC', 'Lenovo', 'Nokia'];
    const [indeterminate, setIndeterminate] = useState(!!checkedList.length && checkedList.length < plainOptions.length)
    const [checkAll, setCheckAll] = useState(checkedList.length === plainOptions.length ? true : false)

    const onChange = (e) => {
        setCheckedList(e)
        setIndeterminate(!!e.length && e.length < plainOptions.length)
        setCheckAll(e.length === plainOptions.length)
        setCurrentPage(1) 
    }

    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
        setCurrentPage(1)
    }

    return (
        <div className="category mt-3">
            <h3>Категории</h3>
            <hr />
            <div>
                <div className="site-checkbox-all-wrapper">
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                    >
                        All
                    </Checkbox>
                </div>
                <hr />
                <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}
