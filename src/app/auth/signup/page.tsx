'use client'
import React from 'react'
import css from './signup.module.css'
import Link from 'next/link'
import { signUp } from '../../../api/signUp'
import { useRouter } from 'next/navigation'
import Message from '../../message/message'

function SignUp() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const pass1 = formData.get('password1');
        const pass2 = formData.get('password2')
        const signUpvar = async () => {
            if (typeof email === 'string' && typeof pass2 === 'string' && typeof pass1 === 'string') {
                const { data, error } = await signUp(email, pass1, pass2)

                if (data) {
                    useRouter().push('/auth/confirmationemail')
                }
            }
        }
        signUpvar()
    }
    return (
        <div className={css.container}>

            <Message color='orange' message='Please Check your Email to Confirm.' time={3} />
            <div className={css.body}>
                <div className={css.title}>
                    <h1>Namaste Bites</h1>
                    <span>Sign Up</span>
                </div>
                <div className={css.form}>
                    <form onSubmit={handleSubmit}>
                        <div className={css.input}>
                            <label htmlFor='email'>Email:</label>
                            <input name='email' type='email' placeholder='someone@gmail.com' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='password1'>Password:</label>
                            <input name='password1' type='password' placeholder='Password' required />
                        </div>
                        <div className={css.input}>
                            <label htmlFor='password2'>Confirm Password:</label>
                            <input name='password2' type='password' placeholder='Password' required />
                        </div>
                        <div>
                            <button>Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className={css.end}>
                    <span>Already a user?</span>
                    <Link href={'/auth/signin'}><button>Login</button></Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
