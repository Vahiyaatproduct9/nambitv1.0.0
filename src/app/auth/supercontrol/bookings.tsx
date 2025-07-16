import React, { useEffect, useState } from 'react'
import css from './bookings.module.css'
import { seeBookings } from '@/api/adminaction'
function Bookings() {
    type Bookings = {
        id: Number,
        created_at: Date,
        name: string,
        email: string,
        phone: Number,
        noOfGuest: string,
        date: Date,
        time: Date,
        suggestion: string,
        status: string
    }
    const [bookings, setBookings] = useState<Bookings[] | null>(null)
    useEffect(() => {
        const localFetchBookings = async () => {
            const data = await seeBookings()
            setBookings(data as Bookings[] || [])
        }
        localFetchBookings()
    }, [])
    const bookingBoxes = () => {
        return bookings?.map(booking => {
            const dte = new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            const handleAccept = async () => {
                const res = await fetch('/api/sendemail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: booking.email,
                        condition: true,
                        name: booking.name,
                        date: dte,
                        time: booking.time.toString(),
                    }),
                })
                return res
            }
            const handleDecline = async () => {
                const res = await fetch('/api/sendemail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: booking.email,
                        condition: false,
                        name: booking.name,
                        date: dte,
                        time: booking.time.toString(),
                    }),
                })
                setBookings(bookings?.filter(item => item.id !== booking.id))
                return res
            }
            return (
                <div className={css.bookingContainer} key={booking.id as React.Key}>
                    <div className={css.bookingContainerHead}>
                        <div className={css.criteria}>
                            <span>Name: </span>
                            <span>{booking.name}</span>
                        </div>
                        <div className={css.criteria}>
                            <span>Email: </span>
                            <span><a href={`mailto:${booking.email}`}>{booking.email}</a></span>
                        </div>
                        <div className={css.criteria}>
                            <span>Phone: </span>
                            <span><a href={`tel:${(booking.phone).toString()}`}>{(booking.phone).toString()}</a></span>
                        </div>
                        <div className={css.criteria}>
                            <span>No. of Guest: </span>
                            <span>{booking.noOfGuest}</span>
                        </div>
                        <div className={css.criteria}>
                            <span>Date: </span>
                            <span>{dte}</span>
                        </div>
                        <div className={css.criteria}>
                            <span>Time: </span>
                            <span>{(booking.time).toString()}</span>
                        </div>
                        <div className={css.criteria}>
                            <span>Status: </span>
                            <span style={{ color: booking.status === 'pending' ? 'red' : 'green' }}>{booking.status}</span>
                        </div>
                        <div className={css.criteria}>
                            <span>Suggesiton: </span>
                            <span className={css.suggestion}>{booking.suggestion}</span>
                        </div>
                        {booking.status === 'confirmed' ? null : <div className={css.criteria}>
                            <button className={css.accept} onClick={handleAccept}>Accept</button>
                            <button className={css.cancel} onClick={handleDecline}>Cancel</button>
                        </div>}
                    </div>
                </div >
            )
        })
    }
    if (!bookings) return 'Loading...'
    if (bookings.length === 0) return 'No Bookings yet...'
    return (
        <div className={css.container}>
            {bookingBoxes()}
        </div>
    )
}

export default Bookings
