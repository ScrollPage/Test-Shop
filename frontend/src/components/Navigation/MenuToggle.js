import PropTypes from 'prop-types'
import { MenuOutlined, CloseOutlined } from'@ant-design/icons';
import React from 'react'

export const MenuToggle = ({isOpen, isToggle}) => {
    return (
        <div 
            className={isOpen ? 'menuToggle open' : 'menuToggle'} 
            onClick={isToggle}    
        >
            {isOpen 
            ? <CloseOutlined />
            : <MenuOutlined />}
        </div>
    )
}

MenuToggle.propTypes = {
    isOpen: PropTypes.bool,
    isToggle: PropTypes.func
}