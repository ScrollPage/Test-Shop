import React from 'react'
import PropTypes from 'prop-types'

export const Backdrop = props => <div className="backdrop" onClick={props.onClick}></div>

Backdrop.propTypes = {
    onClick: PropTypes.func
}





