import React from 'react'
import { motion } from 'framer-motion'
// import { BasketContext } from '../context/basket/BasketContext'

export const Basket = () => {
    
    // const { basket } = useContext(BasketContext)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container">
                <ul>
                    <li>dsfsdfsadsdf</li>
                </ul>
            </div>
        </motion.div>
    )
}
