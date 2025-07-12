import React, { useEffect, useState } from 'react'
import css from './message.module.css'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'framer-motion'


function Message(props: { color: string, message: string, time: number }) {
    const [shown, setShown] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setShown(false)
        }, props.time * 1000)
    }, [])
    return (
        <AnimatePresence>
            {shown ? (
                <motion.div initial={{ y: -100 }} animate={{ y: 10 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ borderColor: props.color }} className={css.container}>
                    <span style={{ color: props.color }}>{props.message}</span>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}

export default Message
