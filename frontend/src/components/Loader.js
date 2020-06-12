import React from 'react'
import { motion } from 'framer-motion'

export const Loader = () => {
    return (
        <motion.div className="loader__center" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}} >
            <div className="loader">
                <div />
                <div />
            </div>
        </motion.div>
    )
}






