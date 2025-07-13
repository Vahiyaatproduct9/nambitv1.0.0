'use client'
import React, { useEffect, useState } from 'react'
import css from './popup.module.css'
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
function OrdersPopup({ setPopupShown }: { setPopupShown: (shown: boolean) => void }) {
    const router = useRouter();
    const [orders, setOrders] = useState<{ flattened: any[]; totalPrice: number } | null>(null);
    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);
    const orderItems = orders?.flattened.map((item, index) => (
        <motion.div key={index} className={css.orderItem} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} exit={{ opacity: 0 }}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
        </motion.div>
    ));
    return (
        <AnimatePresence>
            <motion.div className={css.background} onClick={() => setPopupShown(false)} initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(5px)' }} exit={{ opacity: 0 }}>
                <div className={css.popup} onClick={(e) => e.stopPropagation()}>
                    <div className={css.title}>
                        <h1>Do you want to continue Ordering?</h1>
                    </div>
                    <div className={css.body}>
                        <AnimatePresence>
                            {orderItems}
                        </AnimatePresence>
                    </div>
                    <div className={css.footer}>
                        <button className={css.no} onClick={() => { localStorage.removeItem('orders'); setPopupShown(false); }}>No</button>
                        <button className={css.yes} onClick={() => { router.push('/confirmorders') }}>Yes</button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default OrdersPopup
