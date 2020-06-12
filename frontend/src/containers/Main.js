import React from 'react';
import { motion } from 'framer-motion'

import { Body } from '../components/Body';
import { Cases } from '../components/Cases';

export const Main = () => {
    return (
        <motion.div
            className="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Body />
            <Cases />
        </motion.div>
    );
}
