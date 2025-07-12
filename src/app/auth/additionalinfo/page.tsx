'use client'
import React, { useEffect, useState } from 'react'
import css from './additionalinfo.module.css'
import Message from '../../message/message'
import { postData } from '../../../api/postData'
import { haversine } from '../../../api/haversine'
import { useRouter } from 'next/navigation'

function AdditionalInfo() {
    const [coords, setCoords] = useState<{ lat: number, long: number, acc: number } | null>(null)
    const [deliveryPossible, setDeliveryPossible] = useState(true)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name')?.toString() || '';
        const phone = Number(formData.get('phone')) || 0;
        const address = formData.get('address')?.toString() || '';
        const lat = coords?.lat ?? 0;
        const long = coords?.long ?? 0;
        const acc = Math.floor(coords?.acc ?? 0);
        const { data, error } = await postData(name, phone, address, lat, long, acc)
        if (data && !error) {
            <Message color='green' time={5} message='Details saved successfully!' />
            if (localStorage.getItem('orders')) {
                // If there are orders in localStorage, redirect to the orders page
                useRouter().push('/orders');
            } else {
                useRouter().push('/');
            }
        }
        if (error) return <Message color='red' time={5} message='There was an error. Please try again!' />

    }
    function getCoords() {
        if (!navigator.geolocation) {
            alert('Your Browser Doesn\'t support Location')
        }
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude, accuracy } = position.coords;
            setCoords({ lat: latitude, long: longitude, acc: accuracy })
        }, (error) => {
            alert('cannot get location :(')
            const locationCheckbox = document.getElementById('location') as HTMLInputElement | null;
            if (locationCheckbox) {
                locationCheckbox.checked = false;
            }
        }, {
            enableHighAccuracy: true,
            timeout: 10000
        })
        const distance = haversine(coords?.lat, coords?.long, 26.3820903, 88.3132877)
        if (distance > 20) {
            setDeliveryPossible(false)
        }
    }
    useEffect(() => {
        const checkbox = document.getElementById('location') as HTMLInputElement | null;
        if (checkbox) {
            checkbox.checked = false; // Reset the checkbox state on component mount
        }
        checkbox?.addEventListener('change', (e) => {
            if (e.target instanceof HTMLInputElement) {
                if (e.target.checked) {
                    getCoords();
                } else {
                    setCoords(null);
                }
            }
        });
    }, [])
    return (
        <div className={css.container}>
            <div className={css.body}>
                <div className={css.title}>
                    <h1>Namaste Bites</h1>
                    <span>Additional Info</span>
                </div>
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
                            <input name='location' id='location' type='checkbox' onChange={getCoords} required />
                            <label htmlFor='location'>Enable GPS Location</label>
                        </section>
                        <div>
                            <input className={css.go} type='submit' value='GO!' />
                            {deliveryPossible ? null : <span>Sorry, Delivery is not Possible</span>}
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
            </div >
        </div >
    )
}

export default AdditionalInfo
