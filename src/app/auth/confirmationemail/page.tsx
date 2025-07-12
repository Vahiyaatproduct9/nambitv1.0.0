import React from 'react'
import css from './confirmationemail.module.css'

function Confirmation() {
  return (
    <div className={css.container}>
        <h1>Confirmation Email Sent!</h1>
        <span>Thank you for Signing up on Namaste Bites.</span>
        <span>Please Check your email to Confirm. :{')'}</span>
    </div>
  )
}

export default Confirmation
