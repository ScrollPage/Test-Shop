import React from 'react'
import { motion } from 'framer-motion'

export const About = () => {

    const easing = []

    const itemTransition = {
        in: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easing }
        },
        out: {
            opacity: 0,
            y: 60,
            transition: { duration: 0.6, ease: easing }
        }
    }

    return (
        <motion.div
            className="jumbotron"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, when: 'beforeChildren' }}
        >
            <div className="container">
                <motion.h1 variants={itemTransition} initial="out" animate="in" exit="out" className="display-4">Информация</motion.h1>
                <motion.p variants={itemTransition} initial="out" animate="in" exit="out" className="lead">Версия приложения: <strong>1.0.0</strong></motion.p>
                <motion.p variants={itemTransition} initial="out" animate="in" exit="out" className="lead">Автор: <strong>0r20</strong></motion.p>
            </div>
        </motion.div>
    )
}