import React from "react";
import PropTypes from 'prop-types'
import { Sidebar } from "../components/Sidebar";

export const Layout = ({ children }) => (
    <div className="container pt-4">
        <div className="row">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                {children}
            </div>
        </div>
    </div>
)

Layout.propTypes = {
    children: PropTypes.array
}
