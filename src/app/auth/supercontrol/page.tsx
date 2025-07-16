'use client'
import React, { useEffect, useState } from 'react'
import css from './supercontrol.module.css'
import Orders from './orders'
import Bookings from './bookings'
import { checkAdmin } from '@/api/checkadmin'
import { useRouter } from 'next/navigation'
import Settings from './settings'


function SuperControl() {
    const router = useRouter()
    // const [IsAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        const { username, password } = JSON.parse(localStorage.getItem('admin') || '{}')
        const isAdmin = checkAdmin(username, password)
        if (!localStorage.getItem('admin') && isAdmin) {
            router.push('/')
        }
    }, [])
    const [nav, setNav] = useState('orders')
    const box = () => {
        if (nav === 'orders') {
            return <Orders />
        }
        else if (nav === 'bookings') {
            return <Bookings />
        }
        else if (nav === 'settings') {
            return <Settings />
        }
    }
    return (
        <div className={css.container}>
            <div className={css.title}>Super Control</div>
            <div className={css.nav}>
                <button onClick={() => setNav('orders')}>Orders</button>
                <button onClick={() => setNav('bookings')}>Bookings</button>
                <button onClick={() => { setNav('settings') }}>Settings</button>
            </div>
            <div className={css.body}>
                {box()}

            </div>
        </div>
    )
}

export default SuperControl

//
