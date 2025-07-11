import React from 'react'
import css from './hero.module.css'

function Hero() {
    return (
        <div className={css.container}>
            <div className={css.leftContainer}>
                <h1>Welcome to Namaste Bites</h1>
                <p>Experience the best of Indian cuisine with our online orders and table booking.</p>
                <div className={css.buttons}>
                    <button className={css.orderButton}>Book a Table</button>
                </div>
            </div>
        </div>
    )
}

export default Hero
