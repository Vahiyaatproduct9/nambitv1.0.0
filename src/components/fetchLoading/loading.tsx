import React from 'react'
import * as motion from 'motion/react-client'
import css from './Loading.module.css'
import { AnimatePresence } from 'framer-motion'

function Loading() {
    const boxes = Array(3).fill(0).map((_, index) => {
        return (
            <motion.div
                className={css.box}
                key={index}
                animate={{ y: [0, 0, -10, 0] }}
                transition={{
                    y: { delay: 0.2 * index, duration: 0.8, repeat: Infinity },

                }}
            />
        );
    });
    return (
        <div className={css.container}>
            <AnimatePresence>
                {boxes}
            </AnimatePresence>
        </div>
    )
}

export default Loading
