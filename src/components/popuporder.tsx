'use client'
import React, { useEffect, useState } from 'react'
import css from './popup.module.css'
import { useRouter } from 'next/navigation';
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
        <div key={index} className={css.orderItem}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
        </div>
    ));
    return (
        <div className={css.background} onClick={() => setPopupShown(false)}>
            <div className={css.popup} onClick={(e) => e.stopPropagation()}>
                <div className={css.title}>
                    <h1>Do you want to continue Ordering?</h1>
                </div>
                <div className={css.body}>
                    {orderItems}
                </div>
                <div className={css.footer}>
                    <button className={css.no} onClick={() => { localStorage.removeItem('orders'); setPopupShown(false); }}>No</button>
                    <button className={css.yes} onClick={() => { router.push('/confirmorders') }}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default OrdersPopup
