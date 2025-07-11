import React from 'react'
import css from '../css/loading.style.module.css'
import { motion } from 'motion/react';
function Loading() {
    const boxes = Array.from({ length: 3 }, (_, i) => (
        <motion.div key={i} className={css.box} animate={{ y: [0, 0, -10, 0] }} transition={{ duration: 1, delay: 0.2 * i, repeat: Infinity }}></motion.div>
    ));
    return (
        <motion.div className={css.loading} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
            <h1>Welcome</h1>
            <div className={css.boxes}>{boxes}</div>
        </motion.div>
    )
}

export default Loading
