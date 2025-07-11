import React from 'react'
import css from './header.module.css'

function Header() {
    return (
        <div className={css.container}>
            <div className={css.leftContainer}>
                <div className={css.title}>
                    <h1>Namaste Bites</h1>
                    <div className={css.subs}>
                        <span>Online Orders</span>
                        <span>Table Booking</span>
                    </div>
                </div>
            </div>
            <div className={css.cart}>
                <img src='./dish.png' alt='cart' />
            </div>
        </div>
    )
}

export default Header
