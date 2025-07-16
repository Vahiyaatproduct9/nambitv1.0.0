'use client'
import React, { useEffect, useState } from 'react'
import css from './orders.module.css'
import { fetchOrders } from '@/logic/processedData'
import { orderCancelled, orderDelivered } from '@/api/adminaction'
function Orders() {
    const [orders, setOrders] = useState<Order[] | null>(null)
    type Order = {
        id: string;
        user_id: string;
        order: {
            name: string;
            price: number;
        }[];
        status: 'pending' | 'accepted' | 'deleted';
        user?: User | null;
        location: string;
        googleMapLink: string;
        time: string;
        date: string;
        calcdistance: string;
    };

    type User = {
        id: string;
        full_name: string;
        phone: string;
        address: string;
    }
    useEffect(() => {
        const localFetchOrders = async () => {
            const data = await fetchOrders();
            setOrders(data as Order[] || []);
        };
        localFetchOrders()
        if (!orders) console.log(orders)
    }, [])
    const orderBoxes = () => {
        return orders?.map((order, i) => {

            const orderBoxes = order.order.map((item, i) => {
                return (
                    <div key={i} className={css.orderContent}>
                        <span>{item.name}</span>
                        <span>₹{item.price}</span>
                    </div>
                )
            }) || null
            return (
                <div key={i} className={css.orderContainer}>
                    <div className={css.orderHead}>
                        <div className={css.orderHeadBasicInfo}>
                            <div className={css.orderHeadLeft}>
                                <span>{order.user?.full_name}</span>
                                <span>{order.user?.phone}</span>
                            </div>
                            <div className={css.orderHeadRight}>
                                <span>{order.time}</span>
                                <span>{order.date}</span>
                            </div>
                        </div>
                        <div className={css.orderHeadLocation}>
                            <span>Address: {order.user?.address} ({order.location} Province)</span>
                            <span>Distance: {order.calcdistance} km</span>
                            <span><a href={order.googleMapLink}>View Map</a></span>
                        </div>
                    </div>
                    <div className={css.orderBody}>
                        {orderBoxes}
                    </div>
                    <div className={css.orderFooter}>
                        <button className={css.accept} onClick={() => {
                            orderDelivered(order.id)
                            setOrders(orders?.filter(item => item.id !== order.id))
                        }}>Accept</button>
                        <button className={css.delete} onClick={() => {
                            orderCancelled(order.id)
                            setOrders(orders?.filter(item => item.id !== order.id))
                        }}>Delete</button>
                    </div>
                </div>
            )
        })
    }

    if (!orders) return 'Loading...'
    if (orders.length === 0) return 'No Orders yet...'
    return (
        <div className={css.container}>
            {orderBoxes()}
        </div>
    )
}

export default Orders
