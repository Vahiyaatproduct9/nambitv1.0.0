'use client'
import React, { useEffect, useState } from 'react'
import css from './confirmorders.module.css'
import { useRouter } from 'next/navigation'
import fetchOrderPictures from '@/api/fetchOrders'
import { orderbuttonpress } from '@/api/order'
import Message from '../message/message'

function ConfirmOrders() {
    const router = useRouter();
    const [message, setMessage] = useState<string>('');
    const [orders, setOrders] = React.useState<{ name: string, price: number }[]>([]);
    const [totalPrice, setTotalPrice] = React.useState(0)
    useEffect(() => {
        if (!localStorage.getItem('orders')) {
            // If there are no orders in localStorage, redirect to the home page
            router.push('/');
        } else if (localStorage.getItem('orders')) {
            setTotalPrice(localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') || '{}').totalPrice : 0)
            const storedOrders = localStorage.getItem('orders');
            const storedOrdersparse = JSON.parse(storedOrders || '[]');
            if (storedOrdersparse) {
                setOrders(storedOrdersparse.flattened);
            }
        }
    }, [])
    const itemNames = orders.map(order => ({ name: order.name }));
    const [itemPics, setItemPics] = React.useState<{ image_url: string }[] | null>(null);

    useEffect(() => {
        const fetchPics = async () => {
            const pics = await fetchOrderPictures(itemNames);
            setItemPics(pics);
        };
        if (orders.length > 0) {
            fetchPics();
        }
    }, [orders]);
    async function placeOrder() {
        const c = await orderbuttonpress(localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') || '{}').flattened : [], localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') || '{}').totalPrice : 0);
        if (c === 3) {
            localStorage.removeItem('orders');
            router.push('/thankyou');
        }
        else if (c === 0) {
            setMessage('Please sign up to place an order.');
            router.push('/auth/signup');
        }
        else if (c === 1) {
            setMessage('Please fill in your additional information before placing an order.');
            router.push('/auth/additionalinfo');
        }
        else { console.log(c) }

    }

    const orderItems = orders.map((order, index) => (
        <div key={index} className={css.orderItem}>
            <div className={css.itemImage}>
                <img src={itemPics?.[index]?.image_url || '/table.jpg'} alt={order.name} />
            </div>
            <div className={css.itemDetails}>
                <span>{order.name}</span> <span>₹{order.price}</span>
            </div>

        </div>
    ))
    return (
        <div className={css.container}>
            {message !== '' && <Message message={message} color='red' time={3} />}
            <div className={css.header}>
                <h1>Orders</h1>
            </div>
            <div className={css.body}>
                {orderItems}
            </div>
            <div className={css.totalPrice}>
                <span>Total Price:</span><span>₹{totalPrice}</span>
            </div>
            <p>Want to Change Location? <button style={{ color: 'blue' }} onClick={() => router.push('/additionalinfo')}>Change Location</button></p>
            <p><b>Note : </b> We only allow <b>Cash On Delivery</b> at the moment!</p>
            <div className={css.footer}>
                <button className={css.orderButton} onClick={() => placeOrder()}>Place Order</button>
            </div>
        </div>
    )
}

export default ConfirmOrders
