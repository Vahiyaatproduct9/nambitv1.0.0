'use client'
import React, { useEffect, useState } from 'react'
import css from './additionalinfo.module.css'
import Message from '../../message/message'
import { postData } from '../../../api/postData'
import { haversine } from '../../../api/haversine'
import { useRouter } from 'next/navigation'

function AdditionalInfo() {
    const router = useRouter()

    const [coords, setCoords] = useState<{ lat: number, long: number, acc: number } | null>(null)
    const [deliveryPossible, setDeliveryPossible] = useState(true)
    const [message, setMessage] = useState<{ color: 'red' | 'green', text: string } | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name')?.toString() || ''
        const phone = Number(formData.get('phone')) || 0
        const address = formData.get('address')?.toString() || ''
        const lat = coords?.lat ?? 0
        const long = coords?.long ?? 0
        const acc = Math.floor(coords?.acc ?? 0)

        const { data, error } = await postData(name, phone, address, lat, long, acc)

        if (data && !error) {
            setMessage({ color: 'green', text: 'Details saved successfully!' })
            if (typeof window !== 'undefined' && localStorage.getItem('orders')) {
                router.push('/confirmorders')
            } else {
                router.push('/')
            }
        }

        if (error) {
            setMessage({ color: 'red', text: 'There was an error. Please try again!' })
        }
    }

    const getCoords = () => {
        if (!navigator.geolocation) {
            alert("Your browser doesn't support location.")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords
                setCoords({ lat: latitude, long: longitude, acc: accuracy })

                const distance = haversine(latitude, longitude, 26.3820903, 88.3132877)
                if (distance > 20) {
                    setDeliveryPossible(false)
                    alert("You're outside our delivery range.")
                } else {
                    setDeliveryPossible(true)
                }
            },
            (error) => {
                alert("Please enable location access in your browser!")
                const locationCheckbox = document.getElementById('location') as HTMLInputElement | null
                if (locationCheckbox) locationCheckbox.checked = false
            },
            {
                enableHighAccuracy: true,
                timeout: 10000
            }
        )
    }

    useEffect(() => {
        const checkbox = document.getElementById('location') as HTMLInputElement | null
        if (checkbox) checkbox.checked = false
    }, [])

    return (
        <div className={css.container}>
            <div className={css.body}>
                <div className={css.title}>
                    <h1>Namaste Bites</h1>
                    <span>Additional Info</span>
                </div>

                {message && (
                    <Message color={message.color} time={5} message={message.text} />
                )}

                <div className={css.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={css.input}>
                            <label htmlFor='name'>Name:</label>
                            <input name='name' id='name' type='text' placeholder='Ramesh Gupta' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='phone'>Phone:</label>
                            <input name='phone' id='phone' type='number' placeholder='9876543210' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='address'>Address:</label>
                            <input name='address' id='address' type='text' placeholder='Eg. Chopra Police Station' required />
                        </div>
                        <section className={css.input}>
                            <input name='location' id='location' type='checkbox' onChange={(e) => {
                                if (e.target.checked) getCoords()
                                else setCoords(null)
                            }} required />
                            <label htmlFor='location'>Enable GPS Location</label>
                        </section>

                        <div>
                            <input className={css.go} type='submit' value='GO!' disabled={!deliveryPossible} />
                            {!deliveryPossible && <span>Sorry, Delivery is not Possible</span>}
                        </div>
                    </form>
                </div>

                <div className={css.end}>
                    <span>We only deliver within 20 KM of our restaurant.</span>
                    <br />
                    <span>~ Namaste Bites</span>
                    <br />
                    <span>Kalagachh Bus Stand</span>
                </div>
            </div>
        </div>
    )
}

export default AdditionalInfo
