import React from 'react'
import css from './thankyou.module.css'

function OrderPlaced() {
    return (
        <div className={css.container}>
            <h1>Order Placed Successfully!</h1>
            <span>Thank you for ordering from Namaste Bites.</span>
            <span>Your order will be delivered soon. :{')'}</span>
        </div>
    )
}

export default OrderPlaced  
