import React from 'react'
import * as motion from 'motion/react-client'
import css from './Loading.module.css'
import { AnimatePresence } from 'framer-motion'

function Loading() {
    const boxes = [Array(3)].map((_, index) => {
        return (<motion.div className={css.box} key={index} animate={{ y: [0, 0, -10, 0] }} transition={{ y: { duration: 0.8 }, delay: 0.2 * index, repeat: Infinity }} />)
    })
    return (
        <div className={css.container}>
            <AnimatePresence>
                {boxes}
            </AnimatePresence>
        </div>
    )
}

export default Loading
