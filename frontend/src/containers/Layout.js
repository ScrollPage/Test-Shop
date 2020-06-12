import React from "react";
import PropTypes from 'prop-types'
import { Sidebar } from "../components/Sidebar";
import { motion } from 'framer-motion'

export const Layout = ({ children }) => (
    <motion.div
        className="container pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
    >
        <div className="row">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                {children}
            </div>
        </div>
    </motion.div>
)

Layout.propTypes = {
    children: PropTypes.array
}
