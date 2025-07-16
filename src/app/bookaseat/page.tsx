'use client'
import React, { useEffect, useState } from 'react'
import { useMotionValue } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { bookaseat } from '@/api/bookaseat'

import css from './bookaseat.module.css'
import Message from '../message/message'
function BookASeat() {
    const router = useRouter()
    const [noOfGuests, setNoOfGuests] = useState(1)
    const [message, setMessage] = useState('')
    const peopleValue = useMotionValue(1)


    useEffect(() => {
        peopleValue.set(noOfGuests)
    }, [noOfGuests, peopleValue])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string | null;
        const name = formData.get('name') as string | null;
        const phone = formData.get('phone') as string | null;
        const date = formData.get('date') as string | null;
        const time = formData.get('time') as string | null;
        const suggestion = formData.get('suggestions') as string | null;

        if (!email || !name || !phone || !date || !time || !suggestion) {
            // handle error, e.g. show a message or return
            return 'something went wrong X(';
        }

        const data = {
            email,
            name,
            phone: Number(phone),
            noOfGuest: Number(noOfGuests),
            date: new Date(date),
            status: 'pending',
            time,
            suggestion
        };
        const { data: d, error: err } = await bookaseat(data)
        if (!d || err) setMessage('Something Went Wrong! Please Try Again X(')
        else if (d || !err) router.push('/seatbookingthanks')
    }
    return (
        <div className={css.container}>
            {message !== '' && <Message message={message} color='red' time={5} />}
            <div className={css.body}>
                <div className={css.title}>
                    <h1>Namaste Bites</h1>
                    <span>Login</span>
                </div>
                <div className={css.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={css.input}>
                            <label htmlFor='email'>Email:</label>
                            <input name='email' type='email' placeholder='someone@gmail.com' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='name'>Full Name:</label>
                            <input name='name' type='text' placeholder='Ramesh Gupta' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='name'>Phone:</label>
                            <input name='phone' maxLength={10} type='number' placeholder='9801234800' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='people'>Number of Guest{noOfGuests > 1 ? 's' : ''}: {noOfGuests}</label>
                            <input
                                name='people'
                                id='people'
                                type='range'
                                min={1}
                                max={25}
                                value={noOfGuests}
                                onChange={e => setNoOfGuests(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='date'>Date:</label>
                            <input name='date' type='date' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='time'>Time:</label>
                            <input name='time' type='time' defaultValue={Date.toString()} required />
                        </div>
                        <div className={css.input}>
                            <label>Suggestions: </label>
                            <textarea name='suggestions' maxLength={200} placeholder='We want a separate silent Corner... আমরা খাবার টেবিলের জন্য আলাদা একটা কোণ চাই...' />
                        </div>
                        <div>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookASeat
