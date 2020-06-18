import React, { useContext, useEffect } from 'react'
import { AlertContext } from '../context/alert/AlertContext'
import { motion } from 'framer-motion'

export const Alert = () => {

    const { alert, hide } = useContext(AlertContext)

    useEffect(() => {
        setTimeout(() => {
            hide()
        }, 2000)
    }, [alert])

    if (!alert) return null

    return (
        <motion.div 
            className="alert-wrapper"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <div
                className={`alert alert-${alert.type || 'secondary'} alert-dismissible`}
                role="alert"
            >
                {alert.text}
                <button type="button" className="close" aria-label="Close" onClick={hide}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </motion.div>
    )
}