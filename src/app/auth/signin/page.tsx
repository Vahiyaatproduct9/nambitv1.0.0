'use client'
import React from 'react'
import css from './signin.module.css'
import Link from 'next/link'
import { signIn } from '../../../api/signIn'
import { useRouter } from 'next/navigation'
import Message from '../../message/message'

function SignIn() {
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const pass = formData.get('password');
        const signInvar = async () => {
            if (typeof email === 'string' && typeof pass === 'string') {
                const { data, error } = await signIn(email, pass)
                if (data) {
                    router.push('/')
                }
                else if (error && error.message) {
                    <Message message={error.message} color='red' time={5} />
                }
            }
        }
        signInvar()
    }
    return (
        <div className={css.container}>
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
                            <label htmlFor='password'>Password:</label>
                            <input name='password' type='password' placeholder='Password' required />
                        </div>
                        <div>
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </div>
                <div className={css.end}>
                    <span>New here?</span>
                    <Link href={'/auth/signup'}><button>Sign Up</button></Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
